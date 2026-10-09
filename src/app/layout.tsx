import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

const title = "Alexandre Grosse | Ingénieur IA";
const description =
  "Ingénieur en intelligence artificielle chez Carrefour (Achats Non Marchands) et fondateur de l'agence AGWS.";

export const metadata: Metadata = {
  metadataBase: new URL("https://grssalex.dev"),
  title,
  description,
  openGraph: {
    title,
    description,
    url: "https://grssalex.dev",
    siteName: "grssalex.dev",
    locale: "fr_FR",
    type: "website",
  },
  twitter: { card: "summary_large_image", title, description, creator: "@grssalex" },
  authors: [{ name: "Alexandre Grosse" }],
  creator: "Alexandre Grosse",
  keywords: ["Ingénieur IA", "IA générative", "GCP", "BigQuery", "Gemini", "Next.js", "Carrefour", "AGWS"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${mono.variable} font-sans bg-[#FAFAFA] dark:bg-[#0A0A0A] text-[#111111] dark:text-[#EDEDED] antialiased selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-10 lg:px-20 flex flex-col min-h-screen">
            <Header />
            <main className="flex flex-col w-full flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
