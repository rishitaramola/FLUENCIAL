'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { sendTransactionalEmail } from '@/lib/email'

export async function submitVisitorQuestion(formData: FormData) {
  const name = String(formData.get('name') || '').trim()
  const email = String(formData.get('email') || '').trim().toLowerCase()
  const phone = String(formData.get('phone') || '').trim()
  const question = String(formData.get('question') || '').trim()
  const honeypot = String(formData.get('website') || '').trim() // simple honeypot

  // Anti-spam / Honeypot
  if (honeypot) {
    // silently reject bot submissions
    return { success: true }
  }

  // Server-side validations
  if (!name || name.length > 100) return { success: false, error: 'Please provide a valid name.' }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { success: false, error: 'Please provide a valid email.' }
  if (!question || question.length > 2000) return { success: false, error: 'Please provide a valid question.' }
  if (phone && phone.length > 20) return { success: false, error: 'Please provide a valid phone number.' }

  try {
    const supabase = await createClient()

    // Duplicate email protection: Check for exact same question by same email in last 5 minutes
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString()
    const { data: existingQ } = await supabase
      .from('visitor_questions')
      .select('id')
      .eq('email', email)
      .eq('question', question)
      .gte('created_at', fiveMinutesAgo)
      .maybeSingle()

    if (existingQ) {
      // Prevent duplicate notification by treating this as a success without re-inserting
      return { success: true }
    }

    // Insert to DB as Source of Truth
    const { data: insertedRecord, error } = await supabase.from('visitor_questions').insert({
      name,
      email,
      phone,
      question,
      status: 'PENDING',
      is_public: false,
    }).select('id, created_at').single()

    if (error || !insertedRecord) {
      console.error('Error submitting question:', error)
      return { success: false, error: 'Failed to submit question. Please try again.' }
    }

    // Email Notification Configuration
    const notificationEmail = process.env.FAQ_NOTIFICATION_EMAIL
    const fromEmail = process.env.FAQ_FROM_EMAIL

    if (notificationEmail && fromEmail) {
      const submittedDate = new Date(insertedRecord.created_at).toLocaleString()
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fluenciel.com'
      const adminLink = `${siteUrl}/dashboard/admin/questions`
      
      const htmlContent = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b;">
          <h2 style="color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 12px;">New Question Received</h2>
          
          <div style="margin-top: 24px;">
            <p style="margin: 4px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 4px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #4f46e5;">${email}</a></p>
            ${phone ? `<p style="margin: 4px 0;"><strong>Phone:</strong> ${phone}</p>` : ''}
          </div>

          <div style="margin-top: 24px; background-color: #f8fafc; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0;">
            <p style="margin: 0; font-weight: 600; color: #475569; font-size: 14px; text-transform: uppercase;">Question</p>
            <p style="margin: 8px 0 0 0; white-space: pre-wrap;">${question}</p>
          </div>

          <div style="margin-top: 24px; font-size: 14px; color: #64748b;">
            <p style="margin: 4px 0;"><strong>Submitted:</strong> ${submittedDate}</p>
            <p style="margin: 4px 0;"><strong>Question ID:</strong> ${insertedRecord.id}</p>
            <p style="margin: 4px 0;"><strong>Status:</strong> PENDING</p>
          </div>

          <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
            <a href="${adminLink}" style="display: inline-block; background-color: #0f172a; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: 500; font-size: 14px;">View in Admin Dashboard</a>
          </div>
        </div>
      `

      const textContent = `
New Question Received

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}

Question:
${question}

Submitted: ${submittedDate}
Question ID: ${insertedRecord.id}
Status: PENDING

Review in admin dashboard: ${adminLink}
      `.trim()

      try {
        await sendTransactionalEmail({
          to: notificationEmail,
          from: fromEmail,
          replyTo: email,
          subject: 'New FAQ Question — FLUENCIEL',
          html: htmlContent,
          text: textContent,
        })
      } catch (emailErr) {
        // Log gracefully so the visitor question remains successfully inserted
        console.error('Failed to send FAQ admin notification:', emailErr)
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
