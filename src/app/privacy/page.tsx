import type { Metadata } from 'next'
import { PublicShell } from '@/components/public-shell'

export const metadata: Metadata = { title: 'Privacy Policy | Fluenciel Studio' }

export default function PrivacyPage() {
  return (
    <PublicShell>
      <section className="pt-24 pb-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="rounded-[2.5rem] border border-white bg-white/60 p-8 shadow-sm backdrop-blur-md sm:p-12 space-y-8">
            <h1 className="font-heading text-3xl font-bold text-navy sm:text-4xl">Privacy Policy</h1>
            
            <div className="space-y-6">
              <p className="text-[15px] text-navy/65 leading-relaxed">
                At Fluenciel Language Studio, we take your privacy seriously. This policy describes how we collect, use, and protect your personal information when you use our website or register for our language programs.
              </p>
              
              <div className="space-y-3">
                <h3 className="font-heading text-xl font-bold text-navy">Information We Collect</h3>
                <p className="text-[15px] text-navy/65 leading-relaxed">
                  We collect personal details such as your name, email address, phone number, and course preferences when you submit inquiry forms, book demo sessions, or enroll in a program.
                </p>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-heading text-xl font-bold text-navy">Payment Data</h3>
                <p className="text-[15px] text-navy/65 leading-relaxed">
                  Online payments are processed securely through Razorpay. We do not store sensitive payment credentials (card details, UPI PINs, or banking passwords) on our servers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicShell>
  )
}
