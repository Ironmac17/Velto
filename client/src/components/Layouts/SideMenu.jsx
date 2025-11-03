import React, { useContext } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import CharAvatar from "../Cards/CharAvatar";
import {LuCircleUser} from "react-icons/lu";

// Get base URL from env or fallback to localhost
const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:8000";

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = (item) => {
    if (item.action === "logout") {
      clearUser();
      localStorage.removeItem("token");
      navigate("/", { replace: true });
    } else {
      navigate(item.path);
    }
  };

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-10">
      {/* Profile Button */}
      <div
        onClick={() => navigate("/profile")}
        className="flex flex-col items-center justify-center gap-3 mt-3 mb-7 border-2 border-purple-500 rounded-2xl p-4 shadow-sm hover:shadow-md hover:scale-[1.03] transition-all cursor-pointer"
      >
        {user?.profileImageUrl ? (
          <img
            src={`${BASE_URL}${user.profileImageUrl}`}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border border-gray-200"
            onError={(e) => {
              e.target.src = "/default-avatar.png";
            }}
          />
        ) : (
          <CharAvatar
            fullName={user?.fullName}
            width="w-20"
            height="h-20"
            className="text-xl"
          />
        )}

        <div className="flex items-center gap-2 text-purple-700 font-semibold">
          <LuCircleUser size={18} />
          <h5 className="leading-6 truncate max-w-[140px]">
            {user?.fullName || "Your Profile"}
          </h5>
        </div>
      </div>

      {/* Menu Items */}
      {SIDE_MENU_DATA.map((item, index) => (
        <button
          key={index}
          onClick={() => handleClick(item)}
          className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 transition-all
            ${
              activeMenu === item.label
                ? "text-white bg-purple-600"
                : "text-gray-700 hover:bg-gray-100"
            }`}
        >
          <item.icon className="text-xl" />
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default SideMenu;
