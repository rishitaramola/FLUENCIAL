import type { Metadata } from 'next'
import Link from 'next/link'
import { forgotPassword } from '../actions'

export const metadata: Metadata = { title: 'Forgot Password' }

interface Props {
  searchParams: Promise<{
    error?: string
    message?: string
  }>
}

export default async function ForgotPasswordPage({ searchParams }: Props) {
  const params = await searchParams

  return (
    <>
      <div className="mb-10">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-navy">Forgot password?</h2>
        <p className="mt-2 text-[15px] text-navy/60">Enter your email to receive a password reset link.</p>
      </div>

      {params.error && (
        <div role="alert" className="mb-6 rounded-2xl bg-red-50/50 border border-red-100 p-4 text-[13px] text-red-600">
          {params.error}
        </div>
      )}
      
      {params.message && (
        <div role="status" className="mb-6 rounded-2xl bg-emerald-50/50 border border-emerald-100 p-4 text-[13px] text-emerald-600">
          {params.message}
        </div>
      )}

      <form action={forgotPassword} className="space-y-5">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-[13px] font-semibold text-navy/70">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="w-full rounded-2xl border border-navy/10 bg-white px-4 py-3 text-[15px] text-navy shadow-sm transition-colors focus:border-studio focus:outline-none focus:ring-4 focus:ring-studio/10"
            placeholder="you@example.com"
          />
        </div>

        <button
          type="submit"
          className="mt-2 w-full rounded-2xl bg-navy px-4 py-3.5 text-[15px] font-semibold text-white shadow-md transition-all hover:bg-navy/90 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-navy/20"
        >
          Send reset link
        </button>
      </form>

      <p className="mt-8 text-center text-[13px] font-medium text-navy/60">
        Remember your password?{' '}
        <Link href="/login" className="text-studio hover:text-studio/80 transition-colors">
          Sign in
        </Link>
      </p>
    </>
  )
}
