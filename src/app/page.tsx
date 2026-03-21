import Hero from "@/components/hero/Hero";
import Experience from "@/components/experience/Experience";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <Experience />
    </div>
  );
}
