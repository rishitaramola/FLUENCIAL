'use server'

import { createClient } from '@/lib/supabase/server'

// Documented/configurable brochure location:
// You can replace these with your actual Supabase Storage bucket name and file path.
// The file must be in a private bucket so it cannot be accessed without this server action.
const BROCHURE_BUCKET = process.env.BROCHURE_BUCKET || 'private-assets'
const BROCHURE_FILE_PATH = process.env.BROCHURE_FILE_PATH || 'brochures/fluenciel-master-brochure.pdf'

type BrochureResponse = {
  url?: string
  error?: string
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// Generate a signed URL valid for 60 seconds
async function getSignedBrochureUrl(): Promise<string | null> {
  const supabase = await createClient()
  const { data, error } = await supabase.storage
    .from(BROCHURE_BUCKET)
    .createSignedUrl(BROCHURE_FILE_PATH, 60)

  if (error || !data) {
    console.error('Error generating signed URL:', error?.message)
    // Fallback URL or logic can be implemented here if the bucket doesn't exist yet, 
    // but the instruction says "Build the complete infrastructure now... Use a clearly documented/configurable brochure location."
    // If the bucket doesn't exist, this will fail securely, which is the expected behavior.
    return null
  }

  return data.signedUrl
}

export async function downloadBrochureAction(formData?: FormData): Promise<BrochureResponse> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // CASE 1: Authenticated User
  if (user) {
    const url = await getSignedBrochureUrl()
    if (!url) {
      return { error: 'Brochure is not available at the moment.' }
    }
    return { url }
  }

  // CASE 2: Unauthenticated Visitor
  if (!formData) {
    return { error: 'Missing required details.' }
  }

  const name = String(formData.get('name') || '').trim()
  const dob = String(formData.get('dob') || '').trim()
  const course_id = String(formData.get('courseId') || '').trim()
  const email = String(formData.get('email') || '').trim().toLowerCase()
  const phone = String(formData.get('phone') || '').trim()

  // Validation
  if (name.length < 2) return { error: 'Please enter your full name.' }
  if (!dob) return { error: 'Please enter a valid Date of Birth.' }
  if (!course_id) return { error: 'Please select a program of interest.' }
  if (!isValidEmail(email)) return { error: 'Please enter a valid email address.' }
  if (phone.length < 6) return { error: 'Please enter a valid phone number.' }

  // Check if date is not in the future
  const dobDate = new Date(dob)
  if (isNaN(dobDate.getTime()) || dobDate > new Date()) {
    return { error: 'Please enter a valid past Date of Birth.' }
  }

  try {
    // Check if lead already exists
    const { data: existingLead } = await supabase
      .from('leads')
      .select('id, notes')
      .eq('email', email)
      .maybeSingle()

    if (existingLead) {
      // Update existing lead to ensure we don't create unlimited identical leads
      // We append a note that they downloaded the brochure to avoid losing context
      const newNotes = existingLead.notes 
        ? `${existingLead.notes}\n[System]: Downloaded brochure again on ${new Date().toLocaleDateString()}` 
        : `[System]: Downloaded brochure on ${new Date().toLocaleDateString()}`
        
      await supabase.from('leads').update({
        name,
        phone,
        dob,
        course_id,
        source: 'BROCHURE',
        notes: newNotes,
        updated_at: new Date().toISOString()
      }).eq('id', existingLead.id)
    } else {
      // Create new lead
      await supabase.from('leads').insert({
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
    console.error('Error in downloadBrochureAction:', error)
    return { error: 'An unexpected error occurred. Please try again later.' }
  }
}
