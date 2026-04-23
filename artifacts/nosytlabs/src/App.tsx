import Hero from "@/components/Hero";
import About from "@/components/About";
import FeaturedVideo from "@/components/FeaturedVideo";
import Philosophy from "@/components/Philosophy";
import Projects from "@/components/Projects";
import Manifesto from "@/components/Manifesto";
import Sound from "@/components/Sound";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>
      <main
        id="main"
        className="bg-[#0a0a0b] text-[#f5f1e8] min-h-screen overflow-x-hidden font-sans"
      >
        <Hero />
        <About />
        <FeaturedVideo />
        <Philosophy />
        <Projects />
        <Manifesto />
        <Sound />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
