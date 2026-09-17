import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { AppRole } from '@/lib/supabase/types'

export function safeInternalPath(path: string | null | undefined, fallback = '/dashboard') {
  if (!path) return fallback
  if (!path.startsWith('/')) return fallback
  if (path.startsWith('//')) return fallback
  if (path.includes('\\')) return fallback
  return path
}

export async function getSessionUser() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return { supabase, user }
}

export async function getProfileRole(userId: string): Promise<AppRole> {
  const supabase = await createClient()
  const { data } = await supabase.from('profiles').select('role').eq('id', userId).maybeSingle()
  return data?.role ?? 'STUDENT'
}

export async function requireRole(allowed: AppRole[]) {
  const { supabase, user } = await getSessionUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, full_name')
    .eq('id', user.id)
    .maybeSingle()

  const role: AppRole = profile?.role ?? 'STUDENT'
  if (!allowed.includes(role)) {
    redirect('/dashboard')
  }

  return { supabase, user, role, profile }
}
