import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';


function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="font-bold text-gray-800 text-lg mb-3">TaskMaster</h3>
            <p className="text-gray-600 text-sm">
              Organize your tasks efficiently and boost your productivity with our intuitive task management solution.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="font-medium text-gray-800 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/dashboard" className="text-gray-600 hover:text-blue-600 text-sm">Dashboard</Link></li>
              <li><Link to="/profile" className="text-gray-600 hover:text-blue-600 text-sm">Profile</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-span-1">
            <h4 className="font-medium text-gray-800 mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link to="/faq" className="text-gray-600 hover:text-blue-600 text-sm">FAQ</Link></li>
              <li><Link to="/contact-us" className="text-gray-600 hover:text-blue-600 text-sm">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h4 className="font-medium text-gray-800 mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <FaGithub size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-500">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-700">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-8 pt-6">
          <div className="flex flex-col md:flex-row md:justify-between items-center">
            <p className="text-sm text-gray-500">
              © {currentYear} TaskMaster. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/terms-Of-service" className="text-sm text-gray-500 hover:text-gray-700" >Terms of Service</Link>
              <Link to="/privacy-policy" className="text-sm text-gray-500 hover:text-gray-700">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;