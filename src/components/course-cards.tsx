import { feeLabel } from '@/lib/format'
import type { Course } from '@/lib/data/courses'
import Link from 'next/link'
import { ArrowRight, Plane, Award, Zap } from 'lucide-react'

// Define the 3 premium visual variants based on the prompt
const VARIANTS = {
  TEF: {
    accent: 'bg-blue-50/80',
    border: 'border-blue-100/50',
    iconBg: 'bg-blue-100/80',
    iconColor: 'text-blue-600',
    Icon: Plane,
    defaultSubtitle: 'YOUR CANADA DREAM, OUR FOCUS',
  },
  DELF: {
    accent: 'bg-purple-50/80',
    border: 'border-purple-100/50',
    iconBg: 'bg-purple-100/80',
    iconColor: 'text-purple-600',
    Icon: Award,
    defaultSubtitle: 'CERTIFY YOUR FRENCH LEVEL',
  },
  SPRINT: {
    accent: 'bg-emerald-50/80',
    border: 'border-emerald-100/50',
    iconBg: 'bg-emerald-100/80',
    iconColor: 'text-emerald-600',
    Icon: Zap,
    defaultSubtitle: 'LEARN FRENCH, FASTER',
  },
  DEFAULT: {
    accent: 'bg-slate-50/80',
    border: 'border-slate-100/50',
    iconBg: 'bg-slate-100/80',
    iconColor: 'text-slate-600',
    Icon: Award,
    defaultSubtitle: 'ACHIEVE YOUR LANGUAGE GOALS',
  }
}

function getVariant(course: Course) {
  const title = (course.title || '').toUpperCase()
  const slug = (course.slug || '').toUpperCase()
  if (title.includes('TEF') || title.includes('TCF') || slug.includes('TEF') || slug.includes('TCF')) return VARIANTS.TEF
  if (title.includes('DELF') || title.includes('DALF') || slug.includes('DELF') || slug.includes('DALF')) return VARIANTS.DELF
  if (title.includes('SPRINT') || slug.includes('SPRINT')) return VARIANTS.SPRINT
  return VARIANTS.DEFAULT
}

export function CourseCards({ courses }: { courses: Course[] }) {
  if (courses.length === 0) {
    return (
      <div className="rounded-[2.5rem] border border-dashed border-navy/15 bg-white/70 px-6 py-20 text-center backdrop-blur-sm">
        <p className="font-semibold text-navy text-lg">Courses will appear here when they are published.</p>
        <p className="mt-2 text-base text-navy/60">
          Until then, you can still enquire about French learning and book a free demo.
        </p>
        <Link href="/contact" className="mt-8 inline-flex rounded-full bg-navy px-6 py-3 text-[15px] font-semibold text-white transition hover:bg-navy/90">
          Book a Free Demo
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => {
        const variant = getVariant(course)
        const Icon = variant.Icon

        return (
          <Link
            key={course.id}
            href={`/courses/${course.slug}`}
            className={`group relative flex flex-col overflow-hidden rounded-[2.5rem] border backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/5 ${variant.accent} ${variant.border}`}
          >
            {/* Soft decorative background shape */}
            <div className={`absolute -right-12 -top-12 h-40 w-40 rounded-full blur-3xl transition-opacity group-hover:opacity-100 opacity-60 ${variant.iconBg}`} />

            <div className="relative flex flex-1 flex-col p-8 sm:p-10">
              <div className="flex items-center justify-between mb-8">
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${variant.iconBg} shadow-sm`}>
                  <Icon className={`h-6 w-6 ${variant.iconColor}`} />
                </div>
                <span className="inline-flex rounded-full bg-white/80 px-3 py-1 text-[11px] font-bold tracking-wider text-navy shadow-sm">
                  {course.level}
                </span>
              </div>

              <h2 className="font-heading text-2xl font-bold tracking-tight text-navy">
                {course.title}
              </h2>
              
              <div className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-navy/40">
                {variant.defaultSubtitle}
              </div>

              <p className="mt-4 flex-1 text-sm leading-relaxed text-navy/65">
                {course.short_description || course.description?.substring(0, 100) + '...'}
              </p>

              <div className="mt-8 pt-6 border-t border-navy/5 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-navy/50">{course.mode}</span>
                  <span className="text-[15px] font-bold text-navy">{feeLabel(course.fee)}</span>
                </div>
                
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-navy shadow-sm transition-transform group-hover:scale-110">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
