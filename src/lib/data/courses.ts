import { createClient } from '@/lib/supabase/server'
import type { Tables, TablesInsert, TablesUpdate } from '@/lib/supabase/types'

export type Course = Tables<'courses'>
export type CourseInsert = TablesInsert<'courses'>
export type CourseUpdate = TablesUpdate<'courses'>

/**
 * Helper: run a course query with display_order ordering,
 * falling back to created_at if the column doesn't exist yet.
 */
async function queryCourses(
  buildQuery: (supabase: Awaited<ReturnType<typeof createClient>>) => ReturnType<Awaited<ReturnType<typeof createClient>>['from']>['select'],
): Promise<Course[]> {
  const supabase = await createClient()

  // Primary query — uses display_order (intended schema)
  const primary = buildQuery(supabase)
  const { data, error } = await (primary as any)
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false })

  if (!error) return data ?? []

  // If display_order column doesn't exist, fall back gracefully
  if (error.message?.includes('display_order')) {
    console.warn('courses.display_order column missing — using created_at fallback. Run migration 0007.')
    const fallback = buildQuery(supabase)
    const { data: fbData, error: fbError } = await (fallback as any)
      .order('created_at', { ascending: false })

    if (fbError) {
      console.error('Error fetching courses (fallback):', fbError.message)
      return []
    }
    return fbData ?? []
  }

  console.error('Error fetching courses:', error.message)
  return []
}

export async function getPublishedCourses(): Promise<Course[]> {
  return queryCourses((supabase) =>
    supabase.from('courses').select('*').eq('status', 'published'),
  )
}

export async function getFeaturedCourses(): Promise<Course[]> {
  return queryCourses((supabase) =>
    supabase
      .from('courses')
      .select('*')
      .eq('status', 'published')
      .eq('is_featured', true),
  )
}

export async function getAllCourses(): Promise<Course[]> {
  return queryCourses((supabase) =>
    supabase.from('courses').select('*'),
  )
}

export async function getCourseBySlug(slug: string): Promise<Course | null> {
  const supabase = await createClient()
  const { data, error } = await supabase.from('courses').select('*').eq('slug', slug).maybeSingle()

  if (error) {
    console.error(`Error fetching course ${slug}:`, error.message)
    return null
  }
  return data
}

export async function getCourseById(id: string): Promise<Course | null> {
  const supabase = await createClient()
  const { data, error } = await supabase.from('courses').select('*').eq('id', id).maybeSingle()

  if (error) {
    console.error(`Error fetching course ${id}:`, error.message)
    return null
  }
  return data
}

export async function createCourse(course: CourseInsert) {
  const supabase = await createClient()
  const { data, error } = await supabase.from('courses').insert(course).select().single()
  if (error) throw error
  return data
}

export async function updateCourse(id: string, patch: CourseUpdate) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('courses')
    .update({ ...patch, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteCourse(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('courses').delete().eq('id', id)
  if (error) throw error
}
