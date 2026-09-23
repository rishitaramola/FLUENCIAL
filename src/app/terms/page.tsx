import type { Metadata } from 'next'
import { LegalLayout } from '@/components/legal-layout'

export const metadata: Metadata = {
  title: 'Terms & Conditions | Fluenciel',
}

export default function TermsPage() {
  const sections = [
    '1. About Fluenciel',
    '2. Eligibility',
    '3. Course Registration',
    '4. Course Fees and Payment',
    '5. Payment Confirmation',
    '6. Course Duration and Validity',
    '7. Class Schedule',
    '8. Attendance',
    '9. Late Arrival',
    '10. Class Rescheduling',
    '11. Teacher Changes',
    '12. Online Classes and Technical Requirements',
    '13. Study Materials',
    '14. Intellectual Property',
    '15. Recording of Classes',
    '16. Examination Preparation Disclaimer',
    '17. No Guarantee of Results',
    '18. Refund and Cancellation',
    '19. Transfer of Course',
    '20. Promotional Offers',
    '21. Student Conduct',
    '22. Suspension or Termination',
    '23. Website Use',
    '24. Third-Party Services',
    '25. Third-Party Links',
    '26. Availability of Services',
    '27. Limitation of Liability',
    '28. Privacy',
    '29. Changes to Courses and Terms',
    '30. Force Majeure',
    '31. Governing Law',
    '32. Severability',
    '33. Entire Agreement',
    '34. Contact Information',
  ]

  return (
    <LegalLayout title="Terms & Conditions">
      {sections.map((section, idx) => (
        <section key={idx} id={`section-${idx + 1}`} className="space-y-4">
          <h2 className="font-heading text-xl font-bold text-navy">{section}</h2>
          <p>[INSERT EXACT CONTENT FROM SOURCE MATERIAL HERE]</p>
        </section>
      ))}
    </LegalLayout>
  )
}
