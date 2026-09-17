'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

interface BackButtonProps {
  label?: string
  fallbackUrl?: string
  className?: string
}

export function BackButton({ 
  label = 'Back', 
  fallbackUrl = '/',
  className = '' 
}: BackButtonProps) {
  const router = useRouter()

  const handleBack = () => {
    if (window.history.length > 2) {
      router.back()
    } else {
      router.push(fallbackUrl)
    }
  }

  return (
    <button
      onClick={handleBack}
      className={`group inline-flex items-center gap-2 text-[13px] font-semibold tracking-wider uppercase text-navy/50 transition-colors hover:text-navy focus:outline-none rounded-full px-2 py-1 -ml-2 ${className}`}
      aria-label="Go back"
    >
      <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
      {label}
    </button>
  )
}
