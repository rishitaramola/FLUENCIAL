import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function seedCourses() {
  const courses = [
    {
      title: 'PR Track',
      slug: 'pr-track',
      level: 'A1-B2',
      short_description: 'TEF & TCF Preparation. A structured French pathway focused on preparation for TEF and TCF examinations and the language skills needed for practical communication.',
      description: 'For learners preparing for TEF or TCF.\n\nIncludes:\n- TEF preparation\n- TCF preparation\n- French foundation and progression\n- listening practice\n- reading practice\n- writing practice\n- speaking practice\n- exam-oriented practice\n- mock/practice sessions',
      duration: 'Flexible',
      mode: 'Online Live',
      batch_size: 5,
      fee: 29900,
      registration_fee: 1000,
      status: 'published',

    },
    {
      title: 'Excellence Track',
      slug: 'excellence-track',
      level: 'A1-C2',
      short_description: 'DELF & DALF Preparation. A structured pathway for learners preparing for DELF and DALF examinations.',
      description: 'For learners preparing for DELF or DALF.\n\nIncludes:\n- DELF preparation\n- DALF preparation\n- level-based progression\n- grammar and vocabulary\n- listening\n- reading\n- writing\n- speaking\n- exam-format practice\n- mock/practice sessions',
      duration: 'Flexible',
      mode: 'Online Live',
      batch_size: 5,
      fee: 34900,
      registration_fee: 1000,
      status: 'published',

    },
    {
      title: 'Sprint Track',
      slug: 'sprint-track',
      level: 'All Levels',
      short_description: 'Focused & Intensive French. A faster, focused learning pathway for learners who want concentrated French preparation.',
      description: 'For learners working toward a specific goal or timeline.\n\nIncludes:\n- rapid revision\n- speaking practice\n- targeted grammar\n- vocabulary building\n- intensive practice\n- interview/conversation preparation\n- goal-specific learning',
      duration: 'Intensive',
      mode: 'Online Live',
      batch_size: 5,
      fee: 19900,
      registration_fee: 1000,
      status: 'published',

    }
  ]

  for (const course of courses) {
    // Check if exists
    const { data: existing } = await supabase.from('courses').select('id').eq('slug', course.slug).maybeSingle()
    
    if (existing) {
      console.log(`Updating ${course.slug}...`)
      const { error } = await supabase.from('courses').update(course).eq('id', existing.id)
      if (error) console.error(error)
    } else {
      console.log(`Inserting ${course.slug}...`)
      const { error } = await supabase.from('courses').insert(course)
      if (error) console.error(error)
    }
  }

  console.log('Done.')
}

seedCourses().catch(console.error)
