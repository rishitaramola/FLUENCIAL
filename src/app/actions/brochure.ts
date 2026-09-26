'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

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

export async function submitBrochureFormAction(formData: FormData): Promise<BrochureResponse> {
  const name = String(formData.get('name') || '').trim()
  const dob = String(formData.get('dob') || '').trim()
  const course_id = String(formData.get('courseId') || '').trim()
  const emailRaw = String(formData.get('email') || '').trim()
  const phoneRaw = String(formData.get('phone') || '').trim()
  const turnstileToken = String(formData.get('cf-turnstile-response') || '')

  if (name.length < 2) return { error: 'Please enter your full name.' }
  if (!dob) return { error: 'Please enter a valid Date of Birth.' }
  if (!course_id) return { error: 'Please select a program of interest.' }
  if (!isValidEmail(emailRaw)) return { error: 'Please enter a valid email address.' }
  if (phoneRaw.length < 6) return { error: 'Please enter a valid phone number.' }

  const dobDate = new Date(dob)
  if (isNaN(dobDate.getTime()) || dobDate > new Date()) {
    return { error: 'Please enter a valid past Date of Birth.' }
  }

  if (!turnstileToken) {
    return { error: 'Please complete the verification and try again.' }
  }

  // 1. Verify Turnstile CAPTCHA server-side
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY
  if (!turnstileSecret) {
    console.error('TURNSTILE_SECRET_KEY is missing')
    return { error: 'Verification service unavailable. Please try again later.' }
  }

  try {
    const verificationResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${encodeURIComponent(turnstileSecret)}&response=${encodeURIComponent(turnstileToken)}`
    })
    
    const verification = await verificationResponse.json()
    if (!verification.success) {
      console.error('Turnstile verification failed:', verification)
      return { error: 'Please complete the verification and try again.' }
    }
  } catch (err) {
    console.error('Turnstile fetch error:', err)
    return { error: 'Please complete the verification and try again.' }
  }

  // 2. Normalize Email and Phone
  const email = emailRaw.toLowerCase()
  let phone = phoneRaw.replace(/\D/g, '')
  // Normalize Indian numbers by stripping leading 91 or 0 if it leaves 10 digits
  if (phone.length > 10 && phone.startsWith('91')) {
    phone = phone.substring(2)
  } else if (phone.length > 10 && phone.startsWith('0')) {
    phone = phone.substring(1)
  }
  
  if (phone.length < 6) return { error: 'Please enter a valid phone number.' }

  const supabaseAdmin = createAdminClient() as any

  // 3. Check for existing Email
  const { data: existingEmail } = await supabaseAdmin
    .from('leads')
    .select('id')
    .eq('email', email)
    .maybeSingle()

  if (existingEmail) {
    return { error: 'This email address is already registered.' }
  }

  // 4. Check for existing Phone
  const { data: existingPhone } = await supabaseAdmin
    .from('leads')
    .select('id')
    .eq('phone', phone)
    .maybeSingle()

  if (existingPhone) {
    return { error: 'This phone number is already registered.' }
  }

  // 5. Create new lead
  try {
    const { error: insertError } = await supabaseAdmin.from('leads').insert({
      name,
      email,
      phone,
      dob,
      course_id,
      source: 'BROCHURE',
      notes: 'Lead generated via Brochure Download form.',
      status: 'NEW'
    })

    if (insertError) {
      // In case of a race condition hitting the database unique constraints
      if (insertError.code === '23505') { // postgres unique_violation
        if (insertError.message.includes('email')) {
          return { error: 'This email address is already registered.' }
        }
        if (insertError.message.includes('phone')) {
          return { error: 'This phone number is already registered.' }
        }
      }
      console.error('Error inserting lead:', insertError)
      return { error: 'An unexpected error occurred. Please try again later.' }
    }

    // 6. Return Signed Brochure URL
    const url = await getSignedBrochureUrl()
    if (!url) {
      return { error: 'Brochure is not available at the moment. Your details have been saved, and our team will contact you.' }
    }

    return { url }
  } catch (error: any) {
    console.error('Error in submitBrochureFormAction:', error)
    return { error: 'An unexpected error occurred. Please try again later.' }
  }
}
