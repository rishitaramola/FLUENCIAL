import Link from 'next/link'
import { Globe, Phone, Mail, MapPin, MessageCircle } from 'lucide-react'

export function PublicFooter() {
  return (
    <footer className="border-t border-gray-200 bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
                <Globe className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold text-white">Fluenciel</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Premiere French & European language studio. CEFR aligned training, DELF/GOETHE exam prep, and live speaking labs.
            </p>
          </div>

          {/* Programs */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white">Programs & Pathways</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><Link href="/courses" className="hover:text-white transition-colors">Study in France Pathway</Link></li>
              <li><Link href="/courses" className="hover:text-white transition-colors">DELF / TEF Exam Preparation</Link></li>
              <li><Link href="/courses" className="hover:text-white transition-colors">Professional Business French</Link></li>
              <li><Link href="/courses" className="hover:text-white transition-colors">Conversational Speaking Labs</Link></li>
            </ul>
          </div>

          {/* Quick Links & Legal */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white">Company & Legal</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><Link href="/about" className="hover:text-white transition-colors">About & Pedagogy</Link></li>
              <li><Link href="/fees" className="hover:text-white transition-colors">Fees & Installments</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/refund-policy" className="hover:text-white transition-colors">Refund & Cancellation</Link></li>
            </ul>
          </div>

          {/* WhatsApp Direct */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white">Direct Connect</h4>
            <p className="text-xs text-gray-400">Speak directly with an academic counselor on WhatsApp.</p>
            <a
              href="https://wa.me/919876543210?text=Hi!%20I%20am%20interested%20in%20learning%20more%20about%20Fluenciel%20language%20courses."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-emerald-500 transition-colors shadow-xs"
            >
              <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Fluenciel Language Studio. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
