import { Metadata } from 'next';
import { LegalLayout } from '@/components/legal-layout';
import { siteConfig } from '@/lib/config/site';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Fluenciel',
  description: 'Terms and Conditions for Fluenciel Language Studio',
};

export default function TermsPage() {
  return (
    <LegalLayout title="Terms & Conditions">
      <div className="prose prose-slate max-w-none space-y-8 text-studio">
        <section>
          <h2 className="text-2xl font-heading text-navy font-bold mb-4">1. About Fluenciel</h2>
          <p className="mb-4">
            Welcome to Fluenciel Language Studio. These Terms and Conditions govern your use of our website, platform, and online French language courses (collectively referred to as "Services"). By accessing our platform or enrolling in any of our programmes, including TEF, TCF, DELF, and DALF preparation courses, you agree to be bound by these terms in their entirety.
          </p>
          <p>
            Fluenciel operates as an educational provider based in India, offering specialised online instruction for language proficiency. Our Services are designed to support students across various learning levels, from A1 to B2. If you do not agree with any part of these Terms, you must refrain from using our Services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-heading text-navy font-bold mb-4">2. Eligibility</h2>
          <p className="mb-4">
            To register for any course at Fluenciel, you must be at least 18 years of age or possess legal parental or guardian consent to enter into these Terms and Conditions. By enrolling, you represent and warrant that you have the legal capacity to form a binding contract under Indian law.
          </p>
          <p>
            We reserve the right to verify your age and eligibility at any time. If we discover that a user is underage and lacks the requisite consent, we may suspend or terminate their enrollment without prior notice or refund.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-heading text-navy font-bold mb-4">3. Course Registration</h2>
          <p className="mb-4">
            Enrollment in a Fluenciel course requires the completion of our official registration process through the website. Students must provide accurate, current, and complete information during registration. Any discrepancies or false information may result in the cancellation of your enrollment.
          </p>
          <p>
            Your registration is only considered complete once we have received full payment of the applicable course fees and you have received an official confirmation email. Course availability is subject to capacity, and spots are allocated on a first-come, first-served basis.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-heading text-navy font-bold mb-4">4. Course Fees and Payment</h2>
          <p className="mb-4">
            All course fees are listed in Indian Rupees (INR) unless otherwise specified. Payment for courses must be made in advance through our authorized payment gateway, Razorpay. We do not accept cash payments or offline bank transfers unless explicitly authorized by our administration in writing.
          </p>
          <p>
            Fluenciel reserves the right to revise course fees at any time. However, any fee changes will not affect students who have already completed their registration and payment for an ongoing or upcoming batch.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-heading text-navy font-bold mb-4">5. Payment Confirmation</h2>
          <p className="mb-4">
            Upon successful transaction processing via Razorpay, you will receive an automated payment receipt. A separate email confirming your course enrollment and batch details will be sent within 24 to 48 hours of successful payment.
          </p>
          <p>
            If a payment fails or is interrupted, the enrollment will not be processed. If you believe your payment was deducted but you did not receive a confirmation, you must contact our support team immediately with your transaction ID.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-heading text-navy font-bold mb-4">6. Course Duration and Validity</h2>
          <p className="mb-4">
            Each course has a specific duration and validity period as outlined in the course description at the time of purchase. Students are expected to complete the course within this designated timeframe.
          </p>
          <p>
            Course validity cannot be extended indefinitely. If a student is unable to complete the course within the scheduled duration, they may forfeit their access to remaining live classes, though access to provided digital materials may remain subject to specific course terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-heading text-navy font-bold mb-4">7. Class Schedule</h2>
          <p className="mb-4">
            Live classes are scheduled according to Indian Standard Time (IST). While we strive to maintain consistent schedules, Fluenciel reserves the right to modify class timings or days with reasonable prior notice to accommodate instructor availability or unforeseen circumstances.
          </p>
          <p>
            For 1-to-1 sessions, scheduling will be coordinated mutually between the instructor and the student. For group classes, the schedule is fixed and all participants are expected to align with the predetermined timings.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-heading text-navy font-bold mb-4">8. Attendance</h2>
          <p className="mb-4">
            Regular attendance is crucial for language acquisition and exam preparation. Students are strongly encouraged to attend all scheduled live sessions. We do not provide compensatory classes for sessions missed by the student in group batches.
          </p>
          <p>
            If a student expects to be absent, they should inform the administration or the instructor in advance. However, this notification does not oblige Fluenciel to provide a makeup session or refund for the missed class.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-heading text-navy font-bold mb-4">9. Late Arrival</h2>
          <p className="mb-4">
            Punctuality is expected to ensure a smooth learning experience for all participants. Instructors will begin classes at the scheduled time. Students arriving late are expected to join quietly without disrupting the ongoing session.
          </p>
          <p>
            For 1-to-1 sessions, the instructor will wait for a maximum of 15 minutes. If the student fails to join within this window, the class will be marked as conducted, and the session will be forfeited without a refund or makeup option.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-heading text-navy font-bold mb-4">10. Class Rescheduling</h2>
          <p className="mb-4">
            In the event that Fluenciel or the instructor needs to cancel a scheduled class due to illness, technical failure, or emergencies, a makeup session will be arranged at no additional cost to the students.
          </p>
          <p>
            For 1-to-1 programs, students may request a reschedule by providing at least 24 hours written notice. Requests made with less than 24 hours notice will not be accommodated, and the session will be counted as completed. Group classes cannot be rescheduled at the request of individual students.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-heading text-navy font-bold mb-4">11. Teacher Changes</h2>
          <p className="mb-4">
            Fluenciel reserves the right to change the assigned instructor for any course or batch at our sole discretion. We ensure that all instructors are highly qualified and capable of delivering the curriculum effectively.
          </p>
          <p>
            A change in instructor does not constitute grounds for a refund or cancellation of the course. We are committed to maintaining the quality and continuity of your educational experience during any such transitions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-heading text-navy font-bold mb-4">12. Online Classes and Technical Requirements</h2>
          <p className="mb-4">
            Our live classes are conducted via third-party video conferencing software. It is the student's responsibility to ensure they have a stable internet connection, a functional webcam, a microphone, and a suitable device (computer or tablet) to participate effectively.
          </p>
          <p>
            Fluenciel is not liable for missed classes or poor learning experiences resulting from technical issues on the student's end. We recommend testing your equipment before the commencement of the course.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-heading text-navy font-bold mb-4">13. Study Materials</h2>
          <p className="mb-4">
            Enrollment in our courses includes access to comprehensive study materials, worksheets, and mock tests specifically curated for TEF, TCF, DELF, and DALF preparation. These materials are provided in digital format.
          </p>
          <p>
            All provided materials are for personal educational use only. Sharing, distributing, reproducing, or selling these materials to third parties is strictly prohibited and constitutes a material breach of these Terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-heading text-navy font-bold mb-4">14. Intellectual Property</h2>
          <p className="mb-4">
            All content, including but not nil to logos, text, course designs, study materials, methodologies, graphics, and software used on the Fluenciel platform, is the exclusive intellectual property of {siteConfig.legal.legalEntity} and is protected by applicable copyright and trademark laws.
          </p>
          <p>
            You are granted a limited, non-exclusive, non-transferable license to access and use the provided content strictly for your personal learning. No part of our intellectual property may be exploited for commercial purposes without our express written consent.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-heading text-navy font-bold mb-4">15. Recording of Classes</h2>
          <p className="mb-4">
            To protect the privacy of our instructors and students, and to safeguard our proprietary teaching methodologies, unauthorized audio or video recording of live classes by students is strictly prohibited.
          </p>
          <p>
            Any student found recording, sharing, or publishing class sessions without prior written authorization from Fluenciel will face immediate expulsion from the course without a refund, and may be subject to legal action.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-heading text-navy font-bold mb-4">16. Examination Preparation Disclaimer</h2>
          <p className="mb-4">
            Our courses are designed to thoroughly prepare students for official French language proficiency exams such as TEF, TCF, DELF, and DALF. However, official exam registration, scheduling, and payment to external examination bodies are solely the responsibility of the student.
          </p>
          <p>
            Fluenciel does not register students for these exams on their behalf. We provide guidance on the process, but we are not affiliated with the official examination centres and cannot influence their schedules or policies.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-heading text-navy font-bold mb-4">17. No Guarantee of Results</h2>
          <p className="mb-4">
            While Fluenciel provides high-quality instruction, study materials, and mock tests, language acquisition is highly dependent on individual effort, practice, and aptitude. Therefore, we do not and cannot guarantee specific scores, outcomes, or successful clearing of any official examination.
          </p>
          <p>
            The success of the student is a collaborative effort, and our post-course support aims to assist eligible students further, but ultimate exam performance rests entirely with the individual candidate.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-heading text-navy font-bold mb-4">18. Refund and Cancellation</h2>
          <p className="mb-4">
            All course fees paid to Fluenciel are strictly non-refundable. Once a student has enrolled and paid for a course, no refunds will be issued under any circumstances, including but not limited to schedule conflicts, lack of attendance, or changes in personal circumstances.
          </p>
          <p>
            For a comprehensive understanding of our policies regarding fees, please review our separate Refund Policy page. By accepting these Terms, you acknowledge and agree to our non-refundable fee structure.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-heading text-navy font-bold mb-4">19. Transfer of Course</h2>
          <p className="mb-4">
            Enrollment is personal to the registered student and is non-transferable. You may not transfer your seat, course access, or unused classes to friends, family members, or any other third party.
          </p>
          <p>
            In highly exceptional cases, such as severe medical emergencies supported by valid documentation, Fluenciel management may, at its absolute discretion, consider requests to defer enrollment to a future batch. This is not a guaranteed right and is evaluated on a case-by-case basis.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-heading text-navy font-bold mb-4">20. Promotional Offers</h2>
          <p className="mb-4">
            Fluenciel may occasionally offer discounts, scholarships, or promotional pricing for specific courses. These offers are subject to specific terms and conditions provided at the time of the promotion.
          </p>
          <p>
            Promotional discounts cannot be applied retroactively to past purchases, nor can they be combined with other offers unless explicitly stated. Fluenciel reserves the right to withdraw or modify promotional offers at any time without prior notice.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-heading text-navy font-bold mb-4">21. Student Conduct</h2>
          <p className="mb-4">
            We foster a respectful, inclusive, and professional learning environment. Students are expected to behave courteously towards instructors, staff, and fellow classmates at all times during live sessions and in any written communications.
          </p>
          <p>
            Harassment, discriminatory language, disruptive behaviour, or any form of abuse will not be tolerated. Fluenciel reserves the right to remove any student exhibiting such behaviour from a live class and, if necessary, terminate their enrollment entirely.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-heading text-navy font-bold mb-4">22. Suspension or Termination</h2>
          <p className="mb-4">
            Fluenciel reserves the right to suspend or terminate your access to our courses and platform immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms and Conditions.
          </p>
          <p>
            Upon termination, your right to use the Services will immediately cease, and no refund will be provided. Provisions of the Terms which by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-heading text-navy font-bold mb-4">23. Website Use</h2>
          <p className="mb-4">
            You agree to use the Fluenciel website and platform only for lawful purposes. You are prohibited from attempting to compromise the security of the website, introducing malicious code or viruses, or accessing data not intended for your use.
          </p>
          <p>
            We strive to ensure the website is accessible and secure, but we do not warrant that your use of the site will be uninterrupted or error-free. We may temporarily suspend access for maintenance or updates.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-heading text-navy font-bold mb-4">24. Third-Party Services</h2>
          <p className="mb-4">
            Our platform utilizes third-party services to deliver our core functionalities, including Supabase for secure data management and Razorpay for processing transactions. While we carefully select our partners, we are not responsible for the performance or policies of these third parties.
          </p>
          <p>
            By using our Services, you also agree to be bound by the respective terms of service and privacy policies of our third-party service providers as they relate to your data and payments.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-heading text-navy font-bold mb-4">25. Third-Party Links</h2>
          <p className="mb-4">
            Our website or course materials may contain links to external, third-party websites that are not owned or controlled by Fluenciel. These links are provided for your convenience and additional reference.
          </p>
          <p>
            We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You acknowledge and agree that Fluenciel shall not be liable for any damage or loss caused by your use of any such external resources.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-heading text-navy font-bold mb-4">26. Availability of Services</h2>
          <p className="mb-4">
            We make every reasonable effort to keep our platform and services operational. However, certain technical difficulties, scheduled maintenance, or circumstances beyond our control may, from time to time, result in temporary interruptions.
          </p>
          <p>
            Fluenciel shall not be held liable for any such interruptions or any loss of data resulting from platform downtime. We will endeavor to restore services as swiftly as possible when disruptions occur.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-heading text-navy font-bold mb-4">27. Limitation of Liability</h2>
          <p className="mb-4">
            To the maximum extent permitted by applicable law, in no event shall {siteConfig.legal.legalEntity}, its directors, employees, or instructors be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Services.
          </p>
          <p>
            In no event shall our aggregate liability for all claims relating to the Services exceed the total amount of fees paid by you to Fluenciel for the specific course in question during the past twelve months.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-heading text-navy font-bold mb-4">28. Privacy</h2>
          <p className="mb-4">
            Your privacy is critically important to us. We collect, store, and process your personal information in accordance with our Privacy Policy. This includes data collected during registration, payment processing, and usage of our platform.
          </p>
          <p>
            By agreeing to these Terms and Conditions, you also consent to the data practices outlined in our Privacy Policy. We are committed to protecting your data utilizing industry-standard security measures, including our integration with Supabase.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-heading text-navy font-bold mb-4">29. Changes to Courses and Terms</h2>
          <p className="mb-4">
            Fluenciel reserves the right, at our sole discretion, to modify or replace these Terms at any time. We also reserve the right to alter course syllabi, update study materials, and change service offerings to reflect current educational standards and exam requirements.
          </p>
          <p>
            If a revision is material, we will provide at least 15 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. Your continued use of the Services after revisions become effective constitutes your acceptance of the revised Terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-heading text-navy font-bold mb-4">30. Force Majeure</h2>
          <p className="mb-4">
            Fluenciel shall not be liable for any failure to perform its obligations under these Terms if such failure results from circumstances beyond our reasonable control. Such circumstances include, but are not limited to, natural disasters, acts of God, strikes, lockouts, internet outages, global pandemics, or governmental restrictions.
          </p>
          <p>
            In the event of a Force Majeure, we will take reasonable steps to minimize disruption and resume services as soon as it is practically and safely possible to do so.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-heading text-navy font-bold mb-4">31. Governing Law</h2>
          <p className="mb-4">
            These Terms and Conditions shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.
          </p>
          <p>
            Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts located in India.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-heading text-navy font-bold mb-4">32. Severability</h2>
          <p className="mb-4">
            If any provision of these Terms is held to be invalid, illegal, or unenforceable by a court of competent jurisdiction, the remaining provisions of these Terms will remain in full force and effect.
          </p>
          <p>
            The invalid or unenforceable provision will be deemed modified so that it is valid and enforceable to the maximum extent permitted by law, reflecting as closely as possible the original intent of the parties.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-heading text-navy font-bold mb-4">33. Entire Agreement</h2>
          <p className="mb-4">
            These Terms and Conditions, alongside our Privacy Policy and Refund Policy, constitute the entire agreement between you and Fluenciel regarding our Services. They supersede and replace any prior agreements, oral or written, we might have had between us regarding the Services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-heading text-navy font-bold mb-4">34. Contact Information</h2>
          <p className="mb-4">
            If you have any questions, concerns, or grievances regarding these Terms and Conditions or the Services provided by Fluenciel, please reach out to us using the contact information below.
          </p>
          <address className="not-italic space-y-2">
            <p><strong>Legal Entity:</strong> {siteConfig.legal.legalEntity}</p>
            <p><strong>Email:</strong> <a href={`mailto:${siteConfig.legal.email}`} className="text-navy hover:underline">{siteConfig.legal.email}</a></p>
            <p><strong>Phone:</strong> {siteConfig.legal.phone}</p>
            <p><strong>Website:</strong> <a href={siteConfig.legal.website} target="_blank" rel="noopener noreferrer" className="text-navy hover:underline">{siteConfig.legal.website}</a></p>
            <p><strong>Grievance Officer:</strong> {siteConfig.legal.grievanceContact}</p>
          </address>
        </section>
      </div>
    </LegalLayout>
  );
}
