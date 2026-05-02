import { Github, Youtube, Twitter } from "lucide-react";
import { SiSpotify } from "react-icons/si";
import Logo from "./Logo";
import Reveal from "./Reveal";
import { LINKS } from "@/lib/links";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative bg-[#0a0a0b] border-t border-[#f5f1e8]/10 px-6 pt-24 md:pt-32 pb-10 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_bottom,_rgba(216,184,122,0.06)_0%,_transparent_60%)]" />
      <div className="max-w-6xl mx-auto relative">
        <Reveal>
          <div className="text-center mb-16 md:mb-24">
            <div className="text-mono text-[#f5f1e8]/65 text-[11px] tracking-[0.3em] uppercase mb-8">
              Thanks for stopping by
            </div>
            <p className="text-serif text-[#f5f1e8] text-3xl md:text-5xl lg:text-6xl tracking-tight leading-[1.15] max-w-3xl mx-auto">
              Built quietly, shipped openly, on{" "}
              <a
                href={LINKS.github}
                target="_blank"
                rel="noreferrer"
                className="text-italic-serif text-[#d8b87a] hover:underline underline-offset-8 decoration-[#d8b87a]/40"
              >
                GitHub
              </a>
              .
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 pt-12 border-t border-[#f5f1e8]/10">
          <div>
            <div className="flex items-center gap-2.5 mb-4 text-[#f5f1e8]">
              <Logo className="w-8 h-8 rounded-md" />
              <span className="font-semibold text-[15px] tracking-tight">Nosytlabs</span>
            </div>
            <p className="text-[#f5f1e8]/65 text-sm max-w-xs leading-relaxed">
              Independent studio building AI agents, MCP servers, and
              developer tools. Founded 2025.
            </p>
          </div>

          <div>
            <div className="text-mono text-[#f5f1e8]/65 text-[11px] tracking-[0.28em] uppercase mb-4">
              The studio
            </div>
            <ul className="space-y-2.5 text-[#f5f1e8]/85 text-sm">
              <li><a href="#about" className="hover:text-[#d8b87a] transition-colors">About</a></li>
              <li><a href="#projects" className="hover:text-[#d8b87a] transition-colors">Projects</a></li>
              <li><a href="#manifesto" className="hover:text-[#d8b87a] transition-colors">Manifesto</a></li>
              <li><a href="#sound" className="hover:text-[#d8b87a] transition-colors">Music side project</a></li>
              <li><a href="#contact" className="hover:text-[#d8b87a] transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <div className="text-mono text-[#f5f1e8]/65 text-[11px] tracking-[0.28em] uppercase mb-4">
              Channels
            </div>
            <div className="flex flex-wrap gap-2.5">
              <FootIcon href={LINKS.github} label="GitHub"><Github size={16} /></FootIcon>
              <FootIcon href={LINKS.youtube} label="YouTube"><Youtube size={16} /></FootIcon>
              <FootIcon href={LINKS.x} label="X"><Twitter size={16} /></FootIcon>
              <FootIcon href={LINKS.spotify} label="Spotify"><SiSpotify size={16} aria-hidden="true" /></FootIcon>
            </div>
            <a href={LINKS.email} className="mt-4 inline-block text-mono text-[#f5f1e8]/65 hover:text-[#d8b87a] text-xs">
              {LINKS.emailRaw}
            </a>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-[#f5f1e8]/10 flex flex-col md:flex-row items-center justify-between gap-3 text-mono text-[#f5f1e8]/50 text-[11px] tracking-wider">
          <div>© {year} Nosyt&nbsp;LLC · All rights reserved</div>
          <a
            href="/sitemap.xml"
            className="hover:text-[#d8b87a] transition-colors"
          >
            Sitemap
          </a>
        </div>
      </div>
    </footer>
  );
}

function FootIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      aria-label={label}
      href={href}
      target="_blank"
      rel="noreferrer"
      className="liquid-glass rounded-full p-3 text-[#f5f1e8]/85 hover:text-[#d8b87a] hover:bg-white/[0.06] transition-all hover:scale-105"
    >
      {children}
    </a>
  );
}
