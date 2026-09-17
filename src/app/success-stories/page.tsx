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
      <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 relative z-10 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white/60 px-4 py-1.5 backdrop-blur-md">
            <span className="text-[11px] font-bold uppercase tracking-widest text-navy/70">
              Learner Achievements
            </span>
          </div>
          
          <h1 className="font-heading text-4xl font-bold tracking-tight text-navy sm:text-5xl lg:text-6xl mx-auto max-w-4xl">
            Success Stories & Testimonials
          </h1>
          
          <p className="mt-6 text-lg leading-relaxed text-navy/65 sm:text-xl mx-auto max-w-2xl">
            Hear directly from our students who passed their DELF, DALF, and TEF examinations and secured university admissions in France and Europe.
          </p>
        </div>
      </section>

      {/* Testimonials List */}
      <section className="pb-24 overflow-hidden">
        <div className="mx-auto max-w-[1400px]">
          {stories.length > 0 ? (
            <StoryCarousel stories={stories} />
          ) : (
            <div className="mx-auto max-w-3xl rounded-[2rem] border border-dashed border-navy/15 bg-white/60 px-6 py-16 text-center">
              <p className="font-heading text-xl font-bold text-navy">Student stories coming soon.</p>
              <p className="mt-2 text-[14px] text-navy/60">
                Published testimonials will appear here. We do not display placeholder reviews.
              </p>
            </div>
          )}
        </div>
      </section>
    </PublicShell>
  )
}
