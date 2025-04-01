import type { Metadata } from "next";
import "./globals.css";
import { AuthContextProvider } from "./contexts/auth";
import ClientNavbarWrapper from "./components/Navbar/components/ClientNavbarWrapper";

export const metadata: Metadata = {
  title: "EmiraTADS Airlines",
  description: "Designed for you to fly!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <AuthContextProvider>
        <body className="h-screen">
          <ClientNavbarWrapper>{children}</ClientNavbarWrapper>
        </body>
      </AuthContextProvider>
    </html>
  );
}