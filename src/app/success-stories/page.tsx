import type { Metadata } from 'next'
import { PublicShell } from '@/components/public-shell'
import { getPublishedSuccessStories } from '@/lib/data/testimonials'
import { StoryCarousel } from '@/components/story-carousel'

export const metadata: Metadata = {
  title: 'Student Success Stories & DELF Results | Fluenciel Studio',
  description: 'Read and watch genuine student testimonials, DELF/GOETHE exam scores, and university admissions success stories.',
}

export default async function SuccessStoriesPage() {
  const stories = await getPublishedSuccessStories()

  return (
    <PublicShell>
      {/* Header Banner */}
      <section className="bg-white/80 backdrop-blur-sm border-b border-gray-200 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
            Learner Achievements
          </span>
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Success Stories & Video Testimonials
          </h1>
          <p className="mx-auto text-sm sm:text-base text-gray-600 max-w-2xl">
            Hear directly from our students who passed their DELF, DALF, and TEF examinations and secured university admissions in France and Europe.
          </p>
        </div>
      </section>

      {/* Testimonials List */}
      <section className="py-16 flex-1 overflow-hidden">
        <div className="mx-auto max-w-[1400px]">
          {stories.length > 0 ? (
            <StoryCarousel stories={stories} />
          ) : (
            <div className="mx-auto max-w-3xl rounded-[2rem] border border-dashed border-navy/15 bg-white/60 px-6 py-16 text-center">
              <p className="text-lg font-semibold text-navy">Student stories coming soon.</p>
              <p className="mt-2 text-sm text-navy/60">
                Published testimonials will appear here. We do not display placeholder reviews.
              </p>
            </div>
          )}
        </div>
      </section>
    </PublicShell>
  )
}
