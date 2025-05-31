import { IoLogOutOutline, IoMailUnreadOutline, IoEllipsisVertical } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { MdOutlineDashboard } from "react-icons/md";
import PropTypes from "prop-types";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import ResendEmailModal from "./ResendEmailModal";
import { useEffect, useRef } from "react";
import { showToast } from "../helper/showTost";

const Header = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showResend, setShowResend] = useState(false);
  const dropdownRef = useRef(null);

  const logout = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/logout`,
        {},
        { withCredentials: true }
      );
      document.cookie = "statiyUserToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      showToast('success',res.data.message)
      //alert(res.data.message);
      localStorage.removeItem("userLoggedIn");
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
      navigate("/login");
    }
  };

  // Effect to close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="px-6 py-4 relative">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl text-blue-600 font-bold">Statify</h1>
          <div className="flex gap-4 items-center">



            {/* <button
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium py-2 px-4 rounded-lg hover:bg-blue-50 transition-all duration-200"
              onClick={() => setAddTaskDiv(true)}
            >
              <IoAddCircleOutline size={20} />
              <span className="hidden md:inline">Add Task</span>
            </button> */}



            {/* Dropdown icon */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="text-gray-600 hover:text-blue-600 transition-all p-2 rounded-full hover:bg-gray-100"
              >
                <IoEllipsisVertical size={20} />
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg z-10 w-48 py-1 animate-fadeIn">
                  <button
                    onClick={() => {
                      setShowResend(true);
                      setShowDropdown(false);
                    }}
                    className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-50 text-gray-700"
                  >
                    <IoMailUnreadOutline size={18} /> Resend Email
                  </button>
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-50 text-gray-700"
                  >
                    <CgProfile size={18} /> Profile
                  </Link>
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-50 text-gray-700"
                  >
                    {/* <CgProfile size={18} />  */}
                    <MdOutlineDashboard size={18}/>Dashboard
                  </Link>
                  <div className="h-px w-full bg-gray-100 my-1"></div>
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 px-4 py-2 w-full text-red-600 hover:bg-red-50"
                  >
                    <IoLogOutOutline size={18} /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Wrapper */}
      {showResend && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
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