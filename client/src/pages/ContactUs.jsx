import { useEffect } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ContactUs() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const checkIsAuthorize = async () => {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/check/isAuthorize`, {
        withCredentials: true,
      });
      if(res.status != 200){
        navigate("/login");
      }
    }
    checkIsAuthorize();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <div className="flex-grow px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Contact Us</h1>
            <p className="text-gray-600 mb-8">Have questions or need assistance? Connect with the developer directly.</p>

            <div className="flex flex-col space-y-6">
              {/* Developer Contact Links */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-100 rounded-lg p-3">
                    <svg className="w-6 h-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-800">LinkedIn</h3>
                    <p className="mt-1 text-gray-600">Connect with our developer on LinkedIn</p>
                    <a href="https://www.linkedin.com/in/anuja-mishra-1193a2245/" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-blue-500 hover:underline">linkedin.com/in/anuja-mishra-1193a2245</a>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-100 rounded-lg p-3">
                    <svg className="w-6 h-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-800">GitHub</h3>
                    <p className="mt-1 text-gray-600">Report issues or contribute to the project</p>
                    <a href="https://github.com/anuja12mishra" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-blue-500 hover:underline">github.com/anuja12mishra</a>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700 text-center">
                  Thank you for using our application. For any issues or feature requests, 
                  please use the GitHub repositorys issue tracker.
                </p>
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