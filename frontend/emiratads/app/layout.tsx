import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import { AuthContextProvider } from "./contexts/auth";

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
        <body className="">
          <Navbar>
            {children}  
          </Navbar>
        </body>
      </AuthContextProvider>
    </html>
  );
}
