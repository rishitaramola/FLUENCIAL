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

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fluenciel.com'

    // 1. Send Visitor Acknowledgement
    try {
      await sendTransactionalEmail({
        to: email,
        subject: 'We received your query — Fluenciel Language Academy',
        text: `Hi ${name},\n\nThank you for contacting Fluenciel Language Academy.\n\nWe have received your query successfully and our team will review it shortly.\n\nYour query:\n${question}\n\nWe’ll get back to you as soon as possible.\n\nRegards,\nFluenciel Language Academy\n\n${siteUrl}`,
      })
    } catch (emailErr) {
      console.error('Failed to send visitor acknowledgement email:', emailErr)
    }

    // 2. Send Admin Notification
    const adminInbox = process.env.LEADS_NOTIFY_EMAIL
    if (adminInbox) {
      try {
        await sendTransactionalEmail({
          to: adminInbox,
          subject: 'New FAQ Query — Fluenciel Website',
          text: `A new question has been submitted through the Fluenciel website.\n\nName: ${name}\nEmail: ${email}\n\nQuestion:\n${question}\n\nSubmitted: ${new Date().toLocaleString()}\n\nPlease review the query in the existing admin workflow.`,
        })
      } catch (adminEmailErr) {
        console.error('Failed to send admin notification email:', adminEmailErr)
      }
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
    
    // Fetch the existing question first to get Name and Original Question
    const { data: existingQ, error: fetchErr } = await supabase
      .from('visitor_questions')
      .select('name, email, question, status')
      .eq('id', id)
      .single()
      
    if (fetchErr || !existingQ) {
      return { success: false, error: 'Could not find the original question.' }
    }

    // Save the answer exactly as before
    const { error } = await supabase
      .from('visitor_questions')
      .update({ admin_answer, status: 'ANSWERED' })
      .eq('id', id)

    if (error) {
      return { success: false, error: error.message }
    }

    // Trigger the automated email if requested
    if (sendEmail && existingQ.email) {
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fluenciel.com'
      const emailContent = `Hi ${existingQ.name},\n\nYour query has been answered by the Fluenciel Language Academy team.\n\nYour original query:\n${existingQ.question}\n\nOur response:\n${admin_answer}\n\nThank you for reaching out to us.\n\nRegards,\nFluenciel Language Academy\n\n${siteUrl}`
      
      try {
        await sendTransactionalEmail({
          to: existingQ.email,
          subject: 'Your query has been answered — Fluenciel Language Academy',
          text: emailContent,
        })
      } catch (emailErr) {
        // Log gracefully so the answer is still saved
        console.error('Failed to send answer email:', emailErr)
      }
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
