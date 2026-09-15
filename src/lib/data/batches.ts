import { createClient } from '@/lib/supabase/server'
import type { Tables } from '@/lib/supabase/types'

export type BatchWithDetails = Tables<'batches'> & {
  course?: Tables<'courses'> | null
  teacher?: (Tables<'teachers'> & { profile?: Tables<'profiles'> | null }) | null
}

export async function getAllBatches(): Promise<BatchWithDetails[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('batches')
      .select(`
        *,
        course:courses(*),
        teacher:teachers(
          *,
          profile:profiles(*)
        )
      `)
      .order('start_date', { ascending: true })

    if (error) {
      console.error('Error fetching batches:', error.message)
      return []
    }
    return (data as unknown as BatchWithDetails[]) ?? []
  } catch {
    return []
  }
}

export async function getUpcomingBatches(): Promise<BatchWithDetails[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('batches')
      .select(`
        *,
        course:courses(*),
        teacher:teachers(
          *,
          profile:profiles(*)
        )
      `)
      .eq('status', 'UPCOMING')
      .order('start_date', { ascending: true })

    if (error) {
      console.error('Error fetching upcoming batches:', error.message)
      return []
    }
    return (data as unknown as BatchWithDetails[]) ?? []
  } catch {
    return []
  }
}
