'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { BrandMark } from '@/components/brand-mark'

const LINKS = [
  { href: '/courses', label: 'Courses' },
  { href: '/about', label: 'About' },
  { href: '/success-stories', label: 'Stories' },
  { href: '/fees', label: 'Fees' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
]

export function PublicNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Escape key support
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto max-w-6xl px-4 pt-4 sm:px-6">
        <div className="flex h-16 items-center justify-between rounded-full border border-white/70 bg-white/75 px-4 shadow-sm backdrop-blur-md sm:px-5">
          <BrandMark />

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
            {LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[13px] font-medium transition-colors hover:text-navy ${
                    isActive ? 'text-studio font-semibold' : 'text-navy/70'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden text-[13px] font-medium text-navy/70 hover:text-navy lg:block"
            >
              Sign In
            </Link>
            <Link
              href="/contact"
              className="hidden rounded-full bg-navy px-4 py-2 text-[13px] font-semibold text-white shadow-sm transition hover:bg-navy/90 sm:inline-flex"
            >
              Book a Free Demo
            </Link>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-navy/10 bg-white text-navy lg:hidden focus-ring"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">Toggle menu</span>
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu overlay */}
        {open && (
          <div className="fixed inset-0 z-40 bg-white/80 backdrop-blur-sm lg:hidden" onClick={() => setOpen(false)} aria-hidden="true" />
        )}
        
        {/* Mobile menu sliding panel */}
        <div
          id="mobile-nav"
          className={`fixed inset-x-4 top-24 z-50 overflow-hidden rounded-3xl border border-white/70 bg-white shadow-xl transition-all duration-300 ease-in-out lg:hidden ${
            open ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible pointer-events-none'
          }`}
        >
          <nav className="flex flex-col p-4" aria-label="Mobile">
            {LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-2xl px-4 py-3.5 text-[15px] font-medium ${
                    isActive ? 'bg-studio/10 text-studio' : 'text-navy hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
            <div className="my-2 h-px bg-slate-100" />
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="rounded-2xl px-4 py-3.5 text-[15px] font-medium text-navy hover:bg-slate-50"
            >
              Sign In
            </Link>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-navy px-4 py-3.5 text-center text-[15px] font-semibold text-white transition-colors hover:bg-navy/90"
            >
              Book a Free Demo
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
