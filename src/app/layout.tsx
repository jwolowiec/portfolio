import type { Metadata } from "next";
import { Monda } from "next/font/google";
import "../styles/globals.css";

const mondaSans = Monda({
  variable: "--font-monda-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jakub Wołowiec - Fullstack Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body
        className={mondaSans.className}
      >
        {children}
      </body>
    </html>
  );
}
