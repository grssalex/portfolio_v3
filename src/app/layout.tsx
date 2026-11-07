import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jbm" });

const title = "Alexandre Grosse | Ingénieur IA";
const description =
  "Ingénieur en intelligence artificielle chez Carrefour (Achats Non Marchands) et fondateur de l'agence AGWS.";

export const metadata: Metadata = {
  metadataBase: new URL("https://grssalex.dev"),
  title,
  description,
  openGraph: { title, description, url: "https://grssalex.dev", siteName: "grssalex.dev", locale: "fr_FR", type: "website" },
  twitter: { card: "summary_large_image", title, description, creator: "@grssalex" },
  authors: [{ name: "Alexandre Grosse" }],
  creator: "Alexandre Grosse",
  keywords: ["Ingénieur IA", "IA générative", "agents IA", "GCP", "BigQuery", "LangGraph", "Next.js", "Carrefour", "AGWS"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" suppressHydrationWarning className="scroll-smooth">
      <body className={`${inter.variable} ${mono.variable} font-sans bg-bg text-fg antialiased text-[15px] leading-relaxed`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8 flex flex-wrap gap-x-14">
            <Sidebar />
            <main className="flex-[999_1_600px] min-w-0 max-w-[880px] pt-10 pb-20">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
