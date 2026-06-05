import Hero from "@/components/hero/Hero";
import Experience from "@/components/experience/Experience";
import Projects from "@/components/projects/Projects";
import EasterEgg from "@/components/easter/EasterEgg";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <Experience />
      <Projects />
      <EasterEgg />
    </div>
  );
}
