'use client'

import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Download, X, Loader2 } from 'lucide-react'
import { Turnstile } from '@marsidev/react-turnstile'
import { downloadBrochureAction, submitBrochureFormAction } from '@/app/actions/brochure'
import type { Tables } from '@/lib/supabase/types'

type Course = Tables<'courses'>

export function BrochureDownloadButton({
  isAuthenticated,
  courses,
}: {
  isAuthenticated: boolean
  courses: Course[]
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [turnstileToken, setTurnstileToken] = useState<string>('')
  
  const [mounted, setMounted] = useState(false)
  const turnstileRef = useRef<any>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleOpen = async () => {
    if (isAuthenticated) {
      setIsSubmitting(true)
      const res = await downloadBrochureAction()
      if (res.url) {
        window.open(res.url, '_blank')
      } else {
        alert(res.error || 'Failed to open brochure.')
      }
      setIsSubmitting(false)
    } else {
      setIsOpen(true)
      setError('')
      setSuccessMsg('')
      setTurnstileToken('')
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    setTimeout(() => {
      setError('')
      setSuccessMsg('')
      setTurnstileToken('')
    }, 200)
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    
    if (!turnstileToken) {
      setError('Please complete the verification.')
      setIsSubmitting(false)
      return
    }

    const formData = new FormData(e.currentTarget)
    formData.append('cf-turnstile-response', turnstileToken)
    
    const res = await submitBrochureFormAction(formData)
    
    if (res.url) {
      setSuccessMsg('Details verified. Opening brochure...')
      setTimeout(() => {
        setIsOpen(false)
        window.open(res.url, '_blank')
        setIsSubmitting(false)
        setSuccessMsg('')
      }, 1500)
    } else {
      setError(res.error || 'Failed to verify details.')
      setIsSubmitting(false)
      // Reset Turnstile on error so they can try again
      turnstileRef.current?.reset()
      setTurnstileToken('')
    }
  }

  const modalContent = (
    <div className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center p-4 sm:p-6 bg-navy/40 backdrop-blur-sm transition-opacity overflow-y-auto">
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md flex flex-col my-8 sm:my-auto animate-in fade-in zoom-in-95 duration-200 shrink-0">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <div>
            <h2 className="text-lg font-bold text-navy font-heading">
              Brochure Access
            </h2>
            <p className="text-xs text-navy/60 mt-0.5">
              Please enter your details to view the brochure.
            </p>
          </div>
          <button 
            onClick={handleClose}
            disabled={isSubmitting || !!successMsg}
            className="text-navy/40 hover:text-navy/80 transition-colors p-1.5 rounded-full hover:bg-navy/5 shrink-0 ml-4 disabled:opacity-50"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleFormSubmit} className="p-5 space-y-3.5">
          {error && (
            <div className="p-2.5 text-xs text-red-600 bg-red-50 rounded-lg border border-red-100">
              {error}
            </div>
          )}
          {successMsg && (
            <div className="p-2.5 text-xs text-green-700 bg-green-50 rounded-lg border border-green-100">
              {successMsg}
            </div>
          )}
          
          <div>
            <label htmlFor="name" className="mb-1 block text-[11px] font-semibold text-navy/70 uppercase tracking-wider">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              disabled={isSubmitting || !!successMsg}
              className="w-full rounded-xl border border-navy/10 bg-gray-50/50 px-3.5 py-2 text-sm text-navy transition-colors focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-50"
            />
          </div>

          <div>
            <label htmlFor="dob" className="mb-1 block text-[11px] font-semibold text-navy/70 uppercase tracking-wider">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <input
              id="dob"
              name="dob"
              type="date"
              required
              max={new Date().toISOString().split('T')[0]}
              disabled={isSubmitting || !!successMsg}
              className="w-full rounded-xl border border-navy/10 bg-gray-50/50 px-3.5 py-2 text-sm text-navy transition-colors focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-50"
            />
          </div>

          <div>
            <label htmlFor="courseId" className="mb-1 block text-[11px] font-semibold text-navy/70 uppercase tracking-wider">
              Program Interested In <span className="text-red-500">*</span>
            </label>
            <select
              id="courseId"
              name="courseId"
              required
              disabled={isSubmitting || !!successMsg}
              className="w-full rounded-xl border border-navy/10 bg-gray-50/50 px-3.5 py-2 text-sm text-navy transition-colors focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-50"
            >
              <option value="">Select a program...</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>{c.title}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-[11px] font-semibold text-navy/70 uppercase tracking-wider">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              disabled={isSubmitting || !!successMsg}
              className="w-full rounded-xl border border-navy/10 bg-gray-50/50 px-3.5 py-2 text-sm text-navy transition-colors focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-50"
            />
          </div>

          <div>
            <label htmlFor="phone" className="mb-1 block text-[11px] font-semibold text-navy/70 uppercase tracking-wider">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              minLength={6}
              disabled={isSubmitting || !!successMsg}
              className="w-full rounded-xl border border-navy/10 bg-gray-50/50 px-3.5 py-2 text-sm text-navy transition-colors focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-50"
            />
          </div>

          <div className="flex justify-center pt-1 overflow-hidden rounded-xl">
            {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ? (
              <Turnstile
                ref={turnstileRef}
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                onSuccess={(token) => {
                  setTurnstileToken(token)
                  setError('')
                }}
                onError={() => setError('Verification failed. Please try again.')}
                onExpire={() => {
                  setTurnstileToken('')
                  setError('Verification expired. Please verify again.')
                }}
                options={{
                  theme: 'light',
                  size: 'normal'
                }}
              />
            ) : (
              <div className="p-3 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg text-center w-full">
                Verification configuration missing.
              </div>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting || !!successMsg || !turnstileToken}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-navy px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-navy/90 focus:outline-none focus:ring-4 focus:ring-navy/20 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : successMsg ? (
                <>Verified!</>
              ) : (
                <>Continue to Brochure</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )

  return (
    <>
      <button
        onClick={handleOpen}
        disabled={isSubmitting && isAuthenticated}
        className="inline-flex items-center justify-center gap-2 rounded-full border border-navy/20 bg-white/80 px-6 py-3.5 text-sm font-semibold text-navy shadow-sm transition hover:bg-white focus:outline-none focus:ring-4 focus:ring-navy/10"
      >
        {isSubmitting && isAuthenticated ? (
          <Loader2 className="h-4 w-4 animate-spin text-navy" />
        ) : (
          <Download className="h-4 w-4 text-navy/70" />
        )}
        {isSubmitting && isAuthenticated ? 'Opening...' : 'Download Brochure'}
      </button>

      {isOpen && !isAuthenticated && mounted && typeof document !== 'undefined'
        ? createPortal(modalContent, document.body)
        : null}
    </>
  )
}
