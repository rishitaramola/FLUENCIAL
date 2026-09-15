import { createClient } from '@/lib/supabase/server'

export interface SuccessStory {
  id: string
  student_name: string
  course_name: string
  score_achievement: string
  testimonial_text: string
  video_url?: string | null
  avatar_url?: string | null
  is_featured: boolean | null
  display_order: number | null
}

const FALLBACK_STORIES: SuccessStory[] = [
  {
    id: '1',
    student_name: 'Ananya Roy',
    course_name: 'French B1 Diploma',
    score_achievement: 'DELF B1 Score: 88.5/100',
    testimonial_text: 'The live speaking labs and 1-on-1 mock tests gave me total confidence for the DELF examination in New Delhi!',
    video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    is_featured: true,
    display_order: 1,
  },
  {
    id: '2',
    student_name: 'Siddharth Mehta',
    course_name: 'German A2 FastTrack',
    score_achievement: 'Goethe A2 Score: 92/100',
    testimonial_text: 'Small batch sizes meant I spoke German in every single class. Highly recommended for study abroad aspirants.',
    video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    is_featured: true,
    display_order: 2,
  },
]

export async function getSuccessStories(): Promise<SuccessStory[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('success_stories')
      .select('*')
      .order('display_order', { ascending: true })

    if (error || !data || data.length === 0) {
      return FALLBACK_STORIES
    }
    return data as SuccessStory[]
  } catch {
    return FALLBACK_STORIES
  }
}
