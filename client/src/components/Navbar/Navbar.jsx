import React, { useState, useRef, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const {
    isLoggedIn,
    setShowAuth,
    userData,
    axios,
    setIsLoggedIn,
    setUserData,
    navigate,
  } = useAppContext();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  //Logout Handler
  const handleLogout = async () => {
    try {
      //Logout API call
      const { data } = await axios.post("/api/auth/logout");
      if (data.success) {
        //Reset all field to initial
        setDropdownOpen(false);
        toast.success(data.message);
        setIsLoggedIn(false);
        setUserData(null);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <header className="px-4 py-1 bg-slate-50/10 shadow-md border-b border-slate-900/10">
      <nav className="max-w-6xl mx-auto flex items-center justify-between rounded-full px-6 py-1 relative">
        {/* Logo */}
        <div className="text-2xl lg:text-3xl font-bold text-[#1e293b] w-12 h-12 flex items-center gap-2">
          <span className="md:block hidden">Todo</span>
          <img
            onClick={() => navigate("/")}
            src="/favicon.png"
            alt="TodoMERN"
            className="w-full h-full object-cover cursor-pointer"
          />
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4 relative" ref={dropdownRef}>
          {/* Profile avatar */}
          {isLoggedIn && (
            <button
              className="w-10 h-10 rounded-full overflow-hidden border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
              onClick={() => setDropdownOpen((prev) => !prev)}
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
            >
              <img
                src={userData.avatar}
                alt="User Avatar"
                className="w-full h-full object-cover cursor-pointer"
              />
            </button>
          )}

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg text-md text-gray-700 z-20">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-orange-100 transition cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}

          {/* Login Button */}
          {!isLoggedIn ? (
            <button
              // Show Auth form on click
              onClick={() => setShowAuth(true)}
              className="bg-orange-500 hover:bg-orange-600 cursor-pointer text-white px-5 py-2 rounded-full transition duration-200 whitespace-nowrap"
            >
              Sign In
            </button>
          ) : (
            <button onClick={() => navigate('/todos')} className="bg-orange-500 hover:bg-orange-600 cursor-pointer text-white px-5 py-2 rounded-full transition duration-200 whitespace-nowrap">
              My Todos
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
