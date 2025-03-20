import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from "axios";
function Register() {

  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:1000/api/v1/register",values);
      console.log(res.data);
      navigate("/login");
    } catch (error) {
      alert(error.response.data.error);
    }
    // Handle the form submission logic
    //console.log(values);
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="w-[60vw] md:w-[50vw] lg:w-[30vw]">
        <h1 className="text-3xl font-bold text-center mb-1 text-blue-800">
          Statify
        </h1>
        <h3 className="text-center font-semibold text-zinc-900">
          Register with Statify
        </h3>
        <div className="w-[60vw] md:w-[50vw] lg:w-[30vw] mt-4">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              required
              placeholder="Username"
              className="border rounded px-4 py-1 border-zinc-400 w-[100%] outline-none"
              value={values.username}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              required
              placeholder="Gmail"
              className="border rounded px-4 py-1 border-zinc-400 w-[100%] outline-none"
              value={values.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              required
              placeholder="Password"
              className="border rounded px-4 py-1 border-zinc-400 w-[100%] outline-none"
              value={values.password}
              onChange={handleChange}
            />
            <button

              type="submit"
              className="bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-700 transition-all duration-300">
              Register
            </button>
            <p className="text-center font-semibold text-gray-900">
              Already have an account? <Link className="text-blue-500" to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
