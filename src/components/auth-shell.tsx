import { BrandMark } from '@/components/brand-mark'
import { EuropeMapBg } from '@/components/europe-map-bg'
import { BackButton } from '@/components/back-button'

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-ivory selection:bg-studio/20">
      {/* Left Branding Panel (Hidden on Mobile) */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-navy p-12 lg:flex">
        <div className="absolute inset-0 opacity-20">
          <EuropeMapBg />
        </div>
        
        <div className="relative z-10">
          <div className="brightness-0 invert">
            <BrandMark />
          </div>
          <div className="mt-20 max-w-md">
            <h1 className="font-heading text-4xl font-bold tracking-tight text-white lg:text-5xl">
              L'excellence commence ici.
            </h1>
            <p className="mt-6 text-lg text-white/70">
              Sign in to manage your language learning journey, access materials, and track your progress with our certified instructors.
            </p>
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-sm text-white/50">© {new Date().getFullYear()} Fluenciel Language Studio</p>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="flex w-full flex-col lg:w-1/2">
        <div className="p-6 sm:p-8">
          <BackButton fallbackUrl="/" />
        </div>
        <div className="flex flex-1 items-center justify-center p-6 sm:p-12">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="mb-10 lg:hidden">
              <BrandMark />
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
