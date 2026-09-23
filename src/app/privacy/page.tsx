import type { Metadata } from 'next'
import { LegalLayout } from '@/components/legal-layout'

export const metadata: Metadata = {
  title: 'Privacy Policy | Fluenciel',
}

export default function PrivacyPage() {
  const sections = [
    '1. Information We Collect',
    '2. How We Use Your Information',
    '3. Legal Basis for Processing',
    '4. Sharing of Information',
    '5. International Data Transfers',
    '6. Cookies and Tracking Technologies',
    '7. Marketing Communications',
    '8. Data Security',
    '9. Data Retention',
    '10. Your Privacy Rights',
    '11. Children\'s Privacy',
    '12. Third-Party Websites and Services',
    '13. Social Media',
    '14. Student Testimonials and Photographs',
    '15. Changes to This Privacy Policy',
    '16. Grievance Redressal',
    '17. Governing Law',
    '18. Contact Us',
  ]

  return (
    <LegalLayout title="Privacy Policy">
      {sections.map((section, idx) => (
        <section key={idx} id={`section-${idx + 1}`} className="space-y-4">
          <h2 className="font-heading text-xl font-bold text-navy">{section}</h2>
          <p>[INSERT EXACT CONTENT FROM SOURCE MATERIAL HERE]</p>
        </section>
      ))}
    </LegalLayout>
  )
}
