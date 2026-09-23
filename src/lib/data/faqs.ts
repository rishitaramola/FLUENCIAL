import { createClient } from '@/lib/supabase/server'
import type { Tables, TablesInsert, TablesUpdate } from '@/lib/supabase/types'

export type FAQItem = Tables<'faqs'>

const HONEST_FAQS: FAQItem[] = [
  {
    id: 'local-1',
    question: 'What does Fluenciel currently offer?',
    answer:
      'Fluenciel Language Studio focuses on French language education. Published courses and levels appear on the Courses page. Anything marked Coming Soon is not yet open for enrolment.',
    category: 'General',
    display_order: 1,
    is_published: true,
    created_at: new Date(0).toISOString(),
    updated_at: new Date(0).toISOString(),
  },
  {
    id: 'local-2',
    question: 'How do I book a demo?',
    answer:
      'Use the enquiry form on the Contact page. Share your current French level, goal, and preferred timing so the academy can reply with current options.',
    category: 'Classes',
    display_order: 2,
    is_published: true,
    created_at: new Date(0).toISOString(),
    updated_at: new Date(0).toISOString(),
  },
  {
    id: 'local-3',
    question: 'Where are the fees listed?',
    answer:
      'Fees appear on the Fees page and on each published course only when they have been set. If a fee is missing, contact Fluenciel for current details.',
    category: 'Fees',
    display_order: 3,
    is_published: true,
    created_at: new Date(0).toISOString(),
    updated_at: new Date(0).toISOString(),
  },
]

export async function getPublishedFaqs(): Promise<FAQItem[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .eq('is_published', true)
      .order('display_order', { ascending: true })

    if (error || !data) return HONEST_FAQS
    return data
  } catch {
    return HONEST_FAQS
  }
}

export async function getAllFaqs(): Promise<FAQItem[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase.from('faqs').select('*').order('display_order', { ascending: true })
    if (error || !data) return []
    return data
  } catch {
    return []
  }
}

