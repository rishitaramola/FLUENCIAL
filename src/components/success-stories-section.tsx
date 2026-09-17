import { embedVideoUrl } from '@/lib/format'
import type { SuccessStory } from '@/lib/data/testimonials'

export function SuccessStoriesSection({ stories }: { stories: SuccessStory[] }) {
  if (stories.length === 0) {
    return (
      <div className="rounded-[2rem] border border-dashed border-navy/15 bg-white/60 px-6 py-16 text-center">
        <p className="text-lg font-semibold text-navy">Student stories coming soon.</p>
        <p className="mt-2 text-sm text-navy/60">
          Published testimonials will appear here. We do not display placeholder reviews.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {stories.map((story) => {
        const embed = embedVideoUrl(story.video_url)
        return (
          <article key={story.id} className="rounded-[2rem] border border-white bg-white/80 p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-navy/40">
              {story.course_name}
              {story.level ? ` · ${story.level}` : ''}
            </p>
            <h3 className="mt-2 text-lg font-semibold text-navy">{story.student_name}</h3>
            {story.score_achievement && (
              <p className="mt-1 text-sm text-navy/55">{story.score_achievement}</p>
            )}
            <p className="mt-4 text-sm leading-relaxed text-navy/70">{story.testimonial_text}</p>
            {embed && (
              <div className="mt-4 aspect-video overflow-hidden rounded-2xl bg-navy/5">
                <iframe
                  src={embed}
                  title={`${story.student_name} story`}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
          </article>
        )
      })}
    </div>
  )
}
