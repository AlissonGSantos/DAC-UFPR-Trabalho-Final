import type { Metadata } from "next";
import "./globals.css";
import { AuthContextProvider } from "./contexts/auth";
import ClientNavbarWrapper from "./components/Navbar/components/ClientNavbarWrapper";
import { FlightContextProvider } from "./contexts/flight";

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
        <FlightContextProvider>
          <body className="h-screen bg-slate-900">
            <ClientNavbarWrapper>{children}</ClientNavbarWrapper>
          </body>
        </FlightContextProvider>
      </AuthContextProvider>
    </html>
  );
}
