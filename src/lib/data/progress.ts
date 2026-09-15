import { createClient } from '@/lib/supabase/server'
import type { Tables } from '@/lib/supabase/types'

export type ProgressEvaluation = Tables<'progress'> & {
  course?: Tables<'courses'> | null
  evaluator?: (Tables<'teachers'> & { profile?: Tables<'profiles'> | null }) | null
}

export async function getStudentProgress(studentId: string): Promise<ProgressEvaluation | null> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('progress')
      .select(`
        *,
        course:courses(*),
        evaluator:teachers(
          *,
          profile:profiles(*)
        )
      `)
      .eq('student_id', studentId)
      .order('evaluated_at', { ascending: false })
      .limit(1)
      .single()

    if (error) {
      return null
    }
    return (data as unknown as ProgressEvaluation) ?? null
  } catch {
    return null
  }
}
