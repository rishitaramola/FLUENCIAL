'use client'

import { useState, useMemo, useEffect } from 'react'
import { Plus, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react'
import type { FAQItem } from '@/lib/data/faqs'
import { createFaq, updateFaq, deleteFaq } from '@/app/actions/faqs'
import { convertToFaq } from '@/app/actions/questions'

const CATEGORIES = [
  "WHY FLUENCIEL?",
  "GENERAL",
  "COURSES & LEARNING",
  "TEF, TCF, DELF & DALF",
  "CLASSES & BATCHES",
  "FEES & REFUNDS",
  "STUDY MATERIAL & SUPPORT",
  "LEARNING JOURNEY"
]

export function FaqsClient({ initialFaqs }: { initialFaqs: FAQItem[] }) {
  const [faqs, setFaqs] = useState<FAQItem[]>(initialFaqs)
  const [search, setSearch] = useState('')
  const [catFilter, setCatFilter] = useState('All')
  
  const [isEditing, setIsEditing] = useState<Partial<FAQItem> | null>(null)
  const [fromVisitorId, setFromVisitorId] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const fromId = params.get('fromId')
      if (fromId) {
        setFromVisitorId(fromId)
        setIsEditing({
          question: params.get('newQ') || '',
          answer: params.get('newA') || '',
          category: params.get('newC') || 'GENERAL',
          display_order: faqs.length > 0 ? Math.max(...faqs.map(f => f.display_order || 0)) + 1 : 1,
          is_published: false
        })
        // clear the URL so it doesn't stay there on refresh
        window.history.replaceState({}, '', window.location.pathname)
      }
    }
  }, [faqs])

  const filtered = useMemo(() => {
    return faqs.filter(f => {
      const qMatch = f.question.toLowerCase().includes(search.toLowerCase())
      const aMatch = f.answer.toLowerCase().includes(search.toLowerCase())
      const catMatch = catFilter === 'All' || f.category === catFilter
      return (qMatch || aMatch) && catMatch
    })
  }, [faqs, search, catFilter])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!isEditing || !isEditing.question || !isEditing.answer) return

    if (isEditing.id) {
      // update
      const res = await updateFaq(isEditing.id, {
        question: isEditing.question,
        answer: isEditing.answer,
        category: isEditing.category,
        display_order: isEditing.display_order,
        is_published: isEditing.is_published
      })
      setFaqs(faqs.map(f => f.id === res.id ? res : f))
    } else {
      // create or convert
      if (fromVisitorId) {
        const res = await convertToFaq(
          fromVisitorId, 
          isEditing.question, 
          isEditing.answer, 
          isEditing.category || 'GENERAL',
          isEditing.display_order ?? undefined,
          isEditing.is_published ?? undefined
        )
        if (res.success) {
          window.location.reload()
        } else {
          alert('Error converting: ' + res.error)
        }
      } else {
        const res = await createFaq({
          question: isEditing.question,
          answer: isEditing.answer,
          category: isEditing.category || 'GENERAL',
          display_order: isEditing.display_order || 0,
          is_published: isEditing.is_published || false
        })
        setFaqs([...faqs, res])
      }
    }
    setIsEditing(null)
    setFromVisitorId(null)
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this FAQ?')) return
    await deleteFaq(id)
    setFaqs(faqs.filter(f => f.id !== id))
  }

  async function togglePublish(id: string, current: boolean) {
    const res = await updateFaq(id, { is_published: !current })
    setFaqs(faqs.map(f => f.id === id ? res : f))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 gap-2">
          <input
            type="text"
            placeholder="Search FAQs..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <select
            value={catFilter}
            onChange={e => setCatFilter(e.target.value)}
            className="rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="All">All Categories</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <button
          onClick={() => setIsEditing({ category: 'GENERAL', display_order: 0, is_published: true })}
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
        >
          <Plus className="h-4 w-4" /> Add New FAQ
        </button>
      </div>

      {isEditing && (
        <div className="rounded-xl border border-indigo-200 bg-indigo-50/50 p-6 shadow-sm">
          <form onSubmit={handleSave} className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900">{isEditing.id ? 'Edit FAQ' : 'New FAQ'}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">Question</label>
                <input required type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" value={isEditing.question || ''} onChange={e => setIsEditing({...isEditing, question: e.target.value})} />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">Answer</label>
                <textarea required rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" value={isEditing.answer || ''} onChange={e => setIsEditing({...isEditing, answer: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" value={isEditing.category || 'GENERAL'} onChange={e => setIsEditing({...isEditing, category: e.target.value})}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Display Order</label>
                <input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" value={isEditing.display_order || 0} onChange={e => setIsEditing({...isEditing, display_order: parseInt(e.target.value)})} />
              </div>
              <div className="col-span-2 flex items-center gap-2">
                <input type="checkbox" id="publish" checked={isEditing.is_published || false} onChange={e => setIsEditing({...isEditing, is_published: e.target.checked})} className="rounded border-gray-300" />
                <label htmlFor="publish" className="text-sm font-medium text-gray-700">Published (visible on website)</label>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setIsEditing(null)} className="rounded-md bg-white border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
              <button type="submit" className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">Save FAQ</button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {filtered.map((faq) => (
          <div key={faq.id} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="rounded bg-indigo-50 px-2 py-0.5 text-xs font-semibold text-indigo-700">
                  {faq.category || 'General'}
                </span>
                <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                  Order: {faq.display_order}
                </span>
                <button 
                  onClick={() => togglePublish(faq.id, faq.is_published || false)}
                  className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-medium transition-colors ${faq.is_published ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'}`}
                >
                  {faq.is_published ? <><CheckCircle className="w-3 h-3"/> Published</> : <><XCircle className="w-3 h-3"/> Draft</>}
                </button>
              </div>
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => setIsEditing(faq)} className="text-xs text-gray-500 hover:text-indigo-600 font-medium flex items-center gap-1"><Edit className="w-3 h-3"/> Edit</button>
                <button type="button" onClick={() => handleDelete(faq.id)} className="text-xs text-red-500 hover:text-red-700 font-medium flex items-center gap-1"><Trash2 className="w-3 h-3"/> Delete</button>
              </div>
            </div>
            <h3 className="font-bold text-gray-900 text-base mt-2">{faq.question}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="p-12 text-center text-sm text-gray-500 border border-dashed rounded-xl bg-gray-50">
            No FAQs found matching your filters.
          </div>
        )}
      </div>
    </div>
  )
}
