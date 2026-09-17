import type { Metadata } from 'next'
import { PublicShell } from '@/components/public-shell'

export const metadata: Metadata = { title: 'Terms & Conditions | Fluenciel Studio' }

export default function TermsPage() {
  return (
    <PublicShell>
      <div className="mx-auto max-w-4xl px-8 py-12 sm:px-12 lg:px-16 space-y-6 my-16 bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900">Terms & Conditions</h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          By accessing Fluenciel Language Studio services, enrolling in courses, or utilizing website resources, you agree to comply with the following terms.
        </p>
        <h3 className="text-lg font-bold text-gray-900">Course Enrollment & Attendance</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          Students are expected to adhere to class schedules and maintain active participation in live speaking laboratories. Course materials provided are for individual personal use only.
        </p>
      </div>
    </PublicShell>
  )
}
