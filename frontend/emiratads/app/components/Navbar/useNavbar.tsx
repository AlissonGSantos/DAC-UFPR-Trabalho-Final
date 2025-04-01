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
  const { isLogged } = useAuthContext();
  const toggle = () => setIsOpen(!isOpen);

  const shortcuts: Shortcut[] = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Services", link: "/services" },
    { name: "Contact", link: "/contact" },
    !isLogged ? { name: "Login", link: "/login" } : null,
  ].filter((shortcut): shortcut is Shortcut => shortcut !== null);

  return { isOpen, toggle, shortcuts, isLogged };
};

export { useNavbar };
