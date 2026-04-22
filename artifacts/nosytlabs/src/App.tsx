import Hero from "@/components/Hero";
import About from "@/components/About";
import FeaturedVideo from "@/components/FeaturedVideo";
import Philosophy from "@/components/Philosophy";
import Projects from "@/components/Projects";
import Sound from "@/components/Sound";
import Manifesto from "@/components/Manifesto";
import Footer from "@/components/Footer";

export default function App() {
  return (
    <main className="bg-black text-white min-h-screen overflow-x-hidden">
      <Hero />
      <About />
      <FeaturedVideo />
      <Philosophy />
      <Projects />
      <Manifesto />
      <Sound />
      <Footer />
    </main>
  );
}
