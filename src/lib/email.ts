type EmailPayload = {
  to: string | string[]
  subject: string
  text: string
  html?: string
}

async function sendWithResend(payload: EmailPayload) {
  const key = process.env.RESEND_API_KEY
  if (!key) return { skipped: true as const }

  const from = process.env.EMAIL_FROM || 'Fluenciel <noreply@localhost>'
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: payload.to,
      subject: payload.subject,
      text: payload.text,
      html: payload.html ?? `<pre>${payload.text}</pre>`,
    }),
  })

  if (!res.ok) {
    const body = await res.text()
    console.error('Email send failed:', res.status, body)
    return { skipped: false as const, ok: false }
  }
  return { skipped: false as const, ok: true }
}

export async function sendTransactionalEmail(payload: EmailPayload) {
  try {
    return await sendWithResend(payload)
  } catch (error) {
    console.error('Email provider error:', error)
    return { skipped: false, ok: false }
  }
}

export async function notifyLeadSubmitted(input: {
  name: string
  email: string
  phone?: string | null
}) {
  await sendTransactionalEmail({
    to: input.email,
    subject: 'We received your Fluenciel enquiry',
    text: `Hello ${input.name},\n\nThank you for contacting Fluenciel Language Studio. We have received your enquiry and will respond with current course and demo details.\n\n— Fluenciel`,
  })

  const adminInbox = process.env.LEADS_NOTIFY_EMAIL
  if (adminInbox) {
    await sendTransactionalEmail({
      to: adminInbox,
      subject: `New enquiry from ${input.name}`,
      text: `Name: ${input.name}\nEmail: ${input.email}\nPhone: ${input.phone || '—'}\n`,
    })
  }
}

export async function notifyPaymentConfirmed(input: {
  email: string
  name?: string
  courseTitle: string
}) {
  await sendTransactionalEmail({
    to: input.email,
    subject: 'Payment received — Fluenciel',
    text: `Hello ${input.name || 'there'},\n\nWe received a verified payment for ${input.courseTitle}. Enrolment status will update once the academy confirms your place.\n\n— Fluenciel`,
  })
}
