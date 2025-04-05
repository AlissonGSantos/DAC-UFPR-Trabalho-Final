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
    <div className="flex flex-col h-screen">
      <nav className="bg-slate-950 border-b-2 border-indigo-950 h-16 flex items-center justify-between px-4">
        <div className="flex items-center">
          <SidebarToggler onClick={toggle} isToggled={isOpen} />
          <h1 className="text-white text-lg mx-6 hidden lg:block">
            EMIRATADS
          </h1>
        </div>
        {!isOpen && (
          <div id="shortcuts-session" className="hidden md:flex h-full">
            {shortcuts.map((shortcut, index) => (
              <Shortcut key={`${shortcut.name}-${index}`} {...shortcut} />
            ))}
          </div>
        )}
      </nav>
      <div className="relative flex flex-1 overflow-hidden">
        <div
          className={`absolute inset-y-0 left-0 bg-slate-950 border-r-2 border-indigo-950 transition-transform duration-300 ease-in-out ${
            isOpen ? "w-full lg:w-64 translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col items-center gap-4 py-8 px-1 h-full">
            {shortcuts.map((shortcut, index) => (
              <Shortcut sidebar={isOpen} key={`${shortcut.name}-${index}`} {...shortcut} />
            ))}
          </div>
        </div>
        <main
          className={`transition-all duration-300 ease-in-out overflow-x-hidden overflow-y-scroll flex-1 ${
            isOpen ? "lg:ml-64" : "lg:ml-0"
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Navbar;
