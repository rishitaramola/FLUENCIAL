import { createClient } from '@/lib/supabase/server'
import type { Tables } from '@/lib/supabase/types'

export type SiteSettings = Tables<'site_settings'>

export const DEFAULT_SITE: SiteSettings = {
  id: 1,
  academy_name: 'Fluenciel Language Studio',
  short_name: 'Fluenciel',
  tagline: 'Structured French learning for communication, study, work, and travel.',
  email: null,
  phone: null,
  whatsapp: null,
  address: null,
  working_hours: null,
  instagram_url: null,
  facebook_url: null,
  youtube_url: null,
  linkedin_url: null,
  about_story: null,
  mission: null,
  philosophy: null,
  methodology: null,
  learning_environment: null,
  future_vision: null,
  announcement: null,
  created_at: '',
  updated_at: '',
}

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase.from('site_settings').select('*').eq('id', 1).maybeSingle()
    if (error || !data) return DEFAULT_SITE
    return data
  } catch {
    return DEFAULT_SITE
  }
}

export function socialLinks(settings: SiteSettings) {
  return [
    { label: 'Instagram', href: settings.instagram_url },
    { label: 'Facebook', href: settings.facebook_url },
    { label: 'YouTube', href: settings.youtube_url },
    { label: 'LinkedIn', href: settings.linkedin_url },
  ].filter((item): item is { label: string; href: string } => Boolean(item.href))
}
