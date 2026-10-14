import SmoothScroll from "@/components/SmoothScroll";
import { LangProvider } from "@/components/Lang";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Group from "@/components/Group";
import NewProjects from "@/components/NewProjects";
import Projects from "@/components/Projects";
import Method from "@/components/Method";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsApp from "@/components/WhatsApp";

export default function Home() {
  return (
    <LangProvider>
      <SmoothScroll>
        <Nav />
        <main>
          <Hero />
          <NewProjects />
          <Group />
          <Projects />
          <Method />
          <Contact />
        </main>
        <Footer />
        <WhatsApp />
      </SmoothScroll>
    </LangProvider>
  );
}
