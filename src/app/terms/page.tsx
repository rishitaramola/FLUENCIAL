import type { Metadata } from 'next'
import { PublicShell } from '@/components/public-shell'

export const metadata: Metadata = { title: 'Terms & Conditions | Fluenciel Studio' }

export default function TermsPage() {
  return (
    <PublicShell>
      <section className="pt-24 pb-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="rounded-[2.5rem] border border-white bg-white/60 p-8 shadow-sm backdrop-blur-md sm:p-12 space-y-8">
            <h1 className="font-heading text-3xl font-bold text-navy sm:text-4xl">Terms & Conditions</h1>
            
            <div className="space-y-6">
              <p className="text-[15px] text-navy/65 leading-relaxed">
                By accessing Fluenciel Language Studio services, enrolling in courses, or utilizing website resources, you agree to comply with the following terms.
              </p>
              
              <div className="space-y-3">
                <h3 className="font-heading text-xl font-bold text-navy">Course Enrollment & Attendance</h3>
                <p className="text-[15px] text-navy/65 leading-relaxed">
                  Students are expected to adhere to class schedules and maintain active participation in live speaking laboratories. Course materials provided are for individual personal use only.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicShell>
  )
}
