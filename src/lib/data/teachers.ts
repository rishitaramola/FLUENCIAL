import { createClient } from '@/lib/supabase/server'
import type { Tables } from '@/lib/supabase/types'

export type TeacherWithProfile = Tables<'teachers'> & {
  profile?: Tables<'profiles'> | null
}

export async function getAllTeachers(): Promise<TeacherWithProfile[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('teachers')
    .select(`
      *,
      profile:profiles!teachers_id_fkey(*)
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching teachers:', error.message)
    return []
  }
  return (data as unknown as TeacherWithProfile[]) ?? []
}

export async function getTeacherById(id: string): Promise<TeacherWithProfile | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('teachers')
    .select(`
      *,
      profile:profiles!teachers_id_fkey(*)
    `)
    .eq('id', id)
    .single()

  if (error) {
    console.error(`Error fetching teacher ${id}:`, error.message)
    return null
  }
  return (data as unknown as TeacherWithProfile) ?? null
}
