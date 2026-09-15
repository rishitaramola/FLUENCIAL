'use client'

import { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'
import type { FAQItem } from '@/lib/data/faqs'

interface FAQProps {
  faqs: FAQItem[]
}

export function FAQSection({ faqs }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx
        return (
          <div
            key={faq.id || idx}
            className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-xs transition-all"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-indigo-50 p-2 text-indigo-600 shrink-0">
                  <HelpCircle className="h-5 w-5" />
                </div>
                <span className="font-bold text-gray-900 text-base">{faq.question}</span>
              </div>
              <ChevronDown
                className={`h-5 w-5 text-gray-400 transition-transform duration-200 shrink-0 ${
                  isOpen ? 'rotate-180 text-indigo-600' : ''
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-6 pb-6 pt-0 text-sm text-gray-600 leading-relaxed border-t border-gray-50 mt-2 pt-4">
                {faq.answer}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
