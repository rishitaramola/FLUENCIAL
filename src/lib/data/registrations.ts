import { createClient } from '@/lib/supabase/server'
import type { Tables, LeadStatus } from '@/lib/supabase/types'

export type RegistrationWithCourse = Tables<'leads'> & {
  course?: Tables<'courses'> | null
}

export type GetRegistrationsParams = {
  search?: string
  course_id?: string
  status?: string
  level?: string
  sort?: string
  page?: number
  limit?: number
}

export async function getRegistrations(params: GetRegistrationsParams) {
  const supabase = await createClient()
  const { search, course_id, status, level, sort = 'newest', page = 1, limit = 20 } = params

  let query = supabase
    .from('leads')
    .select('*, course:courses!leads_course_id_fkey(*)', { count: 'exact' })

  if (search) {
    query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`)
  }
  if (course_id) {
    query = query.eq('course_id', course_id)
  }
  if (status) {
    query = query.eq('status', status as LeadStatus)
  }
  if (level) {
    query = query.eq('current_level', level)
  }

  switch (sort) {
    case 'oldest':
      query = query.order('created_at', { ascending: true })
      break
    case 'name-asc':
      query = query.order('name', { ascending: true })
      break
    case 'name-desc':
      query = query.order('name', { ascending: false })
      break
    case 'newest':
    default:
      query = query.order('created_at', { ascending: false })
      break
  }

  const from = (page - 1) * limit
  const to = from + limit - 1
  query = query.range(from, to)

  const { data, count, error } = await query

  if (error) {
    console.error('Error fetching registrations:', error.message)
    return { data: [], count: 0 }
  }

  return { data: (data as unknown as RegistrationWithCourse[]) || [], count: count || 0 }
}

export async function getRegistrationById(id: string): Promise<RegistrationWithCourse | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('leads')
    .select('*, course:courses!leads_course_id_fkey(*)')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching registration:', error.message)
    return null
  }
  return data as unknown as RegistrationWithCourse
}
