import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FooterWrapper } from "@/components/layout/FooterWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Andrey & David | Desarrolladores Senior",
  description: "Portafolio unificado de Andrey Rondón y David Neita - Desarrolladores Full Stack Senior.",
};

import { StarsBackground } from "@/components/ui/StarsBackground";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StarsBackground />
        {children}
        <FooterWrapper />
      </body>
    </html>
  );
}
