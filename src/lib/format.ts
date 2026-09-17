export function formatFeeInr(fee: number | null | undefined) {
  if (fee == null || Number(fee) <= 0) return null
  return `₹${Number(fee).toLocaleString('en-IN')}`
}

export function feeLabel(fee: number | null | undefined) {
  return formatFeeInr(fee) ?? 'Contact us for current fee details'
}

export function isHttpUrl(value: string | null | undefined) {
  if (!value) return false
  try {
    const url = new URL(value)
    return url.protocol === 'https:' || url.protocol === 'http:'
  } catch {
    return false
  }
}

export function embedVideoUrl(raw: string | null | undefined) {
  if (!raw) return null
  try {
    const url = new URL(raw)
    if (url.hostname.includes('youtube.com') || url.hostname.includes('youtu.be')) {
      const id =
        url.hostname.includes('youtu.be')
          ? url.pathname.slice(1)
          : url.searchParams.get('v') || url.pathname.split('/').pop()
      if (!id) return null
      return `https://www.youtube-nocookie.com/embed/${id}`
    }
    if (url.hostname.includes('vimeo.com')) {
      const id = url.pathname.split('/').filter(Boolean).pop()
      if (!id) return null
      return `https://player.vimeo.com/video/${id}`
    }
    if (url.pathname.includes('/embed/')) return raw
    return null
  } catch {
    return null
  }
}
