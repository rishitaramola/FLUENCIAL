import { PublicFooter } from '@/components/public-footer'
import { PublicNav } from '@/components/public-nav'

export function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="studio-canvas flex min-h-screen flex-col">
      <PublicNav />
      <main className="flex-1">{children}</main>
      <PublicFooter />
    </div>
  )
}
