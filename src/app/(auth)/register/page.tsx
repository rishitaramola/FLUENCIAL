import type { Metadata } from 'next'
import Link from 'next/link'
import { register } from '../actions'

export const metadata: Metadata = { title: 'Create Account' }

interface Props {
  searchParams: Promise<{ error?: string }>
}

export default async function RegisterPage({ searchParams }: Props) {
  const params = await searchParams

  return (
    <>
      <div className="mb-10">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-navy">Create your account</h2>
        <p className="mt-2 text-[15px] text-navy/60">Join Fluenciel and start your French journey.</p>
      </div>

      {params.error && (
        <div role="alert" className="mb-6 rounded-2xl bg-red-50/50 border border-red-100 p-4 text-[13px] text-red-600">
          {params.error}
        </div>
      )}

      <form action={register} className="space-y-5">
        <div>
          <label htmlFor="fullName" className="mb-1.5 block text-[13px] font-semibold text-navy/70">
            Full name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            required
            className="w-full rounded-2xl border border-navy/10 bg-white px-4 py-3 text-[15px] text-navy shadow-sm transition-colors focus:border-studio focus:outline-none focus:ring-4 focus:ring-studio/10"
            placeholder="Priya Sharma"
          />
        </div>

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

        <div>
          <label htmlFor="password" className="mb-1.5 block text-[13px] font-semibold text-navy/70">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
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
          Create account
        </button>
      </form>

      <p className="mt-8 text-center text-[13px] font-medium text-navy/60">
        Already have an account?{' '}
        <Link href="/login" className="text-studio hover:text-studio/80 transition-colors">
          Sign in
        </Link>
      </p>
    </>
  )
}
