import { PublicFooter } from '@/components/public-footer'
import { PublicNav } from '@/components/public-nav'
import { EuropeMapBg } from '@/components/europe-map-bg'

export function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="studio-canvas relative flex min-h-screen flex-col selection:bg-studio/20">
      <EuropeMapBg />
      <PublicNav />
      <main className="flex-1 relative z-10">{children}</main>
      <div className="relative z-10">
        <PublicFooter />
      </div>
    </div>
  )
}
