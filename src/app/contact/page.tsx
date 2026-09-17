import type { Metadata } from 'next'
import { PublicShell } from '@/components/public-shell'
import { getPublishedCourses } from '@/lib/data/courses'
import { getSiteSettings } from '@/lib/data/site'
import { EnquiryForm } from '@/components/enquiry-form'
import { Mail, Phone, MapPin, MessageCircle, Clock, Sparkles } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Us & Book Free Demo | Fluenciel Studio',
  description: 'Reach out to Fluenciel Language Studio. Visit our studio or book a free 1-on-1 academic consultation with our language counselors.',
}

export default async function ContactPage() {
  const [courses, settings] = await Promise.all([
    getPublishedCourses(),
    getSiteSettings()
  ])

  const hasContactInfo = settings?.email || settings?.phone || settings?.whatsapp || settings?.address || settings?.working_hours

  return (
    <PublicShell>
      {/* Header */}
      <section className="bg-sand/30 border-b border-navy/5 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6 text-center md:text-left">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-navy/5 px-3 py-1 text-xs font-semibold text-navy">
            <Sparkles className="h-3.5 w-3.5" /> Direct Counselor Assistance
          </span>
          <h1 className="text-4xl font-light text-navy sm:text-5xl md:text-6xl tracking-tight">
            Get in Touch
          </h1>
          <p className="text-base sm:text-lg text-navy/70 max-w-2xl mx-auto md:mx-0">
            Have questions about CEFR levels, visa language requirements, or upcoming cohorts? We are here to help.
          </p>
        </div>
      </section>

      {/* Main Content: Info & Form */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            
            {/* Studio Info */}
            <div className="space-y-12">
              {hasContactInfo ? (
                <>
                  <div>
                    <h2 className="text-3xl font-light text-navy">Studio Details</h2>
                    <p className="text-base text-navy/70 mt-2">
                      Visit our language immersion studio or schedule an online counseling session.
                    </p>
                  </div>

                  <div className="space-y-8">
                    {settings?.address && (
                      <div className="flex items-start gap-5">
                        <div className="rounded-2xl bg-navy/5 p-4 text-navy">
                          <MapPin className="h-6 w-6 stroke-[1.5]" />
                        </div>
                        <div className="pt-1">
                          <h4 className="font-medium text-navy text-base">Studio Location</h4>
                          <p className="text-sm text-navy/70 mt-1 whitespace-pre-wrap leading-relaxed">
                            {settings.address}
                          </p>
                        </div>
                      </div>
                    )}

                    {settings?.email && (
                      <div className="flex items-start gap-5">
                        <div className="rounded-2xl bg-navy/5 p-4 text-navy">
                          <Mail className="h-6 w-6 stroke-[1.5]" />
                        </div>
                        <div className="pt-1">
                          <h4 className="font-medium text-navy text-base">Email Inquiries</h4>
                          <a href={`mailto:${settings.email}`} className="text-sm text-navy/70 hover:text-navy mt-1 inline-block transition-colors">
                            {settings.email}
                          </a>
                        </div>
                      </div>
                    )}

                    {settings?.phone && (
                      <div className="flex items-start gap-5">
                        <div className="rounded-2xl bg-navy/5 p-4 text-navy">
                          <Phone className="h-6 w-6 stroke-[1.5]" />
                        </div>
                        <div className="pt-1">
                          <h4 className="font-medium text-navy text-base">Phone Helpline</h4>
                          <a href={`tel:${settings.phone.replace(/[^\d+]/g, '')}`} className="text-sm text-navy/70 hover:text-navy mt-1 block transition-colors">
                            {settings.phone}
                          </a>
                          {settings?.working_hours && (
                            <div className="flex items-center gap-1.5 mt-2 text-xs text-navy/50">
                              <Clock className="h-3.5 w-3.5" />
                              <span>{settings.working_hours}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Direct WhatsApp CTA */}
                  {settings?.whatsapp && (
                    <div className="rounded-3xl bg-[#25D366]/10 border border-[#25D366]/20 p-8 space-y-4 mt-8">
                      <h3 className="text-lg font-medium text-navy">Need Immediate Advice?</h3>
                      <p className="text-sm text-navy/70 leading-relaxed">
                        Chat directly with our academic director on WhatsApp for instant cohort availability.
                      </p>
                      <a
                        href={`https://wa.me/${settings.whatsapp.replace(/[^\d]/g, '')}?text=Hi!%20I%20would%20like%20to%20know%20more%20about%20your%20courses.`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-medium text-white shadow-sm hover:bg-[#25D366]/90 transition-colors"
                      >
                        <MessageCircle className="h-4 w-4" /> Start WhatsApp Chat
                      </a>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex h-full flex-col justify-center max-w-md">
                  <h2 className="text-3xl font-light text-navy">Let's Connect</h2>
                  <p className="text-base text-navy/70 mt-4 leading-relaxed">
                    Use the enquiry form to get in touch. Our academic counselors will review your details and respond within 24 hours. We are looking forward to hearing from you.
                  </p>
                </div>
              )}
            </div>

            {/* Lead Form */}
            <div className="rounded-3xl border border-navy/5 bg-white p-8 sm:p-10 shadow-sm space-y-8">
              <div>
                <h3 className="text-2xl font-light text-navy">Send an Inquiry</h3>
                <p className="text-sm text-navy/70 mt-2">
                  Fill in your details and an academic counselor will contact you shortly.
                </p>
              </div>

              <EnquiryForm courses={courses} />
            </div>
            
          </div>
        </div>
      </section>
    </PublicShell>
  )
}
