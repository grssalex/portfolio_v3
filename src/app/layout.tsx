import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MouseGlow } from "@/components/ui/MouseGlow";

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
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-[#FAFAFA] dark:bg-[#0A0A0A] text-[#111111] dark:text-[#EDEDED] antialiased selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-500`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <MouseGlow />
          <ThemeToggle />
          <main className="min-h-screen flex flex-col w-full max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
