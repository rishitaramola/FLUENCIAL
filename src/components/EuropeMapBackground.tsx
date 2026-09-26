import Image from 'next/image'

export function EuropeMapBackground() {
  return (
    <div 
      className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden opacity-[0.25]"
      aria-hidden="true"
    >
      <div className="relative w-full h-full min-h-[800px] flex items-center justify-center">
        <Image
          src="/europe-map.svg"
          alt=""
          fill
          className="object-cover md:object-contain object-center scale-[140%] md:scale-[120%] translate-x-[-2%] translate-y-[2%]"
          priority
        />
      </div>
      
      {/* Optional soft background gradient overlay to blend edges */}
      <div className="absolute inset-0 z-1 bg-gradient-to-b from-transparent via-transparent to-white/50 pointer-events-none" />
    </div>
  )
}
