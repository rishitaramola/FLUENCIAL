'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { sendTransactionalEmail } from '@/lib/email'

export async function submitVisitorQuestion(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const question = formData.get('question') as string

  if (!name || !email || !question) {
    return { success: false, error: 'Name, email, and question are required.' }
  }

  try {
    const supabase = await createClient()
    const { error } = await supabase.from('visitor_questions').insert({
      name,
      email,
      phone,
      question,
      status: 'PENDING',
      is_public: false,
    })

    if (error) {
      console.error('Error submitting question:', error)
      return { success: false, error: 'Failed to submit question. Please try again.' }
    }

    const adminInbox = process.env.LEADS_NOTIFY_EMAIL
    if (adminInbox) {
      await sendTransactionalEmail({
        to: adminInbox,
        subject: `New Question Received — Fluenciel`,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || '—'}\n\nQuestion:\n${question}\n\nReview it in your Admin Dashboard.`,
      })
    }

    return { success: true }
  } catch (error) {
    console.error('Unexpected error:', error)
    return { success: false, error: 'An unexpected error occurred.' }
  }
}

export async function answerVisitorQuestion(id: string, admin_answer: string, sendEmail: boolean, visitorEmail?: string) {
  try {
    const supabase = await createClient()
    const { error } = await supabase
      .from('visitor_questions')
      .update({ admin_answer, status: 'ANSWERED' })
      .eq('id', id)

    if (error) {
      return { success: false, error: error.message }
    }

    if (sendEmail && visitorEmail) {
      await sendTransactionalEmail({
        to: visitorEmail,
        subject: 'Response to your question — Fluenciel',
        text: `Hello,\n\nHere is our response to your question:\n\n${admin_answer}\n\n— The Fluenciel Team`,
      })
    }

    revalidatePath('/dashboard/admin/questions')
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function convertToFaq(id: string, question: string, answer: string, category: string, display_order?: number, is_published?: boolean) {
  try {
    const supabase = await createClient()
    
    let newOrder = display_order
    if (newOrder === undefined) {
      const { data: latestFaq } = await supabase
        .from('faqs')
        .select('display_order')
        .order('display_order', { ascending: false })
        .limit(1)
        .single()
      newOrder = (latestFaq?.display_order || 0) + 1
    }

    const { error: faqError } = await supabase.from('faqs').insert({
      question,
      answer,
      category,
      display_order: newOrder,
      is_published: is_published ?? false
    })

    if (faqError) {
      return { success: false, error: faqError.message }
    }

    const { error: vqError } = await supabase
      .from('visitor_questions')
      .update({ status: 'PUBLISHED' })
      .eq('id', id)

    if (vqError) {
      return { success: false, error: vqError.message }
    }

    revalidatePath('/dashboard/admin/questions')
    revalidatePath('/dashboard/admin/faqs')
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function deleteVisitorQuestion(id: string) {
  try {
    const supabase = await createClient()
    const { error } = await supabase.from('visitor_questions').delete().eq('id', id)
    if (error) return { success: false, error: error.message }
    revalidatePath('/dashboard/admin/questions')
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}
