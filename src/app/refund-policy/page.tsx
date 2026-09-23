import type { Metadata } from 'next'
import { LegalLayout } from '@/components/legal-layout'

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy | Fluenciel',
}

export default function RefundPolicyPage() {
  const sections = [
    '1. No-Refund Policy',
    '2. Change of Mind',
    '3. Missed Classes',
    '4. Rescheduling',
    '5. Course Transfer',
    '6. Change of Batch',
    '7. Course Cancellation by Fluenciel',
    '8. Teacher Changes',
    '9. Examination and Immigration Plans',
    '10. Technical Problems',
    '11. Promotional and Discounted Courses',
    '12. Duplicate or Erroneous Payments',
    '13. Payment Disputes and Chargebacks',
    '14. Legal Rights',
    '15. Contact Us',
  ]

  return (
    <LegalLayout title="Refund & Cancellation Policy">
      <div className="mb-8 p-4 bg-navy/5 rounded-2xl border border-navy/10">
        <p className="font-semibold text-navy">
          Nothing in this Policy is intended to remove, restrict, or waive any mandatory rights or remedies that cannot legally be excluded under applicable Indian law.
        </p>
      </div>

      {sections.map((section, idx) => (
        <section key={idx} id={`section-${idx + 1}`} className="space-y-4">
          <h2 className="font-heading text-xl font-bold text-navy">{section}</h2>
          <p>[INSERT EXACT CONTENT FROM SOURCE MATERIAL HERE]</p>
        </section>
      ))}
    </LegalLayout>
  )
}
