import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const rawBody = await request.text()
    const signature = request.headers.get('x-razorpay-signature')
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET

    // Verify webhook signature if secret is configured
    if (secret && signature) {
      const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(rawBody)
        .digest('hex')

      if (expectedSignature !== signature) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
      }
    }

    const event = JSON.parse(rawBody)
    const eventType = event.event
    const razorpayEventId = event.event_id || `evt_${Date.now()}`
    const payload = event.payload

    const supabase = await createClient()

    // 1. Log webhook event
    await supabase.from('webhook_events').insert({
      razorpay_event_id: razorpayEventId,
      event_type: eventType,
      payload: payload,
    })

    // 2. Handle payment events
    if (eventType === 'payment.captured' || eventType === 'order.paid') {
      const paymentEntity = payload.payment?.entity || payload.order?.entity
      const orderId = paymentEntity?.order_id || paymentEntity?.id
      const paymentId = paymentEntity?.id
      const method = paymentEntity?.method || 'online'

      if (orderId) {
        await supabase
          .from('payments')
          .update({
            status: 'SUCCESS',
            payment_id: paymentId,
            method: method,
            razorpay_event_id: razorpayEventId,
            updated_at: new Date().toISOString(),
          })
          .eq('order_id', orderId)
      }
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error('Webhook processing error:', error)
    return NextResponse.json({ error: error.message || 'Webhook failed' }, { status: 500 })
  }
}
