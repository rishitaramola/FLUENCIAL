'use server'

import { createClient } from '@/lib/supabase/server'
import type { TablesInsert, TablesUpdate } from '@/lib/supabase/types'
import { revalidatePath } from 'next/cache'

export async function createFaq(faq: TablesInsert<'faqs'>) {
  const supabase = await createClient()
  const { data, error } = await supabase.from('faqs').insert(faq).select().single()
  if (error) throw new Error(error.message)
  revalidatePath('/dashboard/admin/faqs')
  revalidatePath('/faq')
  return data
}

export async function updateFaq(id: string, patch: TablesUpdate<'faqs'>) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('faqs')
    .update({ ...patch, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()
  if (error) throw new Error(error.message)
  revalidatePath('/dashboard/admin/faqs')
  revalidatePath('/faq')
  return data
}

export async function deleteFaq(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('faqs').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/dashboard/admin/faqs')
  revalidatePath('/faq')
}
