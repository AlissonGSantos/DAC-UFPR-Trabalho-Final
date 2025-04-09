"use client";
import { useAuthContext } from "@/app/contexts/auth";
import { useState } from "react";

interface Shortcut {
  name: string;
  link: string;
  enabled?: boolean;
}

const useNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLogged, userData } = useAuthContext();
  const toggle = () => setIsOpen(!isOpen);

  const shortcuts: Shortcut[] = [
    { name: "Home", link: "/", enabled: true },
    { name: "About", link: "/about", enabled: true },
    { name: "Services", link: "/services", enabled: true },
    { name: "Contact", link: "/contact", enabled: true },
    {
      name: "Login",
      link: "/authentication/login",
      enabled: !isLogged,
    },
  ].filter((shortcut) => shortcut.enabled);

  return {
    isOpen,
    toggle,
    shortcuts,
    isLogged,
    username: userData?.usuario.nome,
  };
};

export { useNavbar };
