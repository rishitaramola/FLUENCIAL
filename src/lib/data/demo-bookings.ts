import { createClient } from '@/lib/supabase/server'
import type { Tables, TablesInsert } from '@/lib/supabase/types'

export type DemoBooking = Tables<'demo_bookings'>

export async function getAllDemoBookings(): Promise<DemoBooking[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('demo_bookings')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching demo bookings:', error.message)
      return []
    }
    return data ?? []
  } catch {
    return []
  }
}

export async function createDemoBooking(booking: TablesInsert<'demo_bookings'>) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('demo_bookings')
    .insert(booking)
    .select()
    .single()

  if (error) {
    console.error('Error creating demo booking:', error.message)
    throw error
  }
  return data
}
