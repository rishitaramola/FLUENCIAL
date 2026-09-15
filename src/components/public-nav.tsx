import Link from 'next/link'
import { Globe, ArrowRight } from 'lucide-react'

export function PublicNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform">
            <Globe className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-gray-900 leading-none">
              Fluenciel
            </span>
            <span className="text-[10px] font-semibold tracking-widest text-indigo-600 uppercase mt-0.5">
              Language Studio
            </span>
          </div>
        </Link>

        {/* Links */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/courses" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">
            Courses & CEFR
          </Link>
          <Link href="/#methodology" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">
            Methodology
          </Link>
          <Link href="/contact" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">
            Contact & Location
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-xl px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/courses"
            className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
          >
            Explore Programs <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </header>
  )
}
