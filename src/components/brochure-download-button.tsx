'use client'

import { useState } from 'react'
import { Download, X, Loader2 } from 'lucide-react'
import { downloadBrochureAction } from '@/app/actions/brochure'
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
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleOpen = async () => {
    if (isAuthenticated) {
      setLoading(true)
      const res = await downloadBrochureAction()
      if (res.url) {
        window.open(res.url, '_blank')
      } else {
        // Fallback error alert if bucket/file doesn't exist yet
        alert(res.error || 'Failed to open brochure.')
      }
      setLoading(false)
    } else {
      setIsOpen(true)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const formData = new FormData(e.currentTarget)
    const res = await downloadBrochureAction(formData)
    
    if (res.url) {
      setIsOpen(false)
      window.open(res.url, '_blank')
    } else {
      setError(res.error || 'Failed to submit details.')
    }
    setLoading(false)
  }

  return (
    <>
      <button
        onClick={handleOpen}
        disabled={loading && isAuthenticated}
        className="inline-flex items-center justify-center gap-2 rounded-full border border-navy/20 bg-white/80 px-6 py-3.5 text-sm font-semibold text-navy shadow-sm transition hover:bg-white focus:outline-none focus:ring-4 focus:ring-navy/10"
      >
        {loading && isAuthenticated ? (
          <Loader2 className="h-4 w-4 animate-spin text-navy" />
        ) : (
          <Download className="h-4 w-4 text-navy/70" />
        )}
        {loading && isAuthenticated ? 'Opening...' : 'Download Brochure'}
      </button>

      {/* Unauthenticated Modal */}
      {isOpen && !isAuthenticated && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/40 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-navy font-heading">Get the Fluenciel Brochure</h2>
                <p className="text-sm text-navy/60 mt-1">Please enter your details to access the brochure.</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-navy/40 hover:text-navy/80 transition-colors p-1.5 rounded-full hover:bg-navy/5"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 rounded-xl border border-red-100">
                  {error}
                </div>
              )}
              
              <div>
                <label htmlFor="name" className="mb-1.5 block text-xs font-semibold text-navy/70 uppercase tracking-wider">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full rounded-xl border border-navy/10 bg-gray-50/50 px-4 py-2.5 text-sm text-navy transition-colors focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label htmlFor="dob" className="mb-1.5 block text-xs font-semibold text-navy/70 uppercase tracking-wider">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  id="dob"
                  name="dob"
                  type="date"
                  required
                  max={new Date().toISOString().split('T')[0]}
                  className="w-full rounded-xl border border-navy/10 bg-gray-50/50 px-4 py-2.5 text-sm text-navy transition-colors focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label htmlFor="courseId" className="mb-1.5 block text-xs font-semibold text-navy/70 uppercase tracking-wider">
                  Program Interested In <span className="text-red-500">*</span>
                </label>
                <select
                  id="courseId"
                  name="courseId"
                  required
                  className="w-full rounded-xl border border-navy/10 bg-gray-50/50 px-4 py-2.5 text-sm text-navy transition-colors focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                  <option value="">Select a program...</option>
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="email" className="mb-1.5 block text-xs font-semibold text-navy/70 uppercase tracking-wider">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-xl border border-navy/10 bg-gray-50/50 px-4 py-2.5 text-sm text-navy transition-colors focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label htmlFor="phone" className="mb-1.5 block text-xs font-semibold text-navy/70 uppercase tracking-wider">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  minLength={6}
                  className="w-full rounded-xl border border-navy/10 bg-gray-50/50 px-4 py-2.5 text-sm text-navy transition-colors focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-navy px-4 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-navy/90 focus:outline-none focus:ring-4 focus:ring-navy/20 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Opening brochure...
                    </>
                  ) : (
                    <>Submit & View Brochure</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
