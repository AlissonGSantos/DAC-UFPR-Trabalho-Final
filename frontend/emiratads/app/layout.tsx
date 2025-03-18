import type { Metadata } from "next";
import "./globals.css";

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
      <body>
        {children}  
      </body>
    </html>
  );
}
