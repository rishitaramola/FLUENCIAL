import type { Metadata } from 'next'
import { PublicShell } from '@/components/public-shell'

export const metadata: Metadata = { title: 'Refund Policy | Fluenciel Studio' }

export default function RefundPolicyPage() {
  return (
    <PublicShell>
      <div className="mx-auto max-w-4xl px-8 py-12 sm:px-12 lg:px-16 space-y-6 my-16 bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900">Refund & Cancellation Policy</h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          We want you to be completely satisfied with your educational experience at Fluenciel Studio.
        </p>
        <h3 className="text-lg font-bold text-gray-900">Demo Class & Cancellation</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          If you are unsatisfied after attending the initial demo session, a full refund of tuition fees will be processed within 7 business days prior to batch commencement.
        </p>
      </div>
    </PublicShell>
  )
}
