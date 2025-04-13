
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';

function PrivacyPolicy() {
  const lastUpdated = "April 10, 2025";

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <div className="flex-grow px-6 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Privacy Policy</h1>
          <p className="text-gray-500 mb-8">Last updated: {lastUpdated}</p>

          <div className="prose prose-blue max-w-none">
            <p>
              At Statify, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our task management application. Please read this Privacy Policy carefully.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
            <p>
              We collect several types of information from and about users of our application, including:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Personal Information:</strong> This includes your name, email address, and any other information you provide during registration or when using our services.</li>
              <li><strong>Task Information:</strong> The content of tasks you create, edit, and manage within the application.</li>
              <li><strong>Usage Information:</strong> Information about how you use our application, such as features accessed, time spent, and interactions.</li>
              <li><strong>Device Information:</strong> Information about your device, browser, IP address, and operating system.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Provide, maintain, and improve our services</li>
              <li>Process and complete transactions</li>
              <li>Send you technical notices, updates, security alerts, and support messages</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Develop new products and services</li>
              <li>Monitor and analyze trends, usage, and activities in connection with our services</li>
              <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
              <li>Protect the rights, property, and safety of our users and others</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">3. Data Security</h2>
            <p>
              We implement appropriate technical and organizational security measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction. All data is encrypted before being stored in our database, using industry-standard encryption algorithms.
            </p>
            <p>
              However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">4. Data Retention</h2>
            <p>
              We will retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, including to comply with our legal obligations, resolve disputes, and enforce our agreements.
            </p>
            <p>
              If you delete your account, we will delete or anonymize your personal information within 30 days, unless we are required to retain it for legal purposes.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">5. Your Rights and Choices</h2>
            <p>
              You have several rights regarding your personal information:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Access:</strong> You can request access to your personal information we hold.</li>
              <li><strong>Correction:</strong> You can request that we correct inaccurate or incomplete information.</li>
              <li><strong>Deletion:</strong> You can request that we delete your personal information.</li>
              <li><strong>Restriction:</strong> You can request that we restrict the processing of your information.</li>
              <li><strong>Data Portability:</strong> You can request a copy of your data in a structured, commonly used, and machine-readable format.</li>
              <li><strong>Objection:</strong> You can object to our processing of your personal information.</li>
            </ul>
            <p>
              To exercise these rights, please contact us using the information provided in the Contact Us section.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">6. Cookies and Similar Technologies</h2>
            <p>
              We use cookies and similar technologies to collect information about your browsing activities and to distinguish you from other users of our application. This helps us provide you with a good experience, improve our services, and personalize content.
            </p>
            <p>
              You can set your browser to refuse all or some browser cookies, or to alert you when cookies are being sent. However, if you disable or refuse cookies, some parts of our application may not function properly.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">7. Third-Party Services</h2>
            <p>
              Our application may contain links to third-party websites or services that are not owned or controlled by Statify. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services.
            </p>
            <p>
              We encourage you to review the privacy policies of any third-party websites or services that you visit.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">8. Childrens Privacy</h2>
            <p>
              Our application is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we learn we have collected or received personal information from a child under 13 without verification of parental consent, we will delete that information. If you believe we might have any information from or about a child under 13, please contact us immediately.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">9. International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than the country in which you reside. These countries may have data protection laws that are different from the laws of your country.
            </p>
            <p>
              However, we have taken appropriate safeguards to ensure that your personal information remains protected in accordance with this Privacy Policy. These safeguards include implementing standard data protection clauses and ensuring that recipients of your personal information are bound by confidentiality obligations.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">10. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. Any changes will be posted on this page with a revised Last updated date. If we make material changes to how we treat our users personal information, we will notify you through a notice on our application.
            </p>
            <p>
              We encourage you to review this Privacy Policy periodically for any changes. Your continued use of our application after we post any modifications to the Privacy Policy will constitute your acknowledgment of the modifications and your consent to abide and be bound by the modified Privacy Policy.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">11. Contact Us</h2>
            <p>
              If you have any questions or concerns about this Privacy Policy or our privacy practices, please contact us at:
            </p>
            <p className="mb-1">Email: privacy@statify.com</p>
            <p className="mb-4">
              You can also reach us through our <Link to="/contact" className="text-blue-500 hover:underline">Contact Page</Link>.
            </p>
            <p>
              If you have an unresolved privacy or data use concern that we have not addressed satisfactorily, please contact your local data protection authority.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default PrivacyPolicy;