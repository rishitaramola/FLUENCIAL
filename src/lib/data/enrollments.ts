import { createClient } from '@/lib/supabase/server'
import type { Tables } from '@/lib/supabase/types'

export type EnrollmentWithDetails = Tables<'enrollments'> & {
  student?: (Tables<'students'> & { profile?: Tables<'profiles'> | null }) | null
  course?: Tables<'courses'> | null
  batch?: Tables<'batches'> | null
}

export async function getAllEnrollments(): Promise<EnrollmentWithDetails[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('enrollments')
      .select(`
        *,
        student:students(
          *,
          profile:profiles(*)
        ),
        course:courses(*),
        batch:batches(*)
      `)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching enrollments:', error.message)
      return []
    }
    return (data as unknown as EnrollmentWithDetails[]) ?? []
  } catch {
    return []
  }
}

export async function getStudentEnrollments(studentId: string): Promise<EnrollmentWithDetails[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('enrollments')
      .select(`
        *,
        course:courses(*),
        batch:batches(*)
      `)
      .eq('student_id', studentId)

    if (error) {
      console.error(`Error fetching enrollments for student ${studentId}:`, error.message)
      return []
    }
    return (data as unknown as EnrollmentWithDetails[]) ?? []
  } catch {
    return []
  }
}
