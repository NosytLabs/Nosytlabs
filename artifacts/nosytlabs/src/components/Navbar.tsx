import { useEffect, useState } from "react";
import Logo from "./Logo";

const LINKS = [
  { label: "Lab", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Sound", href: "#sound" },
  { label: "Manifesto", href: "#manifesto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="relative z-30 px-4 sm:px-6 pt-5 sm:pt-6">
      <div
        className={`liquid-glass mx-auto max-w-5xl rounded-full flex items-center justify-between transition-all duration-500 ${
          scrolled ? "px-4 py-2 sm:px-5 sm:py-2.5" : "px-5 py-3 sm:px-6 sm:py-3.5"
        }`}
      >
        <a href="#" className="flex items-center gap-2.5 group">
          <Logo className="w-7 h-7" />
          <span className="text-white font-medium text-[15px] tracking-tight">
            NosytLabs<sup className="text-[9px] text-white/40 ml-0.5">®</sup>
          </span>
        </a>
        <div className="hidden md:flex items-center gap-7 ml-6">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-white/65 hover:text-white text-sm font-medium transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2.5">
          <a
            href="https://github.com/NosytLabs"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline text-white/70 hover:text-white text-sm font-medium px-2 transition-colors"
          >
            GitHub
          </a>
          <a
            href="#contact"
            className="liquid-glass-strong rounded-full px-5 py-2 text-white text-sm font-medium hover:scale-[1.03] active:scale-95 transition-transform"
          >
            Begin
          </a>
        </div>
      </div>
    </nav>
  );
}
