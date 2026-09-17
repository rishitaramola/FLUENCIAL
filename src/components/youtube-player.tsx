import { extractYouTubeId } from '@/lib/youtube'

interface YouTubePlayerProps {
  videoId: string
  title?: string
  className?: string
}

export function YouTubePlayer({ videoId, title = 'YouTube video player', className = '' }: YouTubePlayerProps) {
  // If a full URL is passed, try to extract the ID, otherwise assume it's an ID
  const id = extractYouTubeId(videoId) || videoId
  
  return (
    <div className={`relative aspect-video w-full overflow-hidden rounded-2xl bg-slate-900 ${className}`}>
      <iframe
        className="absolute inset-0 h-full w-full border-0"
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
      />
    </div>
  )
}
