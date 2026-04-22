import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import { LINKS } from "@/lib/links";

const NAV = [
  { label: "Studio", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Manifesto", href: "#manifesto" },
  { label: "Music", href: "#sound" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <nav className="relative z-30 px-4 sm:px-6 pt-5 sm:pt-6">
      <div
        className={`liquid-glass mx-auto max-w-5xl rounded-full flex items-center justify-between transition-all duration-500 ${
          scrolled ? "px-4 py-2 sm:px-5 sm:py-2.5" : "px-5 py-3 sm:px-6 sm:py-3.5"
        }`}
      >
        <a href="#" aria-label="Nosytlabs — home" className="flex items-center gap-2.5 text-[#f5f1e8]">
          <Logo className="w-7 h-7 rounded-md" />
          <span className="font-semibold text-[15px] tracking-tight hidden sm:inline">Nosytlabs</span>
        </a>

        <div className="hidden md:flex items-center gap-7 ml-6">
          {NAV.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[#f5f1e8]/80 hover:text-[#f5f1e8] text-sm font-medium transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={LINKS.github}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex liquid-glass-strong rounded-full px-5 py-2 text-[#f5f1e8] text-sm font-medium hover:scale-[1.03] active:scale-95 transition-transform"
          >
            GitHub →
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="md:hidden liquid-glass-strong rounded-full p-2.5 text-[#f5f1e8]"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden fixed inset-0 z-40 bg-[#0a0a0b]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-7 animate-fade-rise">
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="absolute top-6 right-6 liquid-glass-strong rounded-full p-2.5 text-[#f5f1e8]"
          >
            <X size={18} />
          </button>
          {NAV.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-serif text-3xl text-[#f5f1e8]"
            >
              {l.label}
            </a>
          ))}
          <a
            href={LINKS.github}
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
            className="liquid-glass-strong rounded-full px-6 py-3 text-[#f5f1e8] text-sm font-medium mt-4"
          >
            GitHub →
          </a>
        </div>
      )}
    </nav>
  );
}
