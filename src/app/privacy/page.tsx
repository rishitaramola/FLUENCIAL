import type { Metadata } from 'next'
import { PublicShell } from '@/components/public-shell'

export const metadata: Metadata = { title: 'Privacy Policy | Fluenciel Studio' }

export default function PrivacyPage() {
  return (
    <PublicShell>
      <div className="mx-auto max-w-4xl px-8 py-12 sm:px-12 lg:px-16 space-y-6 my-16 bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          At Fluenciel Language Studio, we take your privacy seriously. This policy describes how we collect, use, and protect your personal information when you use our website or register for our language programs.
        </p>
        <h3 className="text-lg font-bold text-gray-900">Information We Collect</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          We collect personal details such as your name, email address, phone number, and course preferences when you submit inquiry forms, book demo sessions, or enroll in a program.
        </p>
        <h3 className="text-lg font-bold text-gray-900">Payment Data</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          Online payments are processed securely through Razorpay. We do not store sensitive payment credentials (card details, UPI PINs, or banking passwords) on our servers.
        </p>
      </div>
    </PublicShell>
  )
}
