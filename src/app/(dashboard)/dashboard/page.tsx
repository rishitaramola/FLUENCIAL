import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

/**
 * /dashboard — role-based router.
 * The middleware already guarantees the user is authenticated; we simply
 * read their role from the DB and redirect to the appropriate sub-dashboard.
 */
export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  switch (profile?.role) {
    case 'ADMIN':
      redirect('/dashboard/admin')
    case 'TEACHER':
      redirect('/dashboard/teacher')
    default:
      redirect('/dashboard/student')
  }
}
