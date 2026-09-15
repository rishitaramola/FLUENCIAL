import type { Metadata } from 'next'
import { PublicNav } from '@/components/public-nav'
import { PublicFooter } from '@/components/public-footer'

export const metadata: Metadata = { title: 'Terms & Conditions | Fluenciel Studio' }

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PublicNav />
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 space-y-6 flex-1">
        <h1 className="text-3xl font-bold text-gray-900">Terms & Conditions</h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          By accessing Fluenciel Language Studio services, enrolling in courses, or utilizing website resources, you agree to comply with the following terms.
        </p>
        <h3 className="text-lg font-bold text-gray-900">Course Enrollment & Attendance</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          Students are expected to adhere to class schedules and maintain active participation in live speaking laboratories. Course materials provided are for individual personal use only.
        </p>
      </div>
      <PublicFooter />
    </div>
  )
}
