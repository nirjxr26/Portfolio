import Hero from "@/components/Hero";
import About from "@/components/About";
import TechStack from "@/components/TechStack";
import Works from "@/components/Works";
import Blog from "@/components/Blog";
import Leadership from "@/components/Leadership";
import Education from "@/components/Education";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      {/* <About /> */}
      <TechStack />
      <Works />
      <Leadership />
      <Education />
      <Blog />
      <Contact />
    </main>
  );
}
