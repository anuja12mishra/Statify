import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';

function TermsOfService() {
  const lastUpdated = "April 10, 2025";

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <div className="flex-grow px-6 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Terms of Service</h1>
          <p className="text-gray-500 mb-8">Last updated: {lastUpdated}</p>

          <div className="prose prose-blue max-w-none">
            <p>
              Welcome to Statify! These Terms of Service (Terms) govern your access to and use of our task management application and services. Please read these Terms carefully before using Statify.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing or using Statify, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you may not access or use Statify.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">2. Description of Service</h2>
            <p>
              Statify is a task management application that allows users to create, edit, organize, and manage tasks. The service includes features such as task creation, editing, prioritization, and tracking.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">3. Account Registration and Security</h2>
            <p>
              To use Statify, you must create an account by providing accurate and complete information. You are responsible for maintaining the security of your account and password. Statify cannot and will not be liable for any loss or damage resulting from your failure to comply with this security obligation.
            </p>
            <p>
              You are responsible for all activities that occur under your account. You must immediately notify Statify of any unauthorized use of your account or any other breach of security.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">4. User Content</h2>
            <p>
              You retain ownership of any content you submit, post, or display on or through Statify (User Content). By submitting User Content to Statify, you grant Statify a worldwide, non-exclusive, royalty-free license to use, reproduce, process, and display your User Content solely for the purpose of providing the Service to you.
            </p>
            <p>
              You represent and warrant that you have all necessary rights, power, and authority to grant the rights conveyed by these Terms. You also represent and warrant that your User Content will not infringe, misappropriate, or violate any third partys intellectual property rights or rights of publicity or privacy.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">5. Data Privacy and Security</h2>
            <p>
              We take data privacy and security seriously. All user data is encrypted and stored securely in our database. Please refer to our <Link to="/privacy-policy" className="text-blue-500 hover:underline">Privacy Policy</Link> for details on how we collect, use, and disclose information.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">6. Prohibited Conduct</h2>
            <p>
              You agree not to:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Use Statify for any illegal purpose or in violation of any laws</li>
              <li>Violate or infringe other peoples intellectual property, privacy, or other rights</li>
              <li>Interfere with or disrupt the Service or servers or networks connected to the Service</li>
              <li>Attempt to gain unauthorized access to the Service, user accounts, or computer systems</li>
              <li>Transmit any viruses, malware, or other harmful code</li>
              <li>Engage in automated use of the system, such as using scripts to send messages or posts</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">7. Termination</h2>
            <p>
              We may terminate or suspend your account and access to Statify at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users of Statify, us, or third parties, or for any other reason.
            </p>
            <p>
              You may terminate your account at any time by following the instructions on the Statify Settings page. Upon termination, your right to use Statify will immediately cease.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">8. Limitation of Liability</h2>
            <p>
              In no event shall Statify, its officers, directors, employees, or agents, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use, or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence), or any other legal theory, whether or not we have been informed of the possibility of such damage.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">9. Changes to Terms</h2>
            <p>
              We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
            <p>
              By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">10. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please <Link to="/contact" className="text-blue-500 hover:underline">contact us</Link>.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default TermsOfService;