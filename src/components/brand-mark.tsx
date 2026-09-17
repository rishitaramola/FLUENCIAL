import Image from 'next/image'
import Link from 'next/link'

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3 group">
      <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/80 bg-white shadow-sm">
        <Image
          src="/brand/logo.jpg"
          alt="Fluenciel Language Studio"
          width={40}
          height={40}
          className="h-10 w-10 object-cover"
          priority
        />
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[1.05rem] font-semibold tracking-tight text-navy">fluenciel</span>
        {!compact && (
          <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-navy/45">
            Language Studio
          </span>
        )}
      </span>
    </Link>
  )
}
