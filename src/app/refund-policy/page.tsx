import type { Metadata } from 'next'
import { PublicShell } from '@/components/public-shell'

export const metadata: Metadata = { title: 'Refund Policy | Fluenciel Studio' }

export default function RefundPolicyPage() {
  return (
    <PublicShell>
      <section className="pt-24 pb-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="rounded-[2.5rem] border border-white bg-white/60 p-8 shadow-sm backdrop-blur-md sm:p-12 space-y-8">
            <h1 className="font-heading text-3xl font-bold text-navy sm:text-4xl">Refund & Cancellation Policy</h1>
            
            <div className="space-y-6">
              <p className="text-[15px] text-navy/65 leading-relaxed">
                We want you to be completely satisfied with your educational experience at Fluenciel Studio.
              </p>
              
              <div className="space-y-3">
                <h3 className="font-heading text-xl font-bold text-navy">Demo Class & Cancellation</h3>
                <p className="text-[15px] text-navy/65 leading-relaxed">
                  If you are unsatisfied after attending the initial demo session, a full refund of tuition fees will be processed within 7 business days prior to batch commencement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicShell>
  )
}
