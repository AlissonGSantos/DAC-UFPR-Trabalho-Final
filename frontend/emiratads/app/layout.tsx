import type { Metadata } from "next";
import "./globals.css";
import { AuthContextProvider } from "./contexts/auth";
import Navbar from "./components/Navbar/Navbar";

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
          <Navbar>{children}</Navbar>
        </body>
      </AuthContextProvider>
    </html>
  );
}
