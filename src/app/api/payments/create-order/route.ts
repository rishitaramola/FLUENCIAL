import { NextResponse } from 'next/server'
import { razorpay } from '@/lib/razorpay'
import { createClient } from '@/lib/supabase/server'
import { getCourseById } from '@/lib/data/courses'

export async function POST(request: Request) {
  try {
    const { courseId } = await request.json()

    if (!courseId) {
      return NextResponse.json({ error: 'Course ID is required' }, { status: 400 })
    }

    const course = await getCourseById(courseId)
    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    }

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    // Amount in paise (e.g. 15000 INR = 1500000 paise)
    const amountPaise = course.fee * 100

    const orderOptions = {
      amount: amountPaise,
      currency: 'INR',
      receipt: `rcpt_${Date.now().toString().slice(-8)}`,
      notes: {
        course_id: course.id,
        course_title: course.title,
        student_id: user?.id || null,
      },
    }

    let orderId = `order_${Math.random().toString(36).substring(2, 12)}`
    
    // Attempt to call Razorpay API if keys are provided
    if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_ID !== 'your_razorpay_key_id') {
      try {
        const order = await razorpay.orders.create(orderOptions)
        orderId = order.id
      } catch (rpErr: any) {
        console.warn('Razorpay API error, falling back to mock order:', rpErr?.message)
      }
    }

    // Insert pending payment record into Supabase
    const { data: paymentRecord, error: dbError } = await supabase
      .from('payments')
      .insert({
        order_id: orderId,
        course_id: course.id,
        student_id: user?.id || null,
        amount_paise: amountPaise,
        currency: 'INR',
        status: 'CREATED',
      })
      .select()
      .single()

    if (dbError) {
      console.error('Database insertion error for payment:', dbError.message)
    }

    return NextResponse.json({
      orderId,
      amount: amountPaise,
      currency: 'INR',
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder',
      courseTitle: course.title,
      paymentId: paymentRecord?.id,
    })
  } catch (error: any) {
    console.error('Error creating payment order:', error)
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 })
  }
}
