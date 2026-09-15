import { createClient } from '@/lib/supabase/server'

export interface FAQItem {
  id: string
  question: string
  answer: string
  category: string | null
  display_order: number | null
}

const FALLBACK_FAQS: FAQItem[] = [
  {
    id: '1',
    question: 'What language levels do you teach?',
    answer: 'We offer complete CEFR-aligned training for French and German from absolute beginner (A1) to advanced proficiency (C1/C2).',
    category: 'Courses',
    display_order: 1,
  },
  {
    id: '2',
    question: 'Are the DELF / GOETHE certificates globally recognized?',
    answer: 'Yes! DELF/DALF (French Ministry of Education) and Goethe-Zertifikat (Germany) are official, lifelong diplomas recognized by universities, employers, and immigration authorities worldwide.',
    category: 'Certifications',
    display_order: 2,
  },
  {
    id: '3',
    question: 'How large are the class batches?',
    answer: 'To guarantee maximum oral speaking practice, our live batches are strictly capped at 8 to 10 students.',
    category: 'Classes',
    display_order: 3,
  },
  {
    id: '4',
    question: 'Can I pay in installments?',
    answer: 'Yes, installment payment options are available for B1 and B2 diploma programs. Contact admissions for customized payment plans.',
    category: 'Payments',
    display_order: 4,
  },
]

export async function getAllFaqs(): Promise<FAQItem[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .order('display_order', { ascending: true })

    if (error || !data || data.length === 0) {
      return FALLBACK_FAQS
    }
    return data as FAQItem[]
  } catch {
    return FALLBACK_FAQS
  }
}
