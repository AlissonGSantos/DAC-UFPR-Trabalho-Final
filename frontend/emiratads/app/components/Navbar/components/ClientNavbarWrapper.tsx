"use client";

import React from "react";
import Navbar from "../Navbar";
import { usePathname } from "next/navigation";

interface ClientNavbarWrapperProps {
  children: React.ReactNode;
}

const ClientNavbarWrapper: React.FC<ClientNavbarWrapperProps> = ({ children }) => {
  const pathname = usePathname();

  const shouldRenderNavbar = pathname.includes("authentication");

  return shouldRenderNavbar ? <Navbar>{children}</Navbar> : <>{children}</>;
};

export default ClientNavbarWrapper;