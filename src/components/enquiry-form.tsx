'use client'

import { useActionState } from 'react'
import { submitEnquiry } from '@/app/actions/leads'
import type { Course } from '@/lib/data/courses'

const initial = { ok: false, error: '', message: '' }

export function EnquiryForm({
  courses,
  compact = false,
}: {
  courses: Course[]
  compact?: boolean
}) {
  const [state, action, pending] = useActionState(submitEnquiry, initial)

  return (
    <form action={action} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <Field label="Full name" name="name" required />
      <Field label="Email" name="email" type="email" required />
      <Field label="Phone" name="phone" type="tel" />

      <div>
        <label htmlFor="courseId" className="mb-1 block text-xs font-medium text-navy/70">
          Course / level
        </label>
        <select
          id="courseId"
          name="courseId"
          className="w-full rounded-2xl border border-navy/10 bg-white px-3.5 py-2.5 text-sm text-navy"
        >
          <option value="">Select if known</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title} ({c.level})
            </option>
          ))}
          <option value="">French — not sure yet</option>
        </select>
      </div>

      <div>
        <label htmlFor="currentLevel" className="mb-1 block text-xs font-medium text-navy/70">
          Current French level
        </label>
        <select
          id="currentLevel"
          name="currentLevel"
          className="w-full rounded-2xl border border-navy/10 bg-white px-3.5 py-2.5 text-sm text-navy"
        >
          <option value="">Not sure</option>
          <option>Complete beginner</option>
          <option>A1</option>
          <option>A2</option>
          <option>B1</option>
          <option>B2</option>
          <option>C1</option>
          <option>C2</option>
        </select>
      </div>

      <div>
        <label htmlFor="goal" className="mb-1 block text-xs font-medium text-navy/70">
          Goal
        </label>
        <select id="goal" name="goal" className="w-full rounded-2xl border border-navy/10 bg-white px-3.5 py-2.5 text-sm text-navy">
          <option value="">Select a goal</option>
          <option>Everyday conversation</option>
          <option>Study</option>
          <option>Work / career</option>
          <option>DELF preparation</option>
          <option>TCF preparation</option>
          <option>Travel</option>
          <option>Other</option>
        </select>
      </div>

      <Field label="Preferred timing" name="preferredTiming" placeholder="Weekday evenings, weekends…" />

      <div>
        <label htmlFor="preferredMode" className="mb-1 block text-xs font-medium text-navy/70">
          Preferred mode
        </label>
        <select
          id="preferredMode"
          name="preferredMode"
          className="w-full rounded-2xl border border-navy/10 bg-white px-3.5 py-2.5 text-sm text-navy"
        >
          <option value="">No preference yet</option>
          <option>Online</option>
          <option>In person</option>
          <option>Hybrid</option>
        </select>
      </div>

      <div className={compact ? 'sm:col-span-2' : 'sm:col-span-2'}>
        <label htmlFor="message" className="mb-1 block text-xs font-medium text-navy/70">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full rounded-2xl border border-navy/10 bg-white px-3.5 py-2.5 text-sm text-navy"
          placeholder="Anything that will help us suggest a suitable starting point."
        />
      </div>

      <p className="sm:col-span-2 text-xs leading-relaxed text-navy/50">
        By submitting, you agree we may use this information to respond to your enquiry. See our{' '}
        <a href="/privacy-policy" className="underline">
          Privacy Policy
        </a>
        .
      </p>

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-full bg-navy px-6 py-3.5 text-sm font-semibold text-white disabled:opacity-60"
        >
          {pending ? 'Sending…' : 'Book a Free Demo'}
        </button>
      </div>

      {state.error && (
        <p role="alert" className="sm:col-span-2 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-800">
          {state.error}
        </p>
      )}
      {state.ok && (
        <p role="status" className="sm:col-span-2 rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {state.message}
        </p>
      )}
    </form>
  )
}

function Field({
  label,
  name,
  type = 'text',
  required,
  placeholder,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
  placeholder?: string
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1 block text-xs font-medium text-navy/70">
        {label}
        {required ? ' *' : ''}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-navy/10 bg-white px-3.5 py-2.5 text-sm text-navy"
      />
    </div>
  )
}
