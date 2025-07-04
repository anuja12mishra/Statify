import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { IoEye, IoEyeOff } from "react-icons/io5";
import {showToast} from '../helper/showTost';

function Register() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/register`, values);
      //console.log(res.data);

      if(!res.status === 400){
        showToast('error',res.data)
      }
      if(res.status === 201){
        showToast('success',res.message);
        showToast('info','A email verification link is sent to you email');
      }

      navigate("/redirect");
    } catch (error) {

      showToast('error',error.response?.data?.error || "Registration failed.");
      //alert(error.response?.data?.error || "Registration failed.");

    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="w-[90vw] max-w-md px-8 py-10 bg-white rounded-2xl shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-2 text-blue-600">
          Statify
        </h1>
        <h3 className="text-center text-lg mb-6 text-gray-600">
          Create your account
        </h3>
        <div className="w-full">
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="group">
              <label className="text-sm font-medium text-gray-700 mb-1 block">Username</label>
              <input
                type="text"
                name="username"
                required
                placeholder="Enter your username"
                className="border rounded-lg px-4 py-3 border-gray-300 w-full outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={values.username}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
            
            <div className="group">
              <label className="text-sm font-medium text-gray-700 mb-1 block">Email</label>
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                className="border rounded-lg px-4 py-3 border-gray-300 w-full outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={values.email}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            <div className="group">
              <label className="text-sm font-medium text-gray-700 mb-1 block">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="Create a password"
                  className="border rounded-lg px-4 py-3 pr-10 border-gray-300 w-full outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={values.password}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                <span
                  className="absolute right-3 top-3.5 cursor-pointer text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-sm mt-2 flex justify-center items-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Registering...
                </>
              ) : (
                "Register"
              )}
            </button>
            <p className="text-center text-gray-600 mt-2">
              Already have an account?{" "}
              <Link className="text-blue-600 font-medium hover:underline" to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;