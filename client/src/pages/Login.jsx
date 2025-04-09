import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { IoEyeOff, IoEye } from "react-icons/io5"; // 👁️ Icons for toggle

function Login() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false); // 👁️ state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:1000/api/v1/login",
        values,
        { withCredentials: true }
      );
      console.log(res.data);
      alert("Login successful!");
      localStorage.setItem("userLoggedIn", "Yes");
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.error || "Login failed. Try again.");
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="w-[60vw] md:w-[50vw] lg:w-[30vw]">
        <h1 className="text-3xl font-bold text-center mb-1 text-blue-800">Statify</h1>
        <h3 className="text-center font-semibold text-gray-900">Login with Statify</h3>
        <div className="w-[60vw] md:w-[50vw] lg:w-[30vw] mt-4">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              required
              placeholder="Username"
              className="border rounded px-4 py-1 border-zinc-400 w-full outline-none"
              value={values.username}
              onChange={handleChange}
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} // 👁️ toggle type
                name="password"
                required
                placeholder="Password"
                className="border rounded px-4 py-1 pr-10 border-zinc-400 w-full outline-none"
                value={values.password}
                onChange={handleChange}
              />
              <span
                className="absolute right-3 top-2.5 cursor-pointer text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)} // 👁️ toggle
              >
                {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
              </span>
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-700 transition-all duration-300"
            >
              Login
            </button>
            <p className="text-center font-semibold text-gray-900">
              Do not have an account?{" "}
              <Link className="text-blue-500" to="/register">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
