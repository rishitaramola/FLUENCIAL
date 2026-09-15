import type { Metadata } from 'next'
import { PublicNav } from '@/components/public-nav'
import { PublicFooter } from '@/components/public-footer'
import { submitLeadAction } from '@/app/actions/leads'
import { getPublishedCourses } from '@/lib/data/courses'
import { Mail, Phone, MapPin, MessageCircle, Clock, Sparkles } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Us & Book Free Demo | Fluenciel Studio',
  description: 'Reach out to Fluenciel Language Studio. Visit our studio or book a free 1-on-1 academic consultation with our language counselors.',
}

export default async function ContactPage() {
  const courses = await getPublishedCourses()

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PublicNav />

      {/* Header */}
      <section className="bg-gray-50 border-b border-gray-100 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
            <Sparkles className="h-3.5 w-3.5" /> Direct Counselor Assistance
          </span>
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Get in Touch with Fluenciel Studio
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl">
            Have questions about CEFR levels, visa language requirements, or upcoming cohorts? We are here to help.
          </p>
        </div>
      </section>

      {/* Main Content: Info & Form */}
      <section className="py-16 flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Studio Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Studio Details & Hours</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Visit our language immersion studio or schedule a online counseling session.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">Studio Location</h4>
                    <p className="text-xs text-gray-600 mt-0.5">
                      Suite 402, Outer Circle, Connaught Place<br />
                      New Delhi, 110001, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">Email Inquiries</h4>
                    <p className="text-xs text-gray-600 mt-0.5">admissions@fluenciel.com</p>
                    <p className="text-xs text-gray-600">support@fluenciel.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">Phone Helpline</h4>
                    <p className="text-xs text-gray-600 mt-0.5">+91 98765 43210 / +91 11 4321 8765</p>
                    <p className="text-xs text-gray-400">Mon - Sat: 9:00 AM - 7:00 PM IST</p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp CTA */}
              <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-6 space-y-3">
                <h3 className="text-base font-bold text-emerald-900">Need Immediate Advice?</h3>
                <p className="text-xs text-emerald-700 leading-relaxed">
                  Chat directly with our academic director on WhatsApp for instant cohort availability.
                </p>
                <a
                  href="https://wa.me/919876543210?text=Hi!%20I%20would%20like%20to%20know%20more%20about%20Fluenciel%20courses."
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-emerald-500 transition-colors"
                >
                  <MessageCircle className="h-4 w-4" /> Start WhatsApp Chat
                </a>
              </div>
            </div>

            {/* Lead Form */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Send an Inquiry</h3>
                <p className="text-xs text-gray-500 mt-1">
                  Fill in your details and an academic counselor will contact you within 24 hours.
                </p>
              </div>

              <form action={submitLeadAction} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-gray-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="e.g. Rahul Verma"
                    className="w-full rounded-lg border border-gray-300 px-3.5 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="rahul@example.com"
                    className="w-full rounded-lg border border-gray-300 px-3.5 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="w-full rounded-lg border border-gray-300 px-3.5 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label htmlFor="courseId" className="block text-xs font-medium text-gray-700 mb-1">
                    Program Preference
                  </label>
                  <select
                    id="courseId"
                    name="courseId"
                    className="w-full rounded-lg border border-gray-300 px-3.5 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="">Select a course (Optional)</option>
                    {courses.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title} ({c.level})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="notes" className="block text-xs font-medium text-gray-700 mb-1">
                    Message / Special Requirements
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    placeholder="Mention your learning objective, timeline, or preferred class hours..."
                    className="w-full rounded-lg border border-gray-300 px-3.5 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 transition-colors"
                >
                  Submit Inquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  )
}
