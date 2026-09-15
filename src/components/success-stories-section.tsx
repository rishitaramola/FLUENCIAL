import type { SuccessStory } from '@/lib/data/testimonials'
import { Star, Award, Video, Quote } from 'lucide-react'

interface Props {
  stories: SuccessStory[]
}

export function SuccessStoriesSection({ stories }: Props) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {stories.map((story) => (
        <div
          key={story.id}
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-4 flex flex-col justify-between"
        >
          <div className="space-y-3">
            {/* Rating & Score Badge */}
            <div className="flex items-center justify-between">
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400" />
                ))}
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 flex items-center gap-1">
                <Award className="h-3.5 w-3.5" /> {story.score_achievement}
              </span>
            </div>

            <p className="text-sm text-gray-700 italic leading-relaxed">
              &quot;{story.testimonial_text}&quot;
            </p>

            {/* Embed Video if available */}
            {story.video_url && (
              <div className="rounded-xl overflow-hidden aspect-video bg-gray-900 border border-gray-100 mt-3">
                <iframe
                  src={story.video_url}
                  title={`${story.student_name} Testimonial`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
          </div>

          <div className="border-t border-gray-100 pt-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white font-bold text-sm">
              {story.student_name.charAt(0)}
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm">{story.student_name}</h4>
              <p className="text-xs text-gray-500">{story.course_name}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
