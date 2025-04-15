import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoEyeOff, IoEye } from "react-icons/io5";

function ResetPassword() {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try{
        const res = axios.post(`${import.meta.env.VITE_BASE_URL}/reset/send-reset-otp`,{ withCredentials: true,})
        console.log(res);
      }catch(err){
        alert(err);
      }
    }
    fetchUserProfile();
}, []);

  const [values, setValues] = useState({
    otp: "",
    newPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setError(""); // Clear error when user types
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword({
      ...showPassword,
      [field]: !showPassword[field],
    });
  };

  const validateForm = () => {
    if (!values.otp || values.otp.length < 6) {
      setError("Please enter a valid OTP");
      return false;
    }
    
    if (!values.newPassword || values.newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }
    
    if (values.newPassword !== values.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/reset/verify-reset-otp`,
        values,
        { withCredentials: true }
      );
      console.log(res.data);
      alert("Password reset successful!");
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.error || "Password reset failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="w-[90vw] max-w-md px-8 py-10 bg-white rounded-2xl shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-2 text-blue-600">Statify</h1>
        <h3 className="text-center text-lg mb-6 text-gray-600">Reset Password</h3>
        
        {error && (
          <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg mb-5">
            {error}
          </div>
        )}
        
        <div className="w-full">
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="group">
              <label className="text-sm font-medium text-gray-700 mb-1 block">OTP Code</label>
              <input
                type="text"
                name="otp"
                required
                placeholder="Enter the OTP sent to your email"
                className="border rounded-lg px-4 py-3 border-gray-300 w-full outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={values.otp}
                onChange={handleChange}
              />
            </div>
            
            <div className="group">
              <label className="text-sm font-medium text-gray-700 mb-1 block">New Password</label>
              <div className="relative">
                <input
                  type={showPassword.newPassword ? "text" : "password"}
                  name="newPassword"
                  required
                  placeholder="Enter your new password"
                  className="border rounded-lg px-4 py-3 pr-10 border-gray-300 w-full outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={values.newPassword}
                  onChange={handleChange}
                />
                <span
                  className="absolute right-3 top-3.5 cursor-pointer text-gray-500 hover:text-gray-700"
                  onClick={() => togglePasswordVisibility("newPassword")}
                >
                  {showPassword.newPassword ? (
                    <IoEyeOff size={20} />
                  ) : (
                    <IoEye size={20} />
                  )}
                </span>
              </div>
            </div>

            <div className="group">
              <label className="text-sm font-medium text-gray-700 mb-1 block">Confirm Password</label>
              <div className="relative">
                <input
                  type={showPassword.confirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  required
                  placeholder="Confirm your new password"
                  className="border rounded-lg px-4 py-3 pr-10 border-gray-300 w-full outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={values.confirmPassword}
                  onChange={handleChange}
                />
                <span
                  className="absolute right-3 top-3.5 cursor-pointer text-gray-500 hover:text-gray-700"
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                >
                  {showPassword.confirmPassword ? (
                    <IoEyeOff size={20} />
                  ) : (
                    <IoEye size={20} />
                  )}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className={`bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-sm mt-2 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Processing..." : "Reset Password"}
            </button>
            
            <p className="text-center text-gray-600 mt-2">
              Remember your password?{" "}
              <a href="/login" className="text-blue-600 font-medium hover:underline">
                Login
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;