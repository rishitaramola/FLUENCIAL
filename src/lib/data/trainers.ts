import { createClient } from '@/lib/supabase/server'
import type { Tables } from '@/lib/supabase/types'

export type Trainer = Tables<'trainers'>

export async function getPublishedTrainers(): Promise<Trainer[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('trainers')
      .select('*')
      .eq('is_published', true)
      .order('display_order', { ascending: true })

    if (error || !data) return []
    return data
  } catch {
    return []
  }
}
