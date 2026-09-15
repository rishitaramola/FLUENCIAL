import type { Metadata } from 'next'
import { getSuccessStories } from '@/lib/data/testimonials'
import { Plus, Video, Star, Award } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Manage Success Stories & Video Testimonials',
}

export default async function AdminTestimonialsPage() {
  const stories = await getSuccessStories()

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Success Stories & Video Testimonials</h1>
          <p className="text-sm text-gray-500">Upload student reviews, DELF/GOETHE scores, and YouTube video embeds.</p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
        >
          <Plus className="h-4 w-4" /> Add Success Story
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {stories.map((story) => (
          <div key={story.id} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="rounded bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                {story.score_achievement}
              </span>
              <div className="flex items-center gap-2">
                <button type="button" className="text-xs text-gray-500 hover:text-indigo-600 font-medium">Edit</button>
                <button type="button" className="text-xs text-red-500 hover:text-red-700 font-medium">Delete</button>
              </div>
            </div>
            <h3 className="font-bold text-gray-900 text-base">{story.student_name} ({story.course_name})</h3>
            <p className="text-sm text-gray-600 italic">&quot;{story.testimonial_text}&quot;</p>
            {story.video_url && (
              <p className="text-xs text-indigo-600 font-mono truncate">Video Embed: {story.video_url}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
