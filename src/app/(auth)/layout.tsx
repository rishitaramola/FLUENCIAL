import type { Metadata } from 'next'
import { AuthShell } from '@/components/auth-shell'

export const metadata: Metadata = {
  title: {
    template: '%s | Fluenciel Language Studio',
    default: 'Fluenciel Language Studio',
  },
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthShell>
      {children}
    </AuthShell>
  )
}
