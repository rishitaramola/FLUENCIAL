import Image from 'next/image'
import Link from 'next/link'

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center group py-1">
      <Image
        src="/images/fluenciel-logo-trimmed.png"
        alt="FLUENCIEL Language Studio"
        width={1081}
        height={350}
        className="h-[38px] md:h-[50px] w-auto object-contain transition-opacity group-hover:opacity-90 mix-blend-darken"
        priority
      />
    </Link>
  )
}
