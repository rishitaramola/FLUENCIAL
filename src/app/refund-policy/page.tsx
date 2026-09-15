import type { Metadata } from 'next'
import { PublicNav } from '@/components/public-nav'
import { PublicFooter } from '@/components/public-footer'

export const metadata: Metadata = { title: 'Refund Policy | Fluenciel Studio' }

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PublicNav />
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 space-y-6 flex-1">
        <h1 className="text-3xl font-bold text-gray-900">Refund & Cancellation Policy</h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          We want you to be completely satisfied with your educational experience at Fluenciel Studio.
        </p>
        <h3 className="text-lg font-bold text-gray-900">Demo Class & Cancellation</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          If you are unsatisfied after attending the initial demo session, a full refund of tuition fees will be processed within 7 business days prior to batch commencement.
        </p>
      </div>
      <PublicFooter />
    </div>
  )
}
