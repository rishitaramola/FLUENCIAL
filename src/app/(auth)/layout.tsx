import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | Fluenciel Language Studio',
    default: 'Fluenciel Language Studio',
  },
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        {/* Logo / brand */}
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Fluenciel
          </h1>
          <p className="mt-1 text-sm text-gray-500">Language Studio</p>
        </div>

        {/* Card */}
        <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
          {children}
        </div>
      </div>
    </div>
  )
}
