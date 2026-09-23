'use client'

import { useState, useMemo } from 'react'
import { ChevronDown, Search, X } from 'lucide-react'
import type { FAQItem } from '@/lib/data/faqs'
import { AskQuestionForm } from './ask-question-form'

const CATEGORIES = [
  "All",
  "WHY FLUENCIEL?",
  "GENERAL",
  "COURSES & LEARNING",
  "TEF, TCF, DELF & DALF",
  "CLASSES & BATCHES",
  "FEES & REFUNDS",
  "STUDY MATERIAL & SUPPORT",
  "LEARNING JOURNEY"
]

export function FAQSection({ faqs }: { faqs: FAQItem[] }) {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredFaqs = useMemo(() => {
    return faqs.filter(faq => {
      const matchSearch = faq.question.toLowerCase().includes(search.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(search.toLowerCase())
      
      const matchCategory = selectedCategory === 'All' || 
                            faq.category?.toUpperCase() === selectedCategory

      return matchSearch && matchCategory
    })
  }, [faqs, search, selectedCategory])

  const grouped = filteredFaqs.reduce<Record<string, FAQItem[]>>((acc, faq) => {
    const key = faq.category || 'General'
    acc[key] ??= []
    acc[key].push(faq)
    return acc
  }, {})

  return (
    <div className="mx-auto max-w-4xl space-y-12">
      {/* Search and Filter */}
      <div className="space-y-6">
        <div className="relative max-w-xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-navy/40" />
          </div>
          <input
            type="text"
            className="block w-full rounded-full border-none bg-white/90 pl-11 pr-10 py-3.5 text-sm shadow-sm ring-1 ring-inset ring-navy/10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 outline-none backdrop-blur-md"
            placeholder="Search your question..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-navy/40 hover:text-navy"
              onClick={() => setSearch('')}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                selectedCategory === cat 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'bg-white/60 text-navy/60 hover:bg-white hover:text-navy hover:shadow-sm border border-navy/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {filteredFaqs.length === 0 ? (
        <div className="text-center py-12 rounded-[2rem] border border-white/50 bg-white/40 backdrop-blur-md shadow-sm">
          <p className="text-navy/60 text-sm font-medium mb-4">No FAQs found.</p>
          <button 
            onClick={() => { setSearch(''); setSelectedCategory('All'); }}
            className="text-indigo-600 text-sm font-semibold hover:text-indigo-500 underline underline-offset-4"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="space-y-8 max-w-3xl mx-auto">
          {Object.entries(grouped).map(([category, items]) => (
            <section key={category}>
              <h3 className="mb-4 ml-2 text-xs font-semibold uppercase tracking-[0.18em] text-navy/50">{category}</h3>
              <div className="space-y-3">
                {items.map((faq) => (
                  <details
                    key={faq.id}
                    className="group rounded-[1.5rem] border border-white/60 bg-white/80 p-2 shadow-sm open:shadow-md transition-all duration-200"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-[1.2rem] px-4 py-3 text-left text-[15px] font-semibold text-navy hover:bg-white/50 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-600/50">
                      <span className="leading-snug">{faq.question}</span>
                      <ChevronDown className="h-5 w-5 shrink-0 text-navy/40 transition-transform duration-300 group-open:rotate-180" />
                    </summary>
                    <p className="px-4 pb-4 pt-1 text-[14.5px] leading-relaxed text-navy/70">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {/* Ask a Question CTA */}
      <div className="max-w-xl mx-auto mt-20 p-8 rounded-[2rem] border border-white bg-white/80 shadow-lg text-center backdrop-blur-md relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-white pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <h2 className="text-2xl font-bold text-navy font-heading">Still have a question?</h2>
          <p className="text-navy/70 text-sm max-w-md mx-auto">
            Can&apos;t find what you&apos;re looking for? Ask the Fluenciel team. We&apos;ll review your question and get back to you.
          </p>
          <AskQuestionForm />
        </div>
      </div>
    </div>
  )
}
