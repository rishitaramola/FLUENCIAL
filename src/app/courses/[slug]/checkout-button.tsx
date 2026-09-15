'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CreditCard, Loader2 } from 'lucide-react'

interface CheckoutButtonProps {
  courseId: string
  courseTitle: string
  fee: number
}

export function CheckoutButton({ courseId, courseTitle, fee }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false)
  const [statusMsg, setStatusMsg] = useState<string | null>(null)
  const router = useRouter()

  async function handleCheckout() {
    setLoading(true)
    setStatusMsg(null)

    try {
      const res = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Order creation failed')
      }

      if (typeof window !== 'undefined' && (window as any).Razorpay) {
        const options = {
          key: data.keyId,
          amount: data.amount,
          currency: data.currency,
          name: 'Fluenciel Language Studio',
          description: `Enrollment for ${courseTitle}`,
          order_id: data.orderId,
          handler: function () {
            setStatusMsg('Payment successful! Redirecting to student dashboard...')
            setTimeout(() => {
              router.push('/dashboard/student')
            }, 1500)
          },
          theme: {
            color: '#4f46e5',
          },
        }

        const rzp = new (window as any).Razorpay(options)
        rzp.open()
      } else {
        setStatusMsg('Payment order generated successfully! Order ID: ' + data.orderId)
      }
    } catch (err: any) {
      console.error(err)
      setStatusMsg(err.message || 'Payment initiation failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-3">
      <button
        onClick={handleCheckout}
        disabled={loading}
        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-500 transition-colors disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Creating Order...
          </>
        ) : (
          <>
            <CreditCard className="h-4 w-4" /> Enroll & Pay ?{fee.toLocaleString('en-IN')}
          </>
        )}
      </button>

      {statusMsg && (
        <div className="rounded-lg bg-indigo-50 p-3 text-center text-xs font-medium text-indigo-700 border border-indigo-100">
          {statusMsg}
        </div>
      )}
    </div>
  )
}
