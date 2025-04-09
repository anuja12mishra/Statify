import { IoLogOutOutline, IoMailUnreadOutline, IoEllipsisVertical } from "react-icons/io5";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ResendEmailModal from "./ResendEmailModal";

const Header = ({ setAddTaskDiv }) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showResend, setShowResend] = useState(false);

  const logout = async () => {
    try {
      const res = await axios.post(
        "http://localhost:1000/api/v1/logout",
        {},
        { withCredentials: true }
      );
      alert(res.data.message);
      localStorage.removeItem("userLoggedIn");
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
      navigate("/login");
    }
  };

  return (
    <>
      <div className="px-6 py-4 border-b relative">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl text-blue-800 font-semibold">Statify</h1>
          <div className="flex gap-6 items-center">
            <button
              className="hover:text-blue-800 transition-all duration-300"
              onClick={() => setAddTaskDiv("block")}
            >
              Add Task
            </button>

            {/* Dropdown icon */}
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="text-blue-800 hover:text-blue-600 transition-all"
              >
                <IoEllipsisVertical size={20} />
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 bg-white border rounded shadow-md z-10 w-48">
                  <button
                    onClick={() => {
                      setShowResend(true);
                      setShowDropdown(false);
                    }}
                    className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100"
                  >
                    <IoMailUnreadOutline /> Resend Email
                  </button>
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 px-4 py-2 w-full text-red-600 hover:bg-gray-100"
                  >
                    <IoLogOutOutline /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Wrapper */}
      {showResend && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <ResendEmailModal setShowResend={setShowResend} />
        </div>
      )}
    </>
  );
};

Header.propTypes = {
  setAddTaskDiv: PropTypes.func.isRequired,
};

export default Header;
