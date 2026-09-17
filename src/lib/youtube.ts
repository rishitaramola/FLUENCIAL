/**
 * Extracts a YouTube video ID from common URL formats.
 * Returns null if the URL is invalid or not a YouTube URL.
 */
export function extractYouTubeId(url: string | null | undefined): string | null {
  if (!url) return null

  // Match standard youtube.com and youtu.be URLs
  // Handles /watch?v=ID, /embed/ID, /v/ID, and youtu.be/ID
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)

  if (match && match[2].length === 11) {
    return match[2]
  }

  return null
}

/**
 * Converts a YouTube URL to a privacy-enhanced embed URL.
 * Returns null if the input is not a valid YouTube URL.
 */
export function youtubeEmbedUrl(url: string | null | undefined): string | null {
  const videoId = extractYouTubeId(url)
  if (!videoId) return null
  
  return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`
}

/**
 * Returns the thumbnail URL for a YouTube video.
 * Falls back to default quality if high quality isn't available.
 */
export function youtubeThumbnail(videoId: string): string {
  // Using maxresdefault as primary, but if not available it might 404,
  // however standard practice for modern videos is maxresdefault is available.
  // A safer bet across all videos is hqdefault.jpg
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
}
