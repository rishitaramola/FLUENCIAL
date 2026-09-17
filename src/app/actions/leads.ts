'use server'

import { createLead } from '@/lib/data/leads'
import { notifyLeadSubmitted } from '@/lib/email'

export type EnquiryState = { ok: boolean; error: string; message: string }

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export async function submitEnquiry(_prev: EnquiryState, formData: FormData): Promise<EnquiryState> {
  if (String(formData.get('company') || '').trim()) {
    return { ok: true, error: '', message: 'Thank you. We will be in touch if needed.' }
  }

  const name = String(formData.get('name') || '').trim()
  const email = String(formData.get('email') || '').trim().toLowerCase()
  const phone = String(formData.get('phone') || '').trim() || null
  const courseId = String(formData.get('courseId') || '').trim() || null
  const currentLevel = String(formData.get('currentLevel') || '').trim() || null
  const goal = String(formData.get('goal') || '').trim() || null
  const preferredTiming = String(formData.get('preferredTiming') || '').trim() || null
  const preferredMode = String(formData.get('preferredMode') || '').trim() || null
  const message = String(formData.get('message') || '').trim() || null

  if (name.length < 2) return { ok: false, error: 'Please enter your full name.', message: '' }
  if (!isEmail(email)) return { ok: false, error: 'Please enter a valid email address.', message: '' }

  try {
    await createLead({
      name,
      email,
      phone,
      course_id: courseId,
      current_level: currentLevel,
      goal,
      preferred_timing: preferredTiming,
      preferred_mode: preferredMode,
      notes: message,
      status: 'NEW',
    })
    await notifyLeadSubmitted({ name, email, phone })
    return {
      ok: true,
      error: '',
      message: 'Thank you. Your enquiry has been received. We will respond with current demo and course details.',
    }
  } catch (error) {
    console.error('Lead submission error:', error)
    return { ok: false, error: 'We could not save your enquiry just now. Please try again.', message: '' }
  }
}

/** @deprecated kept for any remaining form actions */
export async function submitLeadAction(formData: FormData) {
  await submitEnquiry({ ok: false, error: '', message: '' }, formData)
}
