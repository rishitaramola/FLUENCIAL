import { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { PublicShell } from '@/components/public-shell'
import { siteConfig } from '@/lib/config/site'

interface LegalLayoutProps {
  title: string
  children: ReactNode
}

export function LegalLayout({ title, children }: LegalLayoutProps) {
  return (
    <PublicShell>
      <section className="pt-24 pb-24 relative">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 relative z-10">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-navy/60 hover:text-navy mb-8 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Home
          </Link>
          <div className="rounded-[2.5rem] border border-white/40 bg-white/80 p-8 shadow-sm backdrop-blur-md sm:p-12 space-y-12">
            <header className="border-b border-navy/10 pb-8">
              <h1 className="font-heading text-3xl font-bold text-navy sm:text-4xl mb-4">
                {title}
              </h1>
              <div className="flex flex-col sm:flex-row gap-2 text-sm text-navy/60">
                <span>Effective Date: {siteConfig.legal.effectiveDate}</span>
                <span className="hidden sm:inline">•</span>
                <span>Last Updated: {siteConfig.legal.lastUpdated}</span>
              </div>
            </header>
            
            <div className="legal-content space-y-8 text-navy/70 leading-relaxed text-[15px]">
              {children}
            </div>
          </div>
        </div>
      </section>
    </PublicShell>
  )
}
