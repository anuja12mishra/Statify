import PropTypes from "prop-types";
import { IoMailUnreadOutline } from "react-icons/io5";
import axios from "axios";

function ResendEmailModal({ setShowResend }) {
  const handleResend = async () => {
    try {
      const res = await axios.post(
        "http://localhost:1000/api/v1/resend-verification-email",
        {},
        { withCredentials: true }
      );
      alert(res.data.message);
      setShowResend(false);
    } catch (err) {
      console.error("Error resending email:", err);
      alert("Error resending email verification link.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden transform transition-all">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6">
          <div className="flex items-center">
            <div className="bg-white p-2 rounded-full mr-4">
              <IoMailUnreadOutline className="text-blue-600 text-2xl" />
            </div>
            <h2 className="text-white text-xl font-bold">Resend Email Verification</h2>
          </div>
        </div>
        
        <div className="p-6">
          <p className="text-gray-600 mb-6">
            Click the button below to resend your verification email. 
            This will send a new link to your registered email address.
          </p>
          
          <div className="flex flex-col space-y-3">
            <button
              onClick={handleResend}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-md font-medium hover:from-blue-600 hover:to-blue-800 transition-all duration-300 shadow-md flex items-center justify-center"
            >
              <IoMailUnreadOutline className="mr-2" />
              Resend Verification Email
            </button>
            
            <button
              onClick={() => setShowResend(false)}
              className="w-full py-3 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-100 transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

ResendEmailModal.propTypes = {
  setShowResend: PropTypes.func.isRequired,
};

export default ResendEmailModal;