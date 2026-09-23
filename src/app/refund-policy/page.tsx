import type { Metadata } from 'next'
import { LegalLayout } from '@/components/legal-layout'
import { siteConfig } from '@/lib/config/site'

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy | Fluenciel',
}

export default function RefundPolicyPage() {
  return (
    <LegalLayout title="Refund & Cancellation Policy">
      <div className="mb-8 p-4 bg-navy/5 rounded-2xl border border-navy/10">
        <p className="font-semibold text-navy">
          Nothing in this Policy is intended to remove, restrict, or waive any mandatory rights or remedies that cannot legally be excluded under applicable Indian law.
        </p>
      </div>

      <section id="section-1" className="space-y-4 mb-8">
        <h2 className="font-heading text-xl font-bold text-navy">1. No-Refund Policy</h2>
        <p>
          Course fees are non-refundable once payment is made and enrolment is confirmed. Students are advised to review all course details, schedule, duration, batch format, and inclusions before making payment. This policy exists because course planning, teacher allocation, batch scheduling, and resource preparation begin upon enrolment.
        </p>
      </section>

      <section id="section-2" className="space-y-4 mb-8">
        <h2 className="font-heading text-xl font-bold text-navy">2. Change of Mind</h2>
        <p>
          If a student changes their mind after enrolment, the course fee remains non-refundable. Students are encouraged to contact the Fluenciel team with any questions or concerns before completing their payment.
        </p>
      </section>

      <section id="section-3" className="space-y-4 mb-8">
        <h2 className="font-heading text-xl font-bold text-navy">3. Missed Classes</h2>
        <p>
          Missed classes, whether due to personal reasons, scheduling conflicts, illness, travel, or other commitments, do not qualify for a refund or fee adjustment. Students are expected to attend their scheduled classes. Fluenciel is not responsible for classes missed by the student.
        </p>
      </section>

      <section id="section-4" className="space-y-4 mb-8">
        <h2 className="font-heading text-xl font-bold text-navy">4. Rescheduling</h2>
        <p>
          Class rescheduling may be possible in certain circumstances, subject to teacher availability and the applicable course terms. Rescheduling is not guaranteed. Requests for rescheduling should be communicated to the Fluenciel team as early as possible.
        </p>
      </section>

      <section id="section-5" className="space-y-4 mb-8">
        <h2 className="font-heading text-xl font-bold text-navy">5. Course Transfer</h2>
        <p>
          Course enrolments are non-transferable to another person unless explicitly agreed upon in writing by Fluenciel. Transferring a course to a different programme or level may be considered on a case-by-case basis, subject to availability and applicable terms.
        </p>
      </section>

      <section id="section-6" className="space-y-4 mb-8">
        <h2 className="font-heading text-xl font-bold text-navy">6. Change of Batch</h2>
        <p>
          A batch change may be possible in certain circumstances, depending on availability and the specific course terms. Batch changes are not guaranteed. Students should contact the Fluenciel team to discuss any batch change requests.
        </p>
      </section>

      <section id="section-7" className="space-y-4 mb-8">
        <h2 className="font-heading text-xl font-bold text-navy">7. Course Cancellation by Fluenciel</h2>
        <p>
          In the unlikely event that Fluenciel cancels a course or programme before it begins, students will be offered either a full refund or the option to transfer to an equivalent programme, at Fluenciel&apos;s discretion. If a course is discontinued after it has commenced, Fluenciel will provide a proportionate resolution, which may include access to remaining sessions, transfer to another batch, or a partial adjustment, as determined on a case-by-case basis.
        </p>
      </section>

      <section id="section-8" className="space-y-4 mb-8">
        <h2 className="font-heading text-xl font-bold text-navy">8. Teacher Changes</h2>
        <p>
          Fluenciel reserves the right to assign, reassign, or change the teacher or instructor for any class, batch, or programme at any time. Teacher changes do not constitute grounds for a refund.
        </p>
      </section>

      <section id="section-9" className="space-y-4 mb-8">
        <h2 className="font-heading text-xl font-bold text-navy">9. Examination and Immigration Plans</h2>
        <p>
          Fluenciel provides French language education and examination preparation. Course fees are paid for the educational service itself. Changes to a student&apos;s examination plans, immigration timeline, visa application, travel plans, university admission, or personal circumstances after enrolment do not qualify for a refund.
        </p>
      </section>

      <section id="section-10" className="space-y-4 mb-8">
        <h2 className="font-heading text-xl font-bold text-navy">10. Technical Problems</h2>
        <p>
          Students are responsible for ensuring they have a stable internet connection, a functioning device, and a suitable learning environment for online classes. Technical problems on the student&apos;s end, including internet outages, device failures, software issues, or power interruptions, do not qualify for a refund. If Fluenciel experiences a technical issue that prevents a class from being conducted, the class will be rescheduled at no additional cost.
        </p>
      </section>

      <section id="section-11" className="space-y-4 mb-8">
        <h2 className="font-heading text-xl font-bold text-navy">11. Promotional and Discounted Courses</h2>
        <p>
          Courses purchased under promotional offers, discounts, scholarships, or special pricing are subject to the same non-refundable policy. Additional restrictions may apply to promotional or discounted enrolments as specified at the time of the offer.
        </p>
      </section>

      <section id="section-12" className="space-y-4 mb-8">
        <h2 className="font-heading text-xl font-bold text-navy">12. Duplicate or Erroneous Payments</h2>
        <p>
          If a student makes a genuine duplicate payment or an erroneous overpayment, Fluenciel will verify the transaction and process a refund for the duplicate or excess amount. Students must notify Fluenciel of any duplicate or erroneous payment promptly. Refunds for verified duplicate or erroneous payments will be processed within a reasonable timeframe.
        </p>
      </section>

      <section id="section-13" className="space-y-4 mb-8">
        <h2 className="font-heading text-xl font-bold text-navy">13. Payment Disputes and Chargebacks</h2>
        <p>
          Students agree to contact {siteConfig.legal.legalEntity} directly to resolve any payment concerns before initiating a chargeback or dispute with their bank or payment provider. Initiating a chargeback without first attempting resolution with Fluenciel may result in suspension of the student&apos;s access to the course and associated services.
        </p>
      </section>

      <section id="section-14" className="space-y-4 mb-8">
        <h2 className="font-heading text-xl font-bold text-navy">14. Legal Rights</h2>
        <p>
          Nothing in this Policy is intended to override, restrict, or exclude any rights or remedies available to consumers under the Consumer Protection Act, 2019, the Information Technology Act, 2000, or any other applicable Indian law that cannot legally be waived or excluded by agreement. Where any provision of this Policy conflicts with mandatory provisions of applicable law, the applicable law shall prevail to the extent of such conflict.
        </p>
      </section>

      <section id="section-15" className="space-y-4 mb-8">
        <h2 className="font-heading text-xl font-bold text-navy">15. Contact Us</h2>
        <p>
          For any questions regarding this Refund &amp; Cancellation Policy, or to discuss a specific situation, please contact the Fluenciel team.
        </p>
        <ul className="mt-4 space-y-2 list-none p-0">
          <li><strong>Email:</strong> <a href={`mailto:${siteConfig.legal.email}`} className="text-studio hover:underline">{siteConfig.legal.email}</a></li>
          <li><strong>Phone:</strong> <a href={`tel:${siteConfig.legal.phone.replace(/\s+/g, '')}`} className="text-studio hover:underline">{siteConfig.legal.phone}</a></li>
          <li><strong>Website:</strong> <a href={siteConfig.legal.website} target="_blank" rel="noopener noreferrer" className="text-studio hover:underline">{siteConfig.legal.website}</a></li>
        </ul>
      </section>
    </LegalLayout>
  )
}
