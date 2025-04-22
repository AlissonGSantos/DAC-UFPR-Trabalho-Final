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
    { name: "Início", link: "/client/home", enabled: true },
    { name: "Milhas", link: "/about", enabled: true },
    { name: "Reservar", link: "/services", enabled: true },
    { name: "Reservas", link: "/contact", enabled: true },
    { name: "Check-in", link: "/contact", enabled: true },
  ].filter((shortcut) => shortcut.enabled);

  return {
    isOpen,
    toggle,
    shortcuts,
    isLogged,
    username: userData?.usuario.nome,
    milescore: userData?.usuario.saldo_milhas,
  };
};

export { useNavbar };
