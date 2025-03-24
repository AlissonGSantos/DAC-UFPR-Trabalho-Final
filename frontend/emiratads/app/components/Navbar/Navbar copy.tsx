"use client";

import React from "react";
import { useNavbar } from "./useNavbar";
import Shortcut from "./components/Shortcut";
import SidebarToggler from "./components/SidebarToggler";

interface NavbarProps {
  children?: React.ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({ children }) => {
  const { isOpen, toggle, shortcuts } = useNavbar();

  return (
    <div className="relative flex">
      {/* SIDEBAR */}
      {isOpen && (
      <div
        className={`fixed top-0 left-0 w-full lg:w-64 h-full bg-sky-700 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static`}
      >
        <div className="flex p-4 h-16 items-center bg-sky-700">
          <SidebarToggler onClick={toggle} isToggled={isOpen} />
        </div>
        <h1 className="text-white text-lg my-4 mx-auto w-full text-center">EMIRATADS</h1>
        <div className="flex flex-col items-center gap-4 py-8 h-screen bg-sky-700">
          {shortcuts.map((shortcut, index) => (
            <Shortcut key={index} {...shortcut} />
          ))}
        </div>
      </div>
)}
      <div
        className={`flex-1 transition-transform duration-300`}
      >
        <nav className="bg-sky-700 h-16 flex items-center justify-between px-4">
          {/* SIDEBAR */}

          {
          !isOpen && 
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center">
                <SidebarToggler onClick={toggle} isToggled={isOpen} />
                <h1 className="text-white text-lg mx-6">EMIRATADS</h1>
              </div>
           <div id="shortcuts-session" className="hidden md:flex">
                {shortcuts.map((shortcut, index) => (
                  <Shortcut key={index} {...shortcut} />
                ))}
              </div>
          </div>
          }
        </nav>
        <main>  
          {children}</main>
      </div>
    </div>
  );
};

export default Navbar;