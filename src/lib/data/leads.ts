import { createClient } from '@/lib/supabase/server'
import type { Tables, TablesInsert, LeadStatus } from '@/lib/supabase/types'

export type LeadWithCourse = Tables<'leads'> & {
  course?: Tables<'courses'> | null
}

export async function getAllLeads(): Promise<LeadWithCourse[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('leads')
    .select(`
      *,
      course:courses!leads_course_id_fkey(*)
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching leads:', error.message)
    return []
  }
  return (data as unknown as LeadWithCourse[]) ?? []
}

export async function createLead(lead: TablesInsert<'leads'>) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('leads')
    .insert(lead)
    .select()
    .single()

  if (error) {
    console.error('Error creating lead:', error.message)
    throw error
  }
  return data
}

export async function updateLeadStatus(id: string, status: LeadStatus) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('leads')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error(`Error updating lead ${id}:`, error.message)
    throw error
  }
  return data
}
