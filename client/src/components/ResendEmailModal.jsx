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
    <div className="bg-white rounded px-4 sm:px-6 py-4 sm:py-6 w-full sm:w-[70%] md:w-[50%] lg:w-[40%] mx-auto">
      <h1 className="text-center font-semibold text-xl sm:text-2xl lg:text-3xl">Resend Email</h1>
      <hr className="mb-4 mt-2" />
      <p className="text-center text-gray-600 mb-4">Click the button below to resend your verification email.</p>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          className="flex items-center justify-center gap-2 px-4 py-2 w-full bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={handleResend}
        >
          <IoMailUnreadOutline size={20} />
          Resend Verification Email
        </button>
        <button
          onClick={() => setShowResend(false)}
          className="text-center w-full bg-red-800 py-2 hover:bg-red-700 transition-all duration-300 text-white rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

ResendEmailModal.propTypes = {
  setShowResend: PropTypes.func.isRequired,
};

export default ResendEmailModal;
