import { Github, Youtube, Twitter, Globe } from "lucide-react";
import { SiSpotify } from "react-icons/si";
import Logo from "./Logo";
import Reveal from "./Reveal";

const BACKRONYM = [
  ["N", "Notable"],
  ["O", "Opportunities"],
  ["S", "Shape"],
  ["Y", "Your"],
  ["T", "Tomorrow"],
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      id="contact"
      className="relative bg-black border-t border-white/5 px-6 pt-24 md:pt-32 pb-10 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_bottom,_rgba(216,184,122,0.07)_0%,_transparent_60%)]" />
      <div className="max-w-6xl mx-auto relative">
        <Reveal>
          <div className="text-center mb-16 md:mb-24">
            <div className="text-white/40 text-xs tracking-[0.3em] uppercase mb-6">
              The contract, in five letters
            </div>
            <div className="flex items-baseline justify-center flex-wrap gap-x-5 md:gap-x-8 gap-y-3">
              {BACKRONYM.map(([l, w], i) => (
                <span
                  key={l}
                  className="text-serif text-5xl md:text-7xl lg:text-8xl text-white/90 tracking-tight"
                >
                  {l}
                  <span className="text-italic-serif text-white/40 text-2xl md:text-4xl mx-1">
                    {i < BACKRONYM.length - 1 ? "·" : ""}
                  </span>
                  <span className="sr-only">{w}</span>
                </span>
              ))}
            </div>
            <div className="mt-5 text-italic-serif text-white/55 text-xl md:text-2xl">
              Notable Opportunities Shape Your Tomorrow.
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 pt-12 border-t border-white/5">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <Logo className="w-7 h-7" />
              <span className="text-white font-medium text-[15px] tracking-tight">
                NosytLabs<sup className="text-[9px] text-white/40 ml-0.5">®</sup>
              </span>
            </div>
            <p className="text-white/45 text-sm max-w-xs leading-relaxed">
              A quiet research studio building AI agents, prompt systems, and
              tools for the curious-by-default.
            </p>
          </div>

          <div>
            <div className="text-white/40 text-[11px] tracking-[0.28em] uppercase mb-4">
              The Lab
            </div>
            <ul className="space-y-2.5 text-white/70 text-sm">
              <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#projects" className="hover:text-white transition-colors">Projects</a></li>
              <li><a href="#sound" className="hover:text-white transition-colors">Sound</a></li>
              <li><a href="#manifesto" className="hover:text-white transition-colors">Manifesto</a></li>
            </ul>
          </div>

          <div>
            <div className="text-white/40 text-[11px] tracking-[0.28em] uppercase mb-4">
              Channels
            </div>
            <div className="flex flex-wrap gap-2.5">
              <a aria-label="GitHub" href="https://github.com/NosytLabs" target="_blank" rel="noreferrer" className="liquid-glass rounded-full p-3 text-white/80 hover:text-white"><Github size={16} /></a>
              <a aria-label="YouTube" href="https://www.youtube.com/channel/UC_tgfMnIcskFOjY3bX9T2QQ" target="_blank" rel="noreferrer" className="liquid-glass rounded-full p-3 text-white/80 hover:text-white"><Youtube size={16} /></a>
              <a aria-label="X" href="https://x.com/NosytLabs" target="_blank" rel="noreferrer" className="liquid-glass rounded-full p-3 text-white/80 hover:text-white"><Twitter size={16} /></a>
              <a aria-label="Spotify" href="https://open.spotify.com/artist/0Au3MjZ2Yll5St15Nt2RDq" target="_blank" rel="noreferrer" className="liquid-glass rounded-full p-3 text-white/80 hover:text-white"><SiSpotify size={16} /></a>
              <a aria-label="Web" href="https://nosytlabs.com" target="_blank" rel="noreferrer" className="liquid-glass rounded-full p-3 text-white/80 hover:text-white"><Globe size={16} /></a>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3 text-white/35 text-xs tracking-wider">
          <div>© {year} NosytLabs. All quietly reserved.</div>
          <div className="text-italic-serif text-white/45">Built in the lab.</div>
        </div>
      </div>
    </footer>
  );
}
