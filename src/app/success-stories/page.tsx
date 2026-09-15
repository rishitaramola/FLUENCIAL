import type { Metadata } from 'next'
import { PublicNav } from '@/components/public-nav'
import { PublicFooter } from '@/components/public-footer'
import { getSuccessStories } from '@/lib/data/testimonials'
import { SuccessStoriesSection } from '@/components/success-stories-section'

export const metadata: Metadata = {
  title: 'Student Success Stories & DELF Results | Fluenciel Studio',
  description: 'Read and watch genuine student testimonials, DELF/GOETHE exam scores, and university admissions success stories.',
}

export default async function SuccessStoriesPage() {
  const stories = await getSuccessStories()

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PublicNav />

      {/* Header Banner */}
      <section className="bg-gray-50 border-b border-gray-100 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
            Learner Achievements
          </span>
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Success Stories & Video Testimonials
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl">
            Hear directly from our students who passed their DELF, DALF, and TEF examinations and secured university admissions in France and Europe.
          </p>
        </div>
      </section>

      {/* Testimonials List */}
      <section className="py-16 flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SuccessStoriesSection stories={stories} />
        </div>
      </section>

      <PublicFooter />
    </div>
  )
}
