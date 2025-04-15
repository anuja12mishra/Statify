import { useEffect, useState } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function ContactUs() {
  const navigate = useNavigate();
  useEffect(() => {
    const checkIsAuthorize = async ()=>{
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/check/isAuthorize`,{
        withCredentials: true,
      });
      if(res.status != 200){
        navigate("/login");
      }
    }
    checkIsAuthorize();
  }, [])
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');

    // Simulate API call
    setTimeout(() => {
      setFormStatus('success');
      // Reset form after success
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <div className="flex-grow px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Contact Us</h1>
            <p className="text-gray-600 mb-8">Have questions or feedback? Wed love to hear from you!</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Form */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Send us a message</h2>
                
                {formStatus === 'success' ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                    <svg className="w-12 h-12 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Thank you for reaching out!</h3>
                    <p className="text-gray-600">Weve received your message and will get back to you as soon as possible.</p>
                    <button 
                      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                      onClick={() => setFormStatus(null)}
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      ></textarea>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition flex justify-center items-center"
                        disabled={formStatus === 'submitting'}
                      >
                        {formStatus === 'submitting' ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          'Send Message'
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Other ways to reach us</h2>
                
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-blue-100 rounded-lg p-3">
                        <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-800">Email</h3>
                        <p className="mt-1 text-gray-600">support@statify.com</p>
                        <p className="mt-1 text-gray-600">info@statify.com</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-blue-100 rounded-lg p-3">
                        <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-800">Support Hours</h3>
                        <p className="mt-1 text-gray-600">Monday to Friday: 9AM - 5PM</p>
                        <p className="mt-1 text-gray-600">Saturday: 10AM - 2PM</p>
                        <p className="mt-1 text-gray-600">Sunday: Closed</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-blue-100 rounded-lg p-3">
                        <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-800">FAQ</h3>
                        <p className="mt-1 text-gray-600">Check our <a href="/faq" className="text-blue-500 hover:underline">Frequently Asked Questions</a> for quick answers to common queries.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ContactUs;