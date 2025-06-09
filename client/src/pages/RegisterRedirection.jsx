import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterRedirection() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10); // Initial countdown time

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    setTimeout(() => {
      navigate("/login"); // Redirect after countdown ends
    }, countdown * 1000);

    return () => clearInterval(timer); // Cleanup the interval when component unmounts
  }, [countdown, navigate]);

  return (
    <div className="w-full bg-white h-screen p-[30px] flex justify-center flex-col text-center">
      <p className="text-4xl text-blue-600 font-bold">Statify</p>
      <p className="text-2xl">
        An email verification mail has been sent to your email.
      </p>
      <p className="text-lg text-gray-600 mt-4">
        Redirecting in <span className="font-bold">{countdown}</span> seconds...
      </p>
    </div>
  );
}

export default RegisterRedirection;