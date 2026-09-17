'use client'

import { ChevronDown } from 'lucide-react'
import type { FAQItem } from '@/lib/data/faqs'

export function FAQSection({ faqs }: { faqs: FAQItem[] }) {
  if (faqs.length === 0) {
    return (
      <p className="text-center text-sm text-navy/60">
        FAQs will appear here once they are published.
      </p>
    )
  }

  const grouped = faqs.reduce<Record<string, FAQItem[]>>((acc, faq) => {
    const key = faq.category || 'General'
    acc[key] ??= []
    acc[key].push(faq)
    return acc
  }, {})

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      {Object.entries(grouped).map(([category, items]) => (
        <section key={category}>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-navy/40">{category}</h3>
          <div className="space-y-3">
            {items.map((faq) => (
              <details
                key={faq.id}
                className="group rounded-[1.5rem] border border-white bg-white/80 p-2 shadow-sm open:shadow-md"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-[1.2rem] px-4 py-3 text-left text-[15px] font-semibold text-navy">
                  {faq.question}
                  <ChevronDown className="h-4 w-4 shrink-0 text-navy/40 transition group-open:rotate-180" />
                </summary>
                <p className="px-4 pb-4 text-sm leading-relaxed text-navy/65">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
