import { Github, Youtube, Twitter } from "lucide-react";
import { SiSpotify } from "react-icons/si";
import Logo from "./Logo";
import Reveal from "./Reveal";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      id="contact"
      className="relative bg-black border-t border-white/5 px-6 pt-24 md:pt-32 pb-10 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_bottom,_rgba(255,255,255,0.05)_0%,_transparent_60%)]" />
      <div className="max-w-6xl mx-auto relative">
        <Reveal>
          <div className="text-center mb-16 md:mb-20">
            <div className="text-white/65 text-xs tracking-[0.3em] uppercase mb-6">
              Until next commit
            </div>
            <p className="text-serif text-3xl md:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1] max-w-3xl mx-auto">
              Notable opportunities{" "}
              <span className="text-italic-serif text-white/70">
                shape your tomorrow.
              </span>
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 pt-12 border-t border-white/10">
          <div>
            <div className="flex items-center gap-2.5 mb-4 text-white">
              <Logo className="w-6 h-6" />
              <span className="font-medium text-[15px] tracking-tight">
                Nosyt&nbsp;LLC
              </span>
            </div>
            <p className="text-white/65 text-sm max-w-xs leading-relaxed">
              An independent studio for AI agents, MCP servers, and quietly
              useful developer tools. Established 2025.
            </p>
          </div>

          <div>
            <div className="text-white/65 text-[11px] tracking-[0.28em] uppercase mb-4">
              The studio
            </div>
            <ul className="space-y-2.5 text-white/85 text-sm">
              <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#projects" className="hover:text-white transition-colors">Projects</a></li>
              <li><a href="#sound" className="hover:text-white transition-colors">Music side project</a></li>
              <li><a href="#manifesto" className="hover:text-white transition-colors">Manifesto</a></li>
            </ul>
          </div>

          <div>
            <div className="text-white/65 text-[11px] tracking-[0.28em] uppercase mb-4">
              Channels
            </div>
            <div className="flex flex-wrap gap-2.5">
              <FootIcon href="https://github.com/NosytLabs" label="GitHub"><Github size={16} /></FootIcon>
              <FootIcon href="https://www.youtube.com/channel/UC_tgfMnIcskFOjY3bX9T2QQ" label="YouTube"><Youtube size={16} /></FootIcon>
              <FootIcon href="https://x.com/NosytLabs" label="X"><Twitter size={16} /></FootIcon>
              <FootIcon href="https://open.spotify.com/artist/0Au3MjZ2Yll5St15Nt2RDq" label="Spotify"><SiSpotify size={16} /></FootIcon>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-white/50 text-xs tracking-wider">
          <div>© {year} Nosyt LLC. All rights quietly reserved.</div>
          <div className="text-italic-serif text-white/60">Made by humans, in the lab.</div>
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
      className="liquid-glass rounded-full p-3 text-white/85 hover:text-white hover:bg-white/[0.06] transition-all hover:scale-105"
    >
      {children}
    </a>
  );
}
