'use client'

import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Download, X, Loader2 } from 'lucide-react'
import { downloadBrochureAction, sendBrochureOtpAction, verifyBrochureOtpAction } from '@/app/actions/brochure'
import type { Tables } from '@/lib/supabase/types'

type Course = Tables<'courses'>

type Step = 'FORM' | 'SENDING_OTP' | 'OTP_VERIFICATION' | 'VERIFYING_OTP'

export function BrochureDownloadButton({
  isAuthenticated,
  courses,
}: {
  isAuthenticated: boolean
  courses: Course[]
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState<Step>('FORM')
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  
  // OTP State
  const [otp, setOtp] = useState('')
  const [cooldown, setCooldown] = useState(0)
  
  const formDataRef = useRef<FormData | null>(null)

  const [mounted, setMounted] = useState(false)

  // Timer for cooldown and mounting
  useEffect(() => {
    setMounted(true)
    let timer: NodeJS.Timeout
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown((c) => c - 1), 1000)
    }
    return () => clearTimeout(timer)
  }, [cooldown])

  const handleOpen = async () => {
    if (isAuthenticated) {
      setStep('VERIFYING_OTP') // just a loading state for the button
      const res = await downloadBrochureAction()
      if (res.url) {
        window.open(res.url, '_blank')
      } else {
        alert(res.error || 'Failed to open brochure.')
      }
      setStep('FORM')
    } else {
      setStep('FORM')
      setIsOpen(true)
      setOtp('')
      setError('')
      setCooldown(0)
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    setTimeout(() => {
      setStep('FORM')
      setOtp('')
      setError('')
      setCooldown(0)
    }, 200)
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStep('SENDING_OTP')
    setError('')
    
    const formData = new FormData(e.currentTarget)
    formDataRef.current = formData
    
    const res = await sendBrochureOtpAction(formData)
    
    if (res.success) {
      setStep('OTP_VERIFICATION')
      setCooldown(60) // Start 60s cooldown
    } else {
      setError(res.error || 'Failed to send verification code.')
      setStep('FORM')
    }
  }

  const handleResendOtp = async () => {
    if (cooldown > 0 || !formDataRef.current) return
    setError('')
    setSuccessMsg('')
    setStep('SENDING_OTP')
    
    const res = await sendBrochureOtpAction(formDataRef.current)
    
    if (res.success) {
      setStep('OTP_VERIFICATION')
      setCooldown(60)
    } else {
      setError(res.error || 'Failed to resend verification code.')
      setStep('OTP_VERIFICATION')
    }
  }

  const handleOtpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!formDataRef.current || otp.length !== 6) return
    
    setStep('VERIFYING_OTP')
    setError('')
    setSuccessMsg('')
    
    const res = await verifyBrochureOtpAction(formDataRef.current, otp)
    
    if (res.url) {
      setSuccessMsg('Email verified. Opening brochure...')
      // Briefly show success message
      setTimeout(() => {
        setIsOpen(false)
        window.open(res.url, '_blank')
        setStep('FORM')
        setOtp('')
        setSuccessMsg('')
      }, 1500)
    } else {
      setError(res.error || 'Verification failed.')
      setStep('OTP_VERIFICATION')
    }
  }

  const modalContent = (
    <div className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center p-4 sm:p-6 bg-navy/40 backdrop-blur-sm transition-opacity overflow-y-auto">
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md flex flex-col my-8 sm:my-auto animate-in fade-in zoom-in-95 duration-200 shrink-0">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <div>
            <h2 className="text-lg font-bold text-navy font-heading">
              {step === 'FORM' || step === 'SENDING_OTP' ? 'Brochure Access' : 'Verify your email'}
            </h2>
            <p className="text-xs text-navy/60 mt-0.5">
              {step === 'FORM' || step === 'SENDING_OTP'
                ? 'Please enter your details to view the brochure.'
                : `We sent a 6-digit verification code to ${formDataRef.current?.get('email')?.toString() || 'your email'}`}
            </p>
          </div>
          <button 
            onClick={handleClose}
            className="text-navy/40 hover:text-navy/80 transition-colors p-1.5 rounded-full hover:bg-navy/5 shrink-0 ml-4"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {(step === 'FORM' || step === 'SENDING_OTP') ? (
          <form onSubmit={handleFormSubmit} className="p-5 space-y-3.5">
            {error && (
              <div className="p-2.5 text-xs text-red-600 bg-red-50 rounded-lg border border-red-100">
                {error}
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
                className="w-full rounded-xl border border-navy/10 bg-gray-50/50 px-3.5 py-2 text-sm text-navy transition-colors focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
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
                className="w-full rounded-xl border border-navy/10 bg-gray-50/50 px-3.5 py-2 text-sm text-navy transition-colors focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
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
                className="w-full rounded-xl border border-navy/10 bg-gray-50/50 px-3.5 py-2 text-sm text-navy transition-colors focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
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
                className="w-full rounded-xl border border-navy/10 bg-gray-50/50 px-3.5 py-2 text-sm text-navy transition-colors focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
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
                className="w-full rounded-xl border border-navy/10 bg-gray-50/50 px-3.5 py-2 text-sm text-navy transition-colors focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={step === 'SENDING_OTP'}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-navy px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-navy/90 focus:outline-none focus:ring-4 focus:ring-navy/20 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {step === 'SENDING_OTP' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending code...
                  </>
                ) : (
                  <>Continue</>
                )}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="p-5 space-y-5">
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
              <label htmlFor="otp" className="mb-2.5 block text-center text-sm font-medium text-navy/80">
                Enter 6-digit code
              </label>
              <input
                id="otp"
                name="otp"
                type="text"
                maxLength={6}
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                className="w-full rounded-xl border border-navy/10 bg-gray-50/50 px-4 py-3 text-center text-xl font-bold tracking-[0.5em] text-navy transition-colors focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                placeholder="------"
              />
            </div>

            <div className="space-y-3 pt-1">
              <button
                type="submit"
                disabled={step === 'VERIFYING_OTP' || otp.length !== 6 || !!successMsg}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-navy px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-navy/90 focus:outline-none focus:ring-4 focus:ring-navy/20 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {step === 'VERIFYING_OTP' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>Verify & Open Brochure</>
                )}
              </button>
              
              <div className="text-center text-xs">
                {cooldown > 0 ? (
                  <span className="text-navy/50">Resend available in {cooldown}s</span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={step === 'VERIFYING_OTP' || !!successMsg}
                    className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
                  >
                    Didn't receive the code? Resend OTP
                  </button>
                )}
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  )

  return (
    <>
      <button
        onClick={handleOpen}
        disabled={step === 'VERIFYING_OTP' && isAuthenticated}
        className="inline-flex items-center justify-center gap-2 rounded-full border border-navy/20 bg-white/80 px-6 py-3.5 text-sm font-semibold text-navy shadow-sm transition hover:bg-white focus:outline-none focus:ring-4 focus:ring-navy/10"
      >
        {step === 'VERIFYING_OTP' && isAuthenticated ? (
          <Loader2 className="h-4 w-4 animate-spin text-navy" />
        ) : (
          <Download className="h-4 w-4 text-navy/70" />
        )}
        {step === 'VERIFYING_OTP' && isAuthenticated ? 'Opening...' : 'Download Brochure'}
      </button>

      {/* Unauthenticated Modal using React Portal */}
      {isOpen && !isAuthenticated && mounted && typeof document !== 'undefined'
        ? createPortal(modalContent, document.body)
        : null}
    </>
  )
}
