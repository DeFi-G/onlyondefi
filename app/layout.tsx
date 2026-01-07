import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HyperspaceDNABackground from "./components/HyperspaceDNABackground";
import { Nav } from "./components/Nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OnlyOnDeFi",
  description:
    "OnlyOnDeFi — the hub for DeFi Network apps, infrastructure, and validator onboarding.",
  metadataBase: new URL("https://onlyondefi.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <HyperspaceDNABackground />
        <Nav />
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}
