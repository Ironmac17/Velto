import React from "react";

const StatCard = ({ title, value, hint }) => {
  return (
    <div className="bg-gray-50 rounded-xl p-4 border hover:shadow-sm transition">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-xl font-semibold mt-1">{value}</div>
      {hint && <div className="text-xs text-gray-400 mt-1">{hint}</div>}
    </div>
  );
};

export default StatCard;
