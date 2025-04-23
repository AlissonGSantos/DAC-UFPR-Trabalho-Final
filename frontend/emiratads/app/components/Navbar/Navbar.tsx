"use client";

import React from "react";
import { useNavbar } from "./useNavbar";
import Shortcut from "./components/Shortcut";
import SidebarToggler from "./components/SidebarToggler";
import Logo from "@/app/assets/images/logos/emiratadsLogo.png";
import Image from "next/image";
import Button from "../Button/Button";

interface NavbarProps {
  children?: React.ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({ children }) => {
  const { isOpen, toggle, shortcuts, username, milescore, logout } =
    useNavbar();

  return (
    <div className="flex flex-col h-screen">
      <nav className="bg-slate-950 border-b-2 border-indigo-950 h-16 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <SidebarToggler onClick={toggle} isToggled={isOpen} />
          <Image
            src={Logo}
            alt={"emiratads-logo"}
            width={80}
            className="mx-auto"
          />
        </div>
        {!isOpen && (
          <div
            id="shortcuts-session"
            className="hidden md:flex h-full items-center w-8/10"
          >
            {shortcuts.map(
              (shortcut, index) =>
                shortcut.enabled && (
                  <Shortcut key={`${shortcut.name}-${index}`} {...shortcut} />
                )
            )}

            <div className="ml-2 mr-6 h-10/12 border-l-2 border-indigo-950" />
            <div className="flex min-w-50">
              <p className="text-slate-300">Bem vindo, {username}</p>
            </div>
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
            <div className="flex min-w-50 justify-center">
              <p className="text-slate-300">Bem vindo, {username}</p>
            </div>
            <div className="my-2 h-0.25 w-10/12 bg-indigo-900" />
            {shortcuts.map((shortcut, index) => (
              <Shortcut
                sidebar={isOpen}
                key={`${shortcut.name}-${index}`}
                {...shortcut}
              />
            ))}
            <div className="my-2 h-0.25 w-10/12 bg-indigo-900" />
            <div className="flex min-w-50 justify-center">
              <p className="text-slate-300">Saldo em milhas: {milescore}</p>
            </div>
            <Button
              text="Logout"
              size="SMALL"
              type="SECONDARY"
              onClick={logout}
            />
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
