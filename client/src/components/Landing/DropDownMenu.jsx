import React, { useState, useContext, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { ChevronDown } from "lucide-react";

const DropDownMenu = () => {
  const [open, setOpen] = useState(false);
  const { setUser } = useContext(UserContext);
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

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1 bg-[#f5f3ff] px-3 py-2 rounded-lg font-medium text-gray-700 hover:bg-[#ece6ff] transition"
      >
        Account <ChevronDown size={18} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-xl shadow-lg overflow-hidden">
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
