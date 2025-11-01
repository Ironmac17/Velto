import React, { useState, useContext, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { ChevronDown } from "lucide-react";

const DropDownMenu = () => {
  const [open, setOpen] = useState(false);
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  const menuRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    clearUser();
    navigate("/");
  };

  const profileImage =
    user?.profileImageUrl ||
    "https://api.dicebear.com/7.x/avataaars/svg?seed=purpleUser";

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-[#f3ecff] transition"
      >
        <img
          src={profileImage}
          alt="profile"
          className="w-9 h-9 rounded-full border-2 border-[#c2a8ff] hover:scale-105 transition-transform duration-200 object-cover"
        />
        <ChevronDown
          size={16}
          className={`text-white transition-transform duration-300 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white border rounded-xl shadow-lg overflow-hidden z-50">
          <button
            onClick={() => {
              navigate("/dashboard");
              setOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-[#f5f3ff]"
          >
            Dashboard
          </button>
          <button
            onClick={() => {
              navigate("/profile");
              setOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-[#f5f3ff]"
          >
            Profile
          </button>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default DropDownMenu;
