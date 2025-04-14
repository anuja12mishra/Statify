import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const EmailVerifier = () => {
  const { userId, token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("pending"); // pending, success, error
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        if (!userId || !token) {
          setStatus("error");
          setMessage("Invalid verification link");
          return;
        }
  
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/verify-email/${userId}/${token}`, {
          withCredentials: true,
        });
  
        // Access response data properly
        setStatus(res.data.success ? "success" : "error");
        setMessage(res.data.message);
  
        // Only navigate if successful
        if (res.data.success) {
          const timeout = setTimeout(() => {navigate("/dashboard")}, 5000);
          return () => clearTimeout(timeout); // clean up
        }
      } catch (err) {
        setStatus("error");
        setMessage(err.response?.data?.message || "Verification failed. Please try again or contact support.");
      }
    };
  
    verifyEmail();
  }, [userId, token, navigate]);
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md p-0 m-4 bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white text-center">
          <h1 className="text-2xl font-bold">Email Verification</h1>
        </div>
        
        <div className="p-8">
          {status === "pending" && (
            <div className="text-center">
              <div className="inline-block w-16 h-16 mb-6">
                <svg className="animate-spin w-full h-full text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800">{message}</h2>
              <p className="mt-3 text-gray-500">Please wait while we verify your account</p>
            </div>
          )}
          
          {status === "success" && (
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              </div>
              <h2 className="text-xl font-semibold text-gray-800">{message}</h2>
              <p className="mt-3 text-gray-500">Redirecting to dashboard in 5 seconds...</p>
              <button 
                onClick={() => navigate("/dashboard")} 
                className="mt-6 w-full py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-md font-medium hover:from-blue-600 hover:to-blue-800 transition-all duration-300 shadow-md"
              >
                Go to Dashboard Now
              </button>
            </div>
          )}
          
          {status === "error" && (
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </div>
              </div>
              <h2 className="text-xl font-semibold text-red-600">{message}</h2>
              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                <button 
                  onClick={() => navigate("/login")} 
                  className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-md font-medium hover:from-blue-600 hover:to-blue-800 transition-all duration-300 shadow-md"
                >
                  Go to Login
                </button>
                <button 
                  onClick={() => window.location.reload()} 
                  className="w-full py-3 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-100 transition-all duration-300"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {(userId || token) && (
            <div className="mt-8 p-4 bg-gray-50 rounded-lg text-xs text-gray-500 break-all">
              {userId && <p className="mb-1"><span className="font-semibold">User ID:</span> {userId}</p>}
              {token && (
                <p><span className="font-semibold">Token:</span> {token.substring(0, 10)}...</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailVerifier;