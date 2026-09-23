import Link from 'next/link'
import { BrandMark } from '@/components/brand-mark'
import { getSiteSettings, socialLinks } from '@/lib/data/site'

export async function PublicFooter() {
  const settings = await getSiteSettings()
  const socials = socialLinks(settings)

  return (
    <footer className="mt-8 border-t border-navy/8 bg-white/50">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="space-y-4">
            <BrandMark />
            <p className="max-w-xs text-sm leading-relaxed text-navy/60 font-semibold">
              Learn French. Build Confidence. Achieve Your Goal.
            </p>
            <p className="max-w-xs text-sm leading-relaxed text-navy/60">
              {settings.tagline ||
                'A French language studio for students and professionals who want structured, supportive learning.'}
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-navy">Company</h2>
            <ul className="mt-3 space-y-2 text-sm text-navy/65">
              <li><Link href="/about" className="hover:text-navy">About Fluenciel</Link></li>
              <li><Link href="/courses" className="hover:text-navy">Courses</Link></li>
              <li><Link href="/success-stories" className="hover:text-navy">Success Stories</Link></li>
              <li><Link href="/faq" className="hover:text-navy">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-navy">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-navy">Policies</h2>
            <ul className="mt-3 space-y-2 text-sm text-navy/65">
              <li><Link href="/terms" className="hover:text-navy">Terms & Conditions</Link></li>
              <li><Link href="/privacy" className="hover:text-navy">Privacy Policy</Link></li>
              <li><Link href="/refund-policy" className="hover:text-navy">Refund & Cancellation Policy</Link></li>
            </ul>
            {socials.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-3 text-sm text-navy/65">
                {socials.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} className="hover:text-navy" rel="noreferrer" target="_blank">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          <div>
            <h2 className="text-sm font-semibold text-navy">Studio</h2>
            <ul className="mt-3 space-y-2 text-sm text-navy/65">
              <li><Link href="/login" className="hover:text-navy">Student / staff login</Link></li>
            </ul>
          </div>
        </div>

        <p className="mt-12 text-center text-xs text-navy/40">
          © {new Date().getFullYear()} {settings.academy_name}. French language education.
        </p>
      </div>
    </footer>
  )
}
