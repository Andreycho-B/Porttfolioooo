import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Benefits } from "@/components/sections/Benefits";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-white">
      <Navbar />
      <Hero />
      <div id="proyectos-featured">
        {/* Could rename to Featured Projects */}
        <Projects />
      </div>

      {/* Persuasion Block */}
      <Benefits />

    </main>
  );
}
