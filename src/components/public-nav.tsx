'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { BrandMark } from '@/components/brand-mark'

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/french', label: 'French' },
  { href: '/courses', label: 'Courses' },
  { href: '/fees', label: 'Fees' },
  { href: '/success-stories', label: 'Stories' },
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
]

export function PublicNav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto max-w-6xl px-4 pt-4 sm:px-6">
        <div className="flex h-16 items-center justify-between rounded-full border border-white/70 bg-white/75 px-4 shadow-sm backdrop-blur-md sm:px-5">
          <BrandMark />

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[13px] font-medium text-navy/70 transition-colors hover:text-navy"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className="hidden rounded-full bg-navy px-4 py-2 text-[13px] font-semibold text-white shadow-sm transition hover:bg-navy/90 sm:inline-flex"
            >
              Book a Free Demo
            </Link>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-navy/10 bg-white text-navy lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">Toggle menu</span>
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div
            id="mobile-nav"
            className="mt-2 overflow-hidden rounded-3xl border border-white/70 bg-white/95 p-4 shadow-lg backdrop-blur lg:hidden"
          >
            <nav className="flex flex-col gap-1" aria-label="Mobile">
              {LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-3 py-2.5 text-sm font-medium text-navy hover:bg-ivory"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-full bg-navy px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Book a Free Demo
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
