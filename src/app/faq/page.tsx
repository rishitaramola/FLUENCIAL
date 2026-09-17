import type { Metadata } from 'next'
import { PublicShell } from '@/components/public-shell'
import { getPublishedFaqs } from '@/lib/data/faqs'
import { FAQSection } from '@/components/faq-section'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions (FAQ) | Fluenciel Studio',
  description: 'Find answers to common questions about French courses, DELF certification, online payments, and class batch sizes.',
}

export default async function FAQPage() {
  const faqs = await getPublishedFaqs()

  return (
    <PublicShell>
      {/* Header Banner */}
      <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 relative z-10 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white/60 px-4 py-1.5 backdrop-blur-md">
            <span className="text-[11px] font-bold uppercase tracking-widest text-navy/70">
              Help & Knowledge Center
            </span>
          </div>
          
          <h1 className="font-heading text-4xl font-bold tracking-tight text-navy sm:text-5xl lg:text-6xl mx-auto max-w-4xl">
            Frequently Asked Questions
          </h1>
          
          <p className="mt-6 text-lg leading-relaxed text-navy/65 sm:text-xl mx-auto max-w-2xl">
            Everything you need to know about our language programs, certification exams, fee structures, and class schedules.
          </p>
        </div>
      </section>

      {/* FAQ List */}
      <section className="pb-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <FAQSection faqs={faqs} />
        </div>
      </section>
    </PublicShell>
  )
}
