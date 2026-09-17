import { createClient } from '@/lib/supabase/server'
import type { Tables, TablesInsert, TablesUpdate } from '@/lib/supabase/types'

export type SuccessStory = Tables<'success_stories'>

export async function getPublishedSuccessStories(): Promise<SuccessStory[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('success_stories')
      .select('*')
      .eq('is_published', true)
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false })

    if (error || !data) return []
    return data
  } catch {
    return []
  }
}

export async function getFeaturedSuccessStories(): Promise<SuccessStory[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('success_stories')
      .select('*')
      .eq('is_published', true)
      .eq('is_featured', true)
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false })

    if (error || !data) return []
    return data
  } catch {
    return []
  }
}

export async function getSuccessStories(): Promise<SuccessStory[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('success_stories')
      .select('*')
      .eq('is_published', true)
      .order('display_order', { ascending: true })

    if (error || !data) return []
    return data
  } catch {
    return []
  }
}

export async function getAllSuccessStories(): Promise<SuccessStory[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('success_stories')
    .select('*')
    .order('display_order', { ascending: true })
  if (error) return []
  return data ?? []
}

export async function createSuccessStory(story: TablesInsert<'success_stories'>) {
  const supabase = await createClient()
  const { data, error } = await supabase.from('success_stories').insert(story).select().single()
  if (error) throw error
  return data
}

export async function updateSuccessStory(id: string, patch: TablesUpdate<'success_stories'>) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('success_stories')
    .update({ ...patch, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteSuccessStory(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('success_stories').delete().eq('id', id)
  if (error) throw error
}
