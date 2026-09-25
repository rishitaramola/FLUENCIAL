'use client'

import { useState } from 'react'
import { Loader2, CheckCircle2 } from 'lucide-react'
import { submitVisitorQuestion } from '@/app/actions/questions'

export function AskQuestionForm() {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')
    
    const formData = new FormData(e.currentTarget)
    const result = await submitVisitorQuestion(formData)
    
    setLoading(false)
    if (result.success) {
      setSuccess(true)
    } else {
      setErrorMsg(result.error || 'Something went wrong.')
    }
  }

  if (success) {
    return (
      <div className="mt-6 flex flex-col items-center justify-center p-6 bg-indigo-50/50 rounded-2xl border border-indigo-100">
        <CheckCircle2 className="h-10 w-10 text-indigo-500 mb-3" />
        <h3 className="text-base font-semibold text-navy">Thank you! Your question has been received.</h3>
        <p className="text-sm text-navy/70 mt-1 text-center">
          Our team will review it and get back to you.
        </p>
        <button
          onClick={() => { setSuccess(false); setIsOpen(false); }}
          className="mt-4 text-xs font-semibold text-indigo-600 hover:text-indigo-500"
        >
          Close
        </button>
      </div>
    )
  }

  if (!isOpen) {
    return (
      <div className="mt-6">
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-500 transition-colors"
        >
          Ask a Question
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 text-left space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-xs font-medium text-navy/70 mb-1">Name *</label>
          <input
            id="name"
            name="name"
            required
            className="w-full rounded-xl border-none bg-white/50 px-4 py-2.5 text-sm shadow-sm ring-1 ring-inset ring-navy/10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 outline-none transition-all"
            placeholder="Jane Doe"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-xs font-medium text-navy/70 mb-1">Email *</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-xl border-none bg-white/50 px-4 py-2.5 text-sm shadow-sm ring-1 ring-inset ring-navy/10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 outline-none transition-all"
            placeholder="jane@example.com"
          />
        </div>
      </div>
      <div>
        <label htmlFor="phone" className="block text-xs font-medium text-navy/70 mb-1">Phone / WhatsApp <span className="font-normal opacity-70">(Optional)</span></label>
        <input
          id="phone"
          name="phone"
          type="tel"
          className="w-full rounded-xl border-none bg-white/50 px-4 py-2.5 text-sm shadow-sm ring-1 ring-inset ring-navy/10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 outline-none transition-all"
          placeholder="+1234567890"
        />
      </div>
      <div>
        <label htmlFor="question" className="block text-xs font-medium text-navy/70 mb-1">Your Question *</label>
        <textarea
          id="question"
          name="question"
          required
          rows={3}
          className="w-full rounded-xl border-none bg-white/50 px-4 py-3 text-sm shadow-sm ring-1 ring-inset ring-navy/10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 outline-none transition-all resize-none"
          placeholder="How long does it take to reach B2 level?"
        />
      </div>
      
      {/* Honeypot field for anti-spam */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      
      {errorMsg && (
        <p className="text-xs text-red-600 font-medium">{errorMsg}</p>
      )}

      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="px-4 py-2 text-sm font-semibold text-navy/60 hover:text-navy transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-200 hover:bg-indigo-500 transition-colors disabled:opacity-50"
        >
          {loading ? (
            <><Loader2 className="h-4 w-4 animate-spin" /> Submitting...</>
          ) : (
            'Submit Question'
          )}
        </button>
      </div>
    </form>
  )
}
