import Image from 'next/image'
import Link from 'next/link'

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center group">
      <Image
        src="/images/fluenciel-logo.png"
        alt="FLUENCIEL Language Studio"
        width={120}
        height={120}
        className="h-8 md:h-10 w-auto object-contain transition-opacity group-hover:opacity-90"
        priority
      />
    </Link>
  )
}
