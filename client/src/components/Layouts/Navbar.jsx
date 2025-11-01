import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";
import { useNavigate } from "react-router-dom";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between bg-white border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
      {/* Left: Mobile menu toggle */}
      <button
        className="block lg:hidden text-black"
        onClick={() => setOpenSideMenu(!openSideMenu)}
      >
        {openSideMenu ? <HiOutlineX size={22} /> : <HiOutlineMenu size={22} />}
      </button>

      {/* Center: Logo + Text (both clickable) */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-3 group"
      >
        <div className="w-10 h-10 bg-[#875cf5] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <span className="text-lg font-medium text-black group-hover:text-[#895bfc] transition-colors duration-200">
          Velto
        </span>
      </button>

      {/* Right: Mobile side menu */}
      {openSideMenu && (
        <div className="fixed top-[61px] left-0 w-full bg-white border-t border-gray-100 shadow-md z-20">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
