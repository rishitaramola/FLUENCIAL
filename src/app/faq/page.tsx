import type { Metadata } from 'next'
import { PublicNav } from '@/components/public-nav'
import { PublicFooter } from '@/components/public-footer'
import { getAllFaqs } from '@/lib/data/faqs'
import { FAQSection } from '@/components/faq-section'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions (FAQ) | Fluenciel Studio',
  description: 'Find answers to common questions about French courses, DELF certification, online payments, and class batch sizes.',
}

export default async function FAQPage() {
  const faqs = await getAllFaqs()

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PublicNav />

      {/* Header Banner */}
      <section className="bg-gray-50 border-b border-gray-100 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
            Help & Knowledge Center
          </span>
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
            Everything you need to know about our language programs, certification exams, fee structures, and class schedules.
          </p>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-16 flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FAQSection faqs={faqs} />
        </div>
      </section>

      <PublicFooter />
    </div>
  )
}
