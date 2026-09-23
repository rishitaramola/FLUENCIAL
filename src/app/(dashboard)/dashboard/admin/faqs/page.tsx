import type { Metadata } from 'next'
import { getAllFaqs } from '@/lib/data/faqs'
import { FaqsClient } from './faqs-client'

export const metadata: Metadata = {
  title: 'Manage FAQs',
}

export const dynamic = 'force-dynamic'

export default async function AdminFaqsPage() {
  const faqs = await getAllFaqs()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">FAQ Management</h1>
        <p className="text-sm text-gray-500">Create, edit, and re-order frequently asked questions displayed on the website.</p>
      </div>
      <FaqsClient initialFaqs={faqs} />
    </div>
  )
}
