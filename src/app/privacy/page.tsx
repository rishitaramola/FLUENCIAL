import type { Metadata } from 'next'
import { LegalLayout } from '@/components/legal-layout'
import { siteConfig } from '@/lib/config/site'

export const metadata: Metadata = {
  title: 'Privacy Policy | Fluenciel',
}

export default function PrivacyPage() {
  const sections = [
    {
      title: '1. Information We Collect',
      content: (
        <>
          <p>
            We collect personal information that you voluntarily provide to us when you register for courses at {siteConfig.legal.legalEntity}, express an interest in obtaining information about us or our products and services, or otherwise contact us.
          </p>
          <p>
            The personal information that we collect depends on the context of your interactions with us and the website, the choices you make, and the products and features you use. This may include your name, email address, phone number, physical address, language proficiency level, and educational background. We also automatically collect certain information when you visit, use, or navigate the website, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, and information about how and when you use our website.
          </p>
        </>
      ),
    },
    {
      title: '2. How We Use Your Information',
      content: (
        <>
          <p>
            We process your information for purposes based on legitimate business interests, the fulfillment of our contract with you, compliance with our legal obligations, and/or your consent. Specifically, we use the information we collect to facilitate account creation, authenticate users, deliver online and offline French language courses, and manage your enrollment.
          </p>
          <p>
            We also use your data to send administrative information to you, fulfill and manage your orders, payments, and returns, request feedback, and to send you marketing and promotional communications (if you have opted in). Furthermore, we may use your information to protect our services, enforce our terms, and monitor analytics to improve our website and course offerings.
          </p>
        </>
      ),
    },
    {
      title: '3. Legal Basis for Processing',
      content: (
        <>
          <p>
            We only process your personal information when we believe it is necessary and we have a valid legal reason (i.e., legal basis) to do so under applicable law, including the Information Technology Act, 2000, and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.
          </p>
          <p>
            Our legal bases for processing your data include: consent (when you have given us permission), performance of a contract (to provide our educational services), legal obligations (to comply with laws and regulations), and our legitimate interests (such as improving our services and ensuring security).
          </p>
        </>
      ),
    },
    {
      title: '4. Sharing of Information',
      content: (
        <>
          <p>
            We may share your data with third-party vendors, service providers, contractors, or agents who perform services for us or on our behalf and require access to such information to do that work. This includes payment processors like Razorpay, data storage providers like Supabase, data analytics services, and email delivery services.
          </p>
          <p>
            We do not sell, rent, or trade your personal information to third parties for their promotional purposes. We may also disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process.
          </p>
        </>
      ),
    },
    {
      title: '5. International Data Transfers',
      content: (
        <>
          <p>
            {siteConfig.legal.legalEntity} is based in India. However, we may transfer, store, and process your information in countries other than your own due to the use of cloud-based service providers such as Supabase for database hosting and other third-party services.
          </p>
          <p>
            If you are accessing our services from outside India, please be aware that your information may be transferred to, stored, and processed by us in our facilities and by those third parties with whom we may share your personal information. We will take all necessary measures to protect your personal information in accordance with this privacy policy and applicable law.
          </p>
        </>
      ),
    },
    {
      title: '6. Cookies and Tracking Technologies',
      content: (
        <>
          <p>
            We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Cookies are small data files stored on your device that help us improve our website and your experience, see which areas and features of our website are popular, and count visits.
          </p>
          <p>
            Most web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to remove cookies and to reject cookies. However, if you choose to remove cookies or reject cookies, this could affect certain features or services of our website, including authentication for student portals.
          </p>
        </>
      ),
    },
    {
      title: '7. Marketing Communications',
      content: (
        <>
          <p>
            You may receive marketing emails or promotional messages from us if you have provided your consent or if it is permitted under applicable law. These communications may include newsletters, updates about new French courses, special offers, and event invitations.
          </p>
          <p>
            You can unsubscribe from our marketing email list at any time by clicking on the unsubscribe link in the emails that we send or by contacting us at {siteConfig.legal.email}. You will then be removed from the marketing email list. However, we may still communicate with you to send you service-related emails that are necessary for the administration and use of your account.
          </p>
        </>
      ),
    },
    {
      title: '8. Data Security',
      content: (
        <>
          <p>
            We have implemented appropriate and reasonable technical and organizational security measures designed to protect the security of any personal information we process. This includes data encryption, secure socket layer (SSL) technology, and restricted access to personal data.
          </p>
          <p>
            However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information.
          </p>
        </>
      ),
    },
    {
      title: '9. Data Retention',
      content: (
        <>
          <p>
            We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy policy, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements).
          </p>
          <p>
            When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.
          </p>
        </>
      ),
    },
    {
      title: '10. Your Privacy Rights',
      content: (
        <>
          <p>
            Depending on your location and applicable law, you may have certain rights regarding your personal information. These may include the right to request access to and obtain a copy of your personal information, to request rectification or erasure, to restrict the processing of your personal information, and if applicable, to data portability.
          </p>
          <p>
            To exercise these rights, you can contact us at {siteConfig.legal.email}. We will consider and act upon any request in accordance with applicable data protection laws. We may need to request specific information from you to help us confirm your identity and ensure your right to access your personal data.
          </p>
        </>
      ),
    },
    {
      title: '11. Children\'s Privacy',
      content: (
        <>
          <p>
            Our services are available to students of all ages, including children, but we do not knowingly collect, maintain, or use personal information from children under the age of 18 without parental or guardian consent. If you are under 18, you must have a parent or guardian enroll you in our courses.
          </p>
          <p>
            If we learn that personal information from users less than 18 years of age has been collected without verifiable parental consent, we will deactivate the account and take reasonable measures to promptly delete such data from our records. If you become aware of any data we may have collected from children under age 18, please contact us at {siteConfig.legal.email}.
          </p>
        </>
      ),
    },
    {
      title: '12. Third-Party Websites and Services',
      content: (
        <>
          <p>
            The website may contain advertisements from third parties that are not affiliated with us and which may link to other websites, online services, or mobile applications. We cannot guarantee the safety and privacy of data you provide to any third parties.
          </p>
          <p>
            Any data collected by third parties is not covered by this privacy policy. We are not responsible for the content or privacy and security practices and policies of any third parties, including other websites, services, or applications that may be linked to or from the website. You should review the policies of such third parties and contact them directly to respond to your questions.
          </p>
        </>
      ),
    },
    {
      title: '13. Social Media',
      content: (
        <>
          <p>
            Our website may include social media features and widgets, such as Instagram and LinkedIn integration. These features may collect your IP address, which page you are visiting on our site, and may set a cookie to enable the feature to function properly.
          </p>
          <p>
            Social media features and widgets are either hosted by a third party or hosted directly on our website. Your interactions with these features are governed by the privacy policy of the company providing it.
          </p>
        </>
      ),
    },
    {
      title: '14. Student Testimonials and Photographs',
      content: (
        <>
          <p>
            We love sharing the success stories of our students. We may post testimonials, reviews, and photographs of students on our website and social media platforms. We obtain the user's consent prior to posting their name, testimonial, or photograph.
          </p>
          <p>
            If you wish to update or delete your testimonial or photograph, please contact us at {siteConfig.legal.email} and be sure to include your name, contact information, and the location of the testimonial or photograph on our platform.
          </p>
        </>
      ),
    },
    {
      title: '15. Changes to This Privacy Policy',
      content: (
        <>
          <p>
            We may update this privacy policy from time to time. The updated version will be indicated by an updated "Revised" date and the updated version will be effective as soon as it is accessible. We encourage you to review this privacy policy frequently to be informed of how we are protecting your information.
          </p>
          <p>
            If we make material changes to this privacy policy, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification.
          </p>
        </>
      ),
    },
    {
      title: '16. Grievance Redressal',
      content: (
        <>
          <p>
            In accordance with the Information Technology Act, 2000 and rules made there under, the name and contact details of the Grievance Officer are provided below. If you have any concerns or grievances regarding the processing of your personal information, please contact our Grievance Officer.
          </p>
          <p>
            Grievance Officer: {siteConfig.legal.grievanceContact} <br />
            Email: {siteConfig.legal.email} <br />
            Phone: {siteConfig.legal.phone} <br />
            Address: {siteConfig.legal.registeredAddress}
          </p>
        </>
      ),
    },
    {
      title: '17. Governing Law',
      content: (
        <>
          <p>
            This privacy policy shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or relating to this privacy policy or your use of the website shall be subject to the exclusive jurisdiction of the courts located in India.
          </p>
          <p>
            By using our website and services, you submit to the jurisdiction of such courts and waive any objections to the exercise of jurisdiction over you by such courts.
          </p>
        </>
      ),
    },
    {
      title: '18. Contact Us',
      content: (
        <>
          <p>
            If you have questions or comments about this privacy policy, you may email us at {siteConfig.legal.email} or by post to:
          </p>
          <p>
            {siteConfig.legal.legalEntity} <br />
            {siteConfig.legal.registeredAddress}
          </p>
          <p>
            Alternatively, you can reach us by phone at {siteConfig.legal.phone}.
          </p>
        </>
      ),
    },
  ]

  return (
    <LegalLayout title="Privacy Policy">
      {sections.map((section, idx) => (
        <section key={idx} id={`section-${idx + 1}`} className="space-y-4">
          <h2 className="font-heading text-xl font-bold text-navy">{section.title}</h2>
          <div className="space-y-4 text-studio/80">
            {section.content}
          </div>
        </section>
      ))}
    </LegalLayout>
  )
}
