"use client";
import { useAuthContext } from "@/app/contexts/auth";
import { useState } from "react";
import { EmployeeEnum } from "@/app/types/AuthTypes";

interface Shortcut {
  name: string;
  link: string;
  enabled?: boolean;
}

const useNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLogged, userData, logout, getUserType } = useAuthContext();
  const toggle = () => setIsOpen(!isOpen);

  const userType = getUserType() ?? EmployeeEnum.CLIENTE;

  const shortcuts: Shortcut[] =
    userType === EmployeeEnum.CLIENTE
      ? [
          { name: "Início", link: "/client/home", enabled: true },
          { name: "Milhas", link: "/client/invoice", enabled: true },
          { name: "Voos", link: "/client/searchFlight", enabled: true },
          { name: "Reservas", link: "/client/booking", enabled: true },
          { name: "Check-in", link: "/client/checkin", enabled: true },
        ]
      : [
          { name: "Início", link: "/employee/home", enabled: true },
          { name: "Voos", link: "/employee/registerFlight", enabled: true },
          { name: "Funcionários", link: "/employee/dashboard", enabled: true },
        ];

  return {
    isOpen,
    toggle,
    shortcuts,
    isLogged,
    username: userData?.usuario?.nome,
    milescore: userData?.usuario?.saldo_milhas,
    isClient: userType === EmployeeEnum.CLIENTE,
    logout,
  };
};

export { useNavbar };
