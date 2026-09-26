'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import crypto from 'crypto'
import { sendTransactionalEmail } from '@/lib/email'

const BROCHURE_BUCKET = process.env.BROCHURE_BUCKET || 'private-assets'
const BROCHURE_FILE_PATH = process.env.BROCHURE_FILE_PATH || 'brochures/fluenciel-master-brochure.pdf'

type BrochureResponse = {
  url?: string
  error?: string
}

type OtpResponse = {
  success?: boolean
  error?: string
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

async function getSignedBrochureUrl(): Promise<string | null> {
  const supabase = (await createClient()) as any
  const { data, error } = await supabase.storage
    .from(BROCHURE_BUCKET)
    .createSignedUrl(BROCHURE_FILE_PATH, 60)

  if (error || !data) {
    console.error('Error generating signed URL:', error?.message)
    return null
  }
  return data.signedUrl
}

// Authenticated flow remains completely unchanged
export async function downloadBrochureAction(): Promise<BrochureResponse> {
  const supabase = (await createClient()) as any
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    const url = await getSignedBrochureUrl()
    if (!url) return { error: 'Brochure is not available at the moment.' }
    return { url }
  }
  
  return { error: 'Unauthorized.' }
}

// --------------------------------------------------------------------------------
// NEW OTP FLOW FOR UNAUTHENTICATED USERS
// --------------------------------------------------------------------------------

export async function sendBrochureOtpAction(formData: FormData): Promise<OtpResponse> {
  const name = String(formData.get('name') || '').trim()
  const dob = String(formData.get('dob') || '').trim()
  const course_id = String(formData.get('courseId') || '').trim()
  const email = String(formData.get('email') || '').trim().toLowerCase()
  const phone = String(formData.get('phone') || '').trim()

  if (name.length < 2) return { error: 'Please enter your full name.' }
  if (!dob) return { error: 'Please enter a valid Date of Birth.' }
  if (!course_id) return { error: 'Please select a program of interest.' }
  if (!isValidEmail(email)) return { error: 'Please enter a valid email address.' }
  if (phone.length < 6) return { error: 'Please enter a valid phone number.' }

  const dobDate = new Date(dob)
  if (isNaN(dobDate.getTime()) || dobDate > new Date()) {
    return { error: 'Please enter a valid past Date of Birth.' }
  }

  const supabaseAdmin = createAdminClient() as any
  
  // Rate limit / Cooldown check
  // Find any OTP generated for this email within the last 60 seconds
  const sixtySecondsAgo = new Date(Date.now() - 60 * 1000).toISOString()
  const { data: recentOtp } = await supabaseAdmin
    .from('brochure_otps')
    .select('id')
    .eq('email', email)
    .gte('created_at', sixtySecondsAgo)
    .maybeSingle()
    
  if (recentOtp) {
    return { error: 'Please wait before requesting another code.' }
  }

  // Invalidate older OTPs (optional but good practice: set attempts to 99 so they fail)
  await supabaseAdmin
    .from('brochure_otps')
    .update({ attempts: 99 })
    .eq('email', email)
    .is('verified_at', null)

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString()
  const otpHash = crypto.createHash('sha256').update(otp).digest('hex')
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString() // 5 minutes

  // Store OTP
  const { error: dbError } = await supabaseAdmin.from('brochure_otps').insert({
    email,
    otp_hash: otpHash,
    expires_at: expiresAt,
  })

  if (dbError) {
    console.error('Error saving OTP:', dbError.message)
    return { error: 'Unable to send the verification code right now. Please try again.' }
  }

  // Send Email
  const emailRes = await sendTransactionalEmail({
    to: email,
    subject: 'Your Fluenciel verification code',
    text: `Hi ${name},\n\nYour Fluenciel verification code is:\n\n${otp}\n\nThis code expires in 5 minutes.\n\nPlease do not share this code with anyone.\n\nRegards,\nFluenciel Language Academy`,
  })

  // We do not expose whether email sending actually failed in a way that leaks info,
  // but if Resend fails, we should tell the user.
  if (emailRes && !emailRes.ok && !emailRes.skipped) {
    return { error: 'Failed to send email. Please check your email address.' }
  }

  return { success: true }
}

export async function verifyBrochureOtpAction(formData: FormData, otp: string): Promise<BrochureResponse> {
  const email = String(formData.get('email') || '').trim().toLowerCase()
  
  if (!email || !otp || otp.length !== 6) {
    return { error: 'Incorrect verification code. Please try again.' }
  }

  const supabaseAdmin = createAdminClient() as any
  
  // Find the most recent active OTP for this email
  const { data: otpRecord, error: otpError } = await supabaseAdmin
    .from('brochure_otps')
    .select('*')
    .eq('email', email)
    .is('verified_at', null)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (otpError || !otpRecord) {
    return { error: 'This code has expired. Please request a new code.' }
  }

  if (otpRecord.attempts >= 5) {
    return { error: 'Too many incorrect attempts. Please request a new code.' }
  }

  if (new Date(otpRecord.expires_at) < new Date()) {
    return { error: 'This code has expired. Please request a new code.' }
  }

  const submittedHash = crypto.createHash('sha256').update(otp).digest('hex')
  
  if (submittedHash !== otpRecord.otp_hash) {
    // Increment attempts
    await supabaseAdmin.from('brochure_otps').update({ attempts: otpRecord.attempts + 1 }).eq('id', otpRecord.id)
    return { error: 'Incorrect verification code. Please try again.' }
  }

  // Mark as verified
  await supabaseAdmin.from('brochure_otps').update({ verified_at: new Date().toISOString() }).eq('id', otpRecord.id)

  // -------------------------------------------------------------------------
  // PROCEED WITH EXISTING LEAD CREATION / BROCHURE URL LOGIC
  // -------------------------------------------------------------------------
  const name = String(formData.get('name') || '').trim()
  const dob = String(formData.get('dob') || '').trim()
  const course_id = String(formData.get('courseId') || '').trim()
  const phone = String(formData.get('phone') || '').trim()

  try {
    const { data: existingLead } = await supabaseAdmin
      .from('leads')
      .select('id, notes')
      .eq('email', email)
      .maybeSingle()

    if (existingLead) {
      const newNotes = existingLead.notes 
        ? `${existingLead.notes}\n[System]: Downloaded brochure again on ${new Date().toLocaleDateString()}` 
        : `[System]: Downloaded brochure on ${new Date().toLocaleDateString()}`
        
      await supabaseAdmin.from('leads').update({
        name,
        phone,
        dob,
        course_id,
        source: 'BROCHURE',
        notes: newNotes,
        updated_at: new Date().toISOString()
      }).eq('id', existingLead.id)
    } else {
      await supabaseAdmin.from('leads').insert({
        name,
        email,
        phone,
        dob,
        course_id,
        source: 'BROCHURE',
        notes: 'Lead generated via Brochure Download form.',
        status: 'NEW'
      })
    }

    const url = await getSignedBrochureUrl()
    if (!url) {
      return { error: 'Brochure is not available at the moment. Your details have been saved, and our team will contact you.' }
    }

    return { url }
  } catch (error: any) {
    console.error('Error in verifyBrochureOtpAction:', error)
    return { error: 'An unexpected error occurred. Please try again later.' }
  }
}
