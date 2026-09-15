import { createClient } from '@/lib/supabase/server'
import type { Tables } from '@/lib/supabase/types'

export type AttendanceRecord = Tables<'attendance'> & {
  student?: (Tables<'students'> & { profile?: Tables<'profiles'> | null }) | null
  batch?: Tables<'batches'> | null
}

export async function getAttendanceByBatch(batchId: string): Promise<AttendanceRecord[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('attendance')
      .select(`
        *,
        student:students(
          *,
          profile:profiles(*)
        )
      `)
      .eq('batch_id', batchId)
      .order('date', { ascending: false })

    if (error) {
      console.error(`Error fetching attendance for batch ${batchId}:`, error.message)
      return []
    }
    return (data as unknown as AttendanceRecord[]) ?? []
  } catch {
    return []
  }
}
