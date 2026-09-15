import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { logout } from '@/app/(auth)/actions'
import type { AppRole } from '@/lib/supabase/types'

// ─── Nav links per role ───────────────────────────────────────────────────────

const NAV: Record<AppRole, { href: string; label: string }[]> = {
  ADMIN: [
    { href: '/dashboard/admin', label: 'Overview' },
    { href: '/dashboard/admin/courses', label: 'Courses' },
    { href: '/dashboard/admin/students', label: 'Students' },
    { href: '/dashboard/admin/leads', label: 'Leads' },
    { href: '/dashboard/admin/teachers', label: 'Teachers' },
    { href: '/dashboard/admin/payments', label: 'Payments' },
  ],
  TEACHER: [
    { href: '/dashboard/teacher', label: 'Overview' },
    { href: '/dashboard/teacher/students', label: 'My Students' },
    { href: '/dashboard/teacher/schedule', label: 'Schedule' },
  ],
  STUDENT: [
    { href: '/dashboard/student', label: 'Overview' },
    { href: '/dashboard/student/courses', label: 'My Courses' },
    { href: '/dashboard/student/progress', label: 'Progress' },
    { href: '/dashboard/student/payments', label: 'Payments' },
  ],
}

// ─── Layout ───────────────────────────────────────────────────────────────────

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, role')
    .eq('id', user.id)
    .single()

  const role: AppRole = profile?.role ?? 'STUDENT'
  const displayName = profile?.full_name ?? user.email ?? 'User'
  const navLinks = NAV[role]

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* ── Top navigation bar ── */}
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand */}
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="text-xl font-bold text-indigo-600">Fluenciel</span>
            <span className="hidden rounded bg-indigo-50 px-1.5 py-0.5 text-xs font-medium text-indigo-700 sm:inline">
              {role}
            </span>
          </Link>

          {/* Nav links */}
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* User / logout */}
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-gray-600 sm:block">{displayName}</span>
            <form action={logout}>
              <button
                type="submit"
                className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* ── Page content ── */}
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</div>
      </main>

      <footer className="border-t border-gray-200 bg-white py-4 text-center text-xs text-gray-400">
        &copy; {new Date().getFullYear()} Fluenciel Language Studio
      </footer>
    </div>
  )
}
