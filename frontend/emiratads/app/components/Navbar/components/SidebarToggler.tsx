"use client";

import React from "react";

interface SidebarTogglerProps {
  onClick: () => void;
  isToggled: boolean;
}

const SidebarToggler: React.FC<SidebarTogglerProps> = ({ onClick, isToggled }) => {
  return (
    <button
      onClick={onClick}
      className="relative flex flex-col justify-between w-5 h-4 cursor-pointer text-white focus:outline-none"
    >
      <div
        className={`w-full h-0.5 bg-white rounded transform transition-all duration-300 ease-in-out ${
          isToggled ? "rotate-45 translate-y-1.5" : "rotate-0 translate-y-0"
        }`}
      ></div>
      <div
        className={`w-full h-0.5 bg-white rounded transition-all duration-300 ease-in-out ${
          isToggled ? "opacity-0" : "opacity-100"
        }`}
      ></div>
      <div
        className={`w-full h-0.5 bg-white rounded transform transition-all duration-300 ease-in-out ${
          isToggled ? "rotate-135 -translate-y-2" : "rotate-0 translate-y-0"
        }`}
      ></div>
    </button>
  );
};

export default SidebarToggler;