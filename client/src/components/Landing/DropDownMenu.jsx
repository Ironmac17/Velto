import React, { useState, useContext, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { ChevronDown } from "lucide-react";

const DropDownMenu = () => {
  const [open, setOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const menuRef = useRef();

  // Close dropdown when clicking outside
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
    setUser(null);
    localStorage.removeItem("token");
    navigate("/");
  };

  // ✅ Fix: use uploaded image from backend or fallback avatar
  const avatarUrl = user?.profileImageUrl
    ? user.profileImageUrl.startsWith("http")
      ? user.profileImageUrl
      : `${import.meta.env.VITE_BASE_URL}${user.profileImageUrl}`
    : "https://api.dicebear.com/7.x/avataaars/svg?seed=purpleUser";

  return (
    <div className="relative" ref={menuRef}>
      {/* Profile Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-[#f3ecff] transition"
      >
        <img
          src={avatarUrl}
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

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white border rounded-xl shadow-lg overflow-hidden">
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
