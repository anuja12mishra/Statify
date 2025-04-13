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
  
        const res = await axios.get(`http://localhost:1000/api/v1/verify-email/${userId}/${token}`, {
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 m-4 bg-white rounded-lg shadow-md">
        {status === "pending" && (
          <div className="text-center">
            <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-700">{message}</h2>
          </div>
        )}
        
        {status === "success" && (
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-700">{message}</h2>
            <p className="mt-2 text-gray-500">Redirecting to dashboard in 5 seconds...</p>
            <button 
              onClick={() => navigate("/dashboard")} 
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Go to Dashboard Now
            </button>
          </div>
        )}
        
        {status === "error" && (
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <svg className="w-16 h-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-red-600">{message}</h2>
            <div className="mt-4 flex justify-center gap-4">
              <button 
                onClick={() => navigate("/login")} 
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Go to Login
              </button>
              <button 
                onClick={() => window.location.reload()} 
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-100 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        <div className="mt-6 text-sm text-gray-500">
          <p>User ID: {userId}</p>
          <p>Token: {token && `${token.substring(0, 10)}...`}</p>
        </div>
      </div>
    </div>
  );
};

export default EmailVerifier;