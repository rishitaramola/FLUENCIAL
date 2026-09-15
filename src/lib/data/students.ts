import { createClient } from '@/lib/supabase/server'
import type { Tables, StudentStatus } from '@/lib/supabase/types'

export type StudentWithProfile = Tables<'students'> & {
  profile?: Tables<'profiles'> | null
  teacher?: (Tables<'teachers'> & { profile?: Tables<'profiles'> | null }) | null
}

export async function getAllStudents(): Promise<StudentWithProfile[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('students')
    .select(`
      *,
      profile:profiles!students_id_fkey(*),
      teacher:teachers!students_teacher_id_fkey(
        *,
        profile:profiles!teachers_id_fkey(*)
      )
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching students:', error.message)
    return []
  }
  return (data as unknown as StudentWithProfile[]) ?? []
}

export async function getStudentsByTeacher(teacherId: string): Promise<StudentWithProfile[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('students')
    .select(`
      *,
      profile:profiles!students_id_fkey(*)
    `)
    .eq('teacher_id', teacherId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error(`Error fetching students for teacher ${teacherId}:`, error.message)
    return []
  }
  return (data as unknown as StudentWithProfile[]) ?? []
}

export async function getStudentById(id: string): Promise<StudentWithProfile | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('students')
    .select(`
      *,
      profile:profiles!students_id_fkey(*),
      teacher:teachers!students_teacher_id_fkey(
        *,
        profile:profiles!teachers_id_fkey(*)
      )
    `)
    .eq('id', id)
    .single()

  if (error) {
    console.error(`Error fetching student ${id}:`, error.message)
    return null
  }
  return (data as unknown as StudentWithProfile) ?? null
}
