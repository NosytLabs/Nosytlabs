import { Github, Twitter } from "lucide-react";
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
              Read the source on{" "}
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

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 pt-12 border-t border-[#f5f1e8]/10">
          <div>
            <div className="flex items-center gap-2.5 mb-4 text-[#f5f1e8]">
              <Logo className="w-8 h-8 rounded-md" />
              <span className="font-semibold text-[15px] tracking-tight">Nosytlabs</span>
            </div>
            <p className="text-[#f5f1e8]/75 text-sm max-w-xs leading-relaxed">
              Practical AI agents, MCP servers, and small, fast web apps —
              shipped open and built to last six months past launch day.
            </p>
          </div>

          <div>
            <div className="text-mono text-[#f5f1e8]/65 text-[11px] tracking-[0.28em] uppercase mb-4">
              Services
            </div>
            <ul className="space-y-2.5 text-[#f5f1e8]/85 text-sm">
              <li><a href="/services/web-apps/" className="hover:text-[#d8b87a] transition-colors">Web apps &amp; sites</a></li>
              <li><a href="/services/ai-agents/" className="hover:text-[#d8b87a] transition-colors">AI agents</a></li>
              <li><a href="/services/mcp-servers/" className="hover:text-[#d8b87a] transition-colors">MCP servers</a></li>
              <li><a href="/services/custom-tools/" className="hover:text-[#d8b87a] transition-colors">Custom tooling</a></li>
              <li><a href="/services/" className="hover:text-[#d8b87a] transition-colors">All services</a></li>
            </ul>
          </div>

          <div>
            <div className="text-mono text-[#f5f1e8]/65 text-[11px] tracking-[0.28em] uppercase mb-4">
              The studio
            </div>
            {/* Root-prefixed anchors so they work from any sub-page. */}
            <ul className="space-y-2.5 text-[#f5f1e8]/85 text-sm">
              <li><a href="/#about" className="hover:text-[#d8b87a] transition-colors">About</a></li>
              <li><a href="/#opportunities" className="hover:text-[#d8b87a] transition-colors">Work with us</a></li>
              <li><a href="/#projects" className="hover:text-[#d8b87a] transition-colors">Projects</a></li>
              <li><a href="/#manifesto" className="hover:text-[#d8b87a] transition-colors">Manifesto</a></li>
              <li><a href="/#contact" className="hover:text-[#d8b87a] transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <div className="text-mono text-[#f5f1e8]/65 text-[11px] tracking-[0.28em] uppercase mb-4">
              Channels
            </div>
            <div className="flex flex-wrap gap-2.5">
              <FootIcon href={LINKS.github} label="GitHub"><Github size={16} /></FootIcon>
              <FootIcon href={LINKS.x} label="X"><Twitter size={16} /></FootIcon>
            </div>
            <a href={LINKS.email} className="mt-4 inline-block text-mono text-[#f5f1e8]/65 hover:text-[#d8b87a] text-xs">
              {LINKS.emailRaw}
            </a>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-[#f5f1e8]/10 flex flex-col md:flex-row items-center justify-between gap-3 text-mono text-[#f5f1e8]/55 text-[11px] tracking-wider">
          <div>© {year} Nosytlabs · All rights reserved</div>
          <div className="flex items-center gap-5">
            <a href={LINKS.privacy} className="hover:text-[#d8b87a] transition-colors">
              Privacy
            </a>
            <a href="/sitemap.xml" className="hover:text-[#d8b87a] transition-colors">
              Sitemap
            </a>
            <a href="/llms.txt" className="hover:text-[#d8b87a] transition-colors">
              llms.txt
            </a>
          </div>
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
      className="liquid-glass rounded-full p-3 text-[#f5f1e8]/85 hover:text-[#d8b87a] hover:bg-white/[0.06] transition-all hover:scale-[1.04] motion-reduce:hover:scale-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d8b87a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
    >
      {children}
    </a>
  );
}
