import Image from 'next/image'
import { Play, MapPin } from 'lucide-react'
import type { SuccessStory } from '@/lib/data/testimonials'
import { youtubeThumbnail, extractYouTubeId } from '@/lib/youtube'
import { YouTubePlayer } from './youtube-player'

interface StoryCardProps {
  story: SuccessStory
  onPlay?: (videoId: string) => void
  isActive?: boolean
}

export function StoryCard({ story, onPlay, isActive = false }: StoryCardProps) {
  const videoId = story.video_url ? extractYouTubeId(story.video_url) : null

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-sm transition-all hover:shadow-md">
      {/* Video / Thumbnail Area */}
      <div className="relative aspect-video w-full shrink-0 bg-slate-100">
        {isActive && videoId ? (
          <YouTubePlayer videoId={videoId} title={story.title ?? undefined} className="rounded-none rounded-t-[2rem]" />
        ) : (
          <div className="group relative h-full w-full">
            {videoId ? (
              <Image
                src={youtubeThumbnail(videoId)}
                alt={story.title || 'Success Story'}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-slate-200">
                <span className="text-slate-400">No video available</span>
              </div>
            )}
            
            {/* Play Button Overlay */}
            {videoId && (
              <div 
                className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30"
                onClick={() => onPlay?.(videoId)}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-transform group-hover:scale-110">
                  <Play className="ml-1 h-8 w-8 text-navy" fill="currentColor" />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-bold text-navy">{story.student_name}</h3>
            {story.location && (
              <div className="mt-1 flex items-center text-sm text-slate-500">
                <MapPin className="mr-1 h-3.5 w-3.5" />
                {story.location}
              </div>
            )}
          </div>
          {story.course_name && (
            <div className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
              {story.course_name}
            </div>
          )}
        </div>

        <h4 className="mb-2 text-lg font-bold leading-tight text-navy">
          "{story.title || story.course_name}"
        </h4>
        
        {story.testimonial_text && (
          <p className="line-clamp-4 text-sm leading-relaxed text-slate-600">
            {story.testimonial_text}
          </p>
        )}
      </div>
    </div>
  )
}
