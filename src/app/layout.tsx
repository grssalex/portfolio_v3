import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });

export const metadata: Metadata = {
  title: "Alexandre | Développeur IA & Web",
  description: "Portfolio de développeur IA chez Carrefour et créateur d'expériences Web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning className="scroll-smooth">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-[#FAFAFA] text-[#111111] antialiased selection:bg-black selection:text-white`}>
        <main className="min-h-screen flex flex-col w-full max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
