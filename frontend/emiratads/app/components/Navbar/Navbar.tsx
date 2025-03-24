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
      <div className="flex-1 transition-all duration-300 ease-in-out">
        <nav className="bg-sky-700 h-16 flex items-center justify-between px-4">
          <div className="flex items-center">
            <SidebarToggler onClick={toggle} isToggled={isOpen} />
            <h1 className="text-white text-lg mx-6 hidden lg:block">
              EMIRATADS
            </h1>
          </div>
          {!isOpen && (
            <div id="shortcuts-session" className="hidden md:flex h-full">
              {shortcuts.map((shortcut, index) => (
                <Shortcut key={index} {...shortcut} />
              ))}
            </div>
          )}
        </nav>
        <div className="flex">
          {/* SIDEBAR */}
          <div
            className={`fixed h-full bg-sky-700 ${
              isOpen ? "w-full lg:w-64" : "max-w-none"
            } transform transition-transform duration-300 ease-in-out ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex flex-col items-center gap-4 py-8 h-screen bg-sky-700">
              {shortcuts.map((shortcut, index) => (
                <Shortcut key={index} {...shortcut} />
              ))}
            </div>
          </div>
          {/* Conteúdo principal com margem condicional para empurrar à direita */}
          <main
            className={`p-4 transition-all duration-300 ease-in-out ${
              isOpen ? "lg:ml-64" : "lg:ml-0"
            }`}
          >
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
