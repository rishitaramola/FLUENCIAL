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
      {/* Header Banner */}
      <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 relative z-10 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white/60 px-4 py-1.5 backdrop-blur-md">
            <span className="text-[11px] font-bold uppercase tracking-widest text-navy/70">
              Direct Counselor Assistance
            </span>
          </div>
          
          <h1 className="font-heading text-4xl font-bold tracking-tight text-navy sm:text-5xl lg:text-6xl mx-auto max-w-4xl">
            Get in Touch
          </h1>
          
          <p className="mt-6 text-lg leading-relaxed text-navy/65 sm:text-xl mx-auto max-w-2xl">
            Have questions about CEFR levels, visa language requirements, or upcoming cohorts? We are here to help.
          </p>
        </div>
      </section>

      {/* Main Content: Info & Form */}
      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            
            {/* Studio Info */}
            <div className="space-y-12">
              {hasContactInfo ? (
                <>
                  <div>
                    <h2 className="font-heading text-3xl font-bold text-navy">Studio Details</h2>
                    <p className="mt-4 text-[15px] leading-relaxed text-navy/60">
                      Visit our language immersion studio or schedule an online counseling session.
                    </p>
                  </div>

                  <div className="space-y-8">
                    {settings?.address && (
                      <div className="flex items-start gap-5">
                        <div className="rounded-2xl bg-white/60 border border-white p-4 text-navy shadow-sm backdrop-blur-md">
                          <MapPin className="h-6 w-6 stroke-[1.5]" />
                        </div>
                        <div className="pt-1">
                          <h4 className="font-heading text-lg font-bold text-navy">Studio Location</h4>
                          <p className="text-[14px] text-navy/65 mt-2 whitespace-pre-wrap leading-relaxed">
                            {settings.address}
                          </p>
                        </div>
                      </div>
                    )}

                    {settings?.email && (
                      <div className="flex items-start gap-5">
                        <div className="rounded-2xl bg-white/60 border border-white p-4 text-navy shadow-sm backdrop-blur-md">
                          <Mail className="h-6 w-6 stroke-[1.5]" />
                        </div>
                        <div className="pt-1">
                          <h4 className="font-heading text-lg font-bold text-navy">Email Inquiries</h4>
                          <a href={`mailto:${settings.email}`} className="text-[14px] text-studio hover:text-studio/80 mt-2 inline-block transition-colors font-medium">
                            {settings.email}
                          </a>
                        </div>
                      </div>
                    )}

                    {settings?.phone && (
                      <div className="flex items-start gap-5">
                        <div className="rounded-2xl bg-white/60 border border-white p-4 text-navy shadow-sm backdrop-blur-md">
                          <Phone className="h-6 w-6 stroke-[1.5]" />
                        </div>
                        <div className="pt-1">
                          <h4 className="font-heading text-lg font-bold text-navy">Phone Helpline</h4>
                          <a href={`tel:${settings.phone.replace(/[^\d+]/g, '')}`} className="text-[14px] text-studio hover:text-studio/80 mt-2 block transition-colors font-medium">
                            {settings.phone}
                          </a>
                          {settings?.working_hours && (
                            <div className="flex items-center gap-1.5 mt-3 text-[13px] text-navy/50 font-medium">
                              <Clock className="h-4 w-4" />
                              <span>{settings.working_hours}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Direct WhatsApp CTA */}
                  {settings?.whatsapp && (
                    <div className="rounded-[2.5rem] bg-[#25D366]/10 border border-[#25D366]/20 p-8 space-y-4 mt-8">
                      <h3 className="font-heading text-xl font-bold text-navy">Need Immediate Advice?</h3>
                      <p className="text-[14px] text-navy/70 leading-relaxed">
                        Chat directly with our academic director on WhatsApp for instant cohort availability.
                      </p>
                      <a
                        href={`https://wa.me/${settings.whatsapp.replace(/[^\d]/g, '')}?text=Hi!%20I%20would%20like%20to%20know%20more%20about%20your%20courses.`}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 inline-flex items-center gap-2 rounded-2xl bg-[#25D366] px-5 py-3.5 text-[14px] font-semibold text-white shadow-sm hover:bg-[#25D366]/90 transition-colors"
                      >
                        <MessageCircle className="h-4 w-4" /> Start WhatsApp Chat
                      </a>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex h-full flex-col justify-center max-w-md">
                  <h2 className="font-heading text-3xl font-bold text-navy">Let's Connect</h2>
                  <p className="mt-4 text-[15px] leading-relaxed text-navy/60">
                    Use the enquiry form to get in touch. Our academic counselors will review your details and respond within 24 hours. We are looking forward to hearing from you.
                  </p>
                </div>
              )}
            </div>

            {/* Lead Form */}
            <div className="rounded-[2.5rem] border border-white bg-white/60 p-8 shadow-sm backdrop-blur-md sm:p-10 space-y-8">
              <div>
                <h3 className="font-heading text-2xl font-bold text-navy">Send an Inquiry</h3>
                <p className="text-[14px] text-navy/60 mt-2">
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
