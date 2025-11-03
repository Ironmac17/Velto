import React, { useContext } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import CharAvatar from "../Cards/CharAvatar";

// If you have a BASE_URL config, import it
// Or just set it here directly for localhost
const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:8000";

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = (item) => {
    if (item.action === "logout") {
      clearUser();
      localStorage.removeItem("token");
      navigate("/", { replace: true });
      return;
    }
    navigate(item.path);
  };

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-10">
      <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
        {user?.profileImageUrl ? (
          <img
            src={`${BASE_URL}${user.profileImageUrl}`}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border border-gray-200 shadow-sm"
            onError={(e) => {
              e.target.src = "/default-avatar.png"; // fallback
            }}
          />
        ) : (
          <CharAvatar
            fullName={user?.fullName}
            width="w-20"
            height="h-20"
            style="text-xl"
          />
        )}
        <h5 className="text-gray-950 font-medium leading-6">
          {user?.fullName || ""}
        </h5>
      </div>

      {SIDE_MENU_DATA.map((item, index) => (
        <button
          key={`menu_${index}`}
          className={`w-full flex items-center gap-4 text-[15px] ${
            activeMenu === item.label ? "text-white bg-primary" : "text-gray-700 hover:bg-gray-100"
          } py-3 px-6 rounded-lg mb-3 transition`}
          onClick={() => handleClick(item)}
        >
          <item.icon className="text-xl" />
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default SideMenu;
