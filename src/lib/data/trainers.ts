import { createClient } from '@/lib/supabase/server'
import type { Tables } from '@/lib/supabase/types'

export type Trainer = Tables<'trainers'>

const FALLBACK_TRAINERS: Partial<Trainer>[] = [
  {
    id: '1',
    name: 'Prof. Laurent Mercier',
    role: 'Head of French Pedagogy & DELF Examiner',
    bio: 'Native French speaker with 14+ years of academic experience preparing Indian students for DELF B1/B2 and Campus France interviews.',
    qualifications: 'MA in FLE (Français Langue Étrangère), Université de la Sorbonne',
    specialization: 'DELF B1/B2, DALF C1, Oral Fluency Labs',
    languages: 'French (Native), English',
    is_featured: true,
  },
  {
    id: '2',
    name: 'Dr. Sophie Dubois',
    role: 'Senior Academic Counselor & TEF Specialist',
    bio: 'Specialist in TEF Canada & TCF Tout Public preparation for Canada PR and university admissions.',
    qualifications: 'Ph.D. in Applied Linguistics, Alliance Française Certified',
    specialization: 'TEF Canada, Expression Écrite & Audio Diagnostics',
    languages: 'French (Native), English, German',
    is_featured: true,
  },
]

export async function getPublishedTrainers(): Promise<Trainer[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('trainers')
      .select('*')
      .eq('is_published', true)
      .order('display_order', { ascending: true })

    if (error || !data || data.length === 0) {
      return FALLBACK_TRAINERS as Trainer[]
    }
    return data as Trainer[]
  } catch {
    return FALLBACK_TRAINERS as Trainer[]
  }
}
