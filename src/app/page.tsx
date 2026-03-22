import Hero from "@/components/hero/Hero";
import Experience from "@/components/experience/Experience";
import Projects from "@/components/projects/Projects";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <Experience />
      <Projects />
    </div>
  );
}
