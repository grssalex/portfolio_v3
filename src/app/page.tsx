import { Calendar, GitBranch } from "lucide-react";
import Intro from "@/components/intro/Intro";
import Profile from "@/components/profile/Profile";
import Experience from "@/components/experience/Experience";
import Stack from "@/components/stack/Stack";
import Contact from "@/components/contact/Contact";

export default function Home() {
  return (
    <>
      <Intro />
      <Profile />
      <Experience />
      <Stack />
      <Contact />
      <footer className="flex flex-wrap justify-between gap-2.5 pt-[18px] border-t border-line text-[13px] text-muted">
        <span className="inline-flex items-center gap-1.5">
          <Calendar className="w-[13px] h-[13px]" /> Dernière mise à jour : novembre 2026 · © Alexandre Grosse
        </span>
        <a
          href="https://github.com/grssalex/portfolio_v3"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 hover:text-fg transition-colors"
        >
          <GitBranch className="w-[13px] h-[13px]" /> Modifier cette page sur GitHub ↗
        </a>
      </footer>
    </>
  );
}
