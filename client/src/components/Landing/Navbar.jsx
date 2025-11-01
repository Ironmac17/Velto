import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import DropDownMenu from "./DropDownMenu";

const Navbar = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <nav
      className="fixed top-3 left-1/2 -translate-x-1/2 z-50
                 w-[90%] md:w-[80%] lg:w-[90%]
                 bg-[#895bfc] shadow-[0_4px_25px_rgba(137,91,252,0.35)]
                 rounded-2xl border border-[#a884ff]/40
                 px-3 md:px-8 py-2 flex items-center justify-between transition-all duration-300"
    >
      {/* App Name */}
      <div
        onClick={() => navigate("/")}
        className="text-2xl font-bold text-white cursor-pointer select-none hover:scale-[1.05] transition-transform duration-200"
      >
        Velto
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-5">
        {!user ? (
          <>
            <Link
              to="/login"
              className="text-white/90 font-medium px-3 py-1.5 rounded-md
                         hover:bg-[#9f78ff] hover:shadow-[0_0_10px_rgba(159,120,255,0.4)]
                         hover:text-white transition-all duration-200"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-white text-[#895bfc] px-4 py-2 rounded-lg font-semibold 
                         hover:bg-[#7445f0] hover:text-white 
                         shadow-[0_2px_10px_rgba(137,91,252,0.4)]
                         transition-all duration-200"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <DropDownMenu />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
