import type { Metadata } from 'next'
import { resetPassword } from '../actions'

export const metadata: Metadata = { title: 'Reset Password' }

interface Props {
  searchParams: Promise<{
    error?: string
    message?: string
  }>
}

export default async function ResetPasswordPage({ searchParams }: Props) {
  const params = await searchParams

  return (
    <>
      <div className="mb-10">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-navy">Set new password</h2>
        <p className="mt-2 text-[15px] text-navy/60">Please enter your new password below.</p>
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

      <form action={resetPassword} className="space-y-5">
        <div>
          <label htmlFor="password" className="mb-1.5 block text-[13px] font-semibold text-navy/70">
            New password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
            className="w-full rounded-2xl border border-navy/10 bg-white px-4 py-3 text-[15px] text-navy shadow-sm transition-colors focus:border-studio focus:outline-none focus:ring-4 focus:ring-studio/10"
            placeholder="min. 8 characters"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="mb-1.5 block text-[13px] font-semibold text-navy/70">
            Confirm new password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            minLength={8}
            className="w-full rounded-2xl border border-navy/10 bg-white px-4 py-3 text-[15px] text-navy shadow-sm transition-colors focus:border-studio focus:outline-none focus:ring-4 focus:ring-studio/10"
            placeholder="min. 8 characters"
          />
        </div>

        <button
          type="submit"
          className="mt-2 w-full rounded-2xl bg-navy px-4 py-3.5 text-[15px] font-semibold text-white shadow-md transition-all hover:bg-navy/90 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-navy/20"
        >
          Update password
        </button>
      </form>
    </>
  )
}
