import type { Metadata } from 'next'
import { getAllFaqs } from '@/lib/data/faqs'
import { Plus, HelpCircle, Edit, Trash2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Manage FAQs',
}

export default async function AdminFaqsPage() {
  const faqs = await getAllFaqs()

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">FAQ Management</h1>
          <p className="text-sm text-gray-500">Create, edit, and re-order frequently asked questions displayed on the website.</p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
        >
          <Plus className="h-4 w-4" /> Add New FAQ
        </button>
      </div>

      <div className="space-y-4">
        {faqs.map((faq) => (
          <div key={faq.id} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="rounded bg-indigo-50 px-2 py-0.5 text-xs font-semibold text-indigo-700">
                Category: {faq.category || 'General'}
              </span>
              <div className="flex items-center gap-2">
                <button type="button" className="text-xs text-gray-500 hover:text-indigo-600 font-medium">Edit</button>
                <button type="button" className="text-xs text-red-500 hover:text-red-700 font-medium">Delete</button>
              </div>
            </div>
            <h3 className="font-bold text-gray-900 text-base">{faq.question}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
