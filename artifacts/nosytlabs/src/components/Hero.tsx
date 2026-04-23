import { useEffect, useRef, useState } from "react";
import { ArrowRight, Github, Youtube, Twitter } from "lucide-react";
import { SiSpotify } from "react-icons/si";
import Navbar from "./Navbar";
import { LINKS } from "@/lib/links";
import { track } from "@/lib/analytics";

const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260330_145725_08886141-ed95-4a8e-8d6d-b75eaadce638.mp4";

type SubStatus = "idle" | "sending" | "sent" | "error";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SubStatus>("idle");

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    // Respect reduced motion: don't autoplay
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVideoReady(true);
      return;
    }
    const onPlaying = () => setVideoReady(true);
    const tryPlay = () => v.play().catch(() => {});
    v.addEventListener("playing", onPlaying);
    v.addEventListener("loadeddata", tryPlay);
    v.addEventListener("canplay", tryPlay);
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? tryPlay() : v.pause()),
      { threshold: 0.05 },
    );
    io.observe(v);
    return () => {
      v.removeEventListener("playing", onPlaying);
      v.removeEventListener("loadeddata", tryPlay);
      v.removeEventListener("canplay", tryPlay);
      io.disconnect();
    };
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email) || status === "sending") return;
    setStatus("sending");
    track("subscribe_attempt", { location: "hero" });
    try {
      const res = await fetch(LINKS.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          email,
          _subject: "[Nosytlabs] New subscriber to build notes",
          _template: "table",
          _captcha: "false",
          source: "hero-subscribe",
        }),
      });
      if (!res.ok) throw new Error("submit failed");
      setStatus("sent");
      setEmail("");
      track("subscribe_success", { location: "hero" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      // Fallback: open the user's mail client so the message still gets through
      track("subscribe_fallback_mailto", { location: "hero" });
      window.location.href = LINKS.subscribe(email);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col bg-[#0a0a0b]">
      {/* Pure black until the video is ready, then the video fades in. */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-[1400ms] ease-out motion-reduce:transition-none"
        style={{ opacity: videoReady ? 1 : 0 }}
        src={HERO_VIDEO}
        poster="/img/cosmos-hero.webp"
        muted
        autoPlay
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
      />

      {/* Layered overlays — vignette + bottom fade so type stays legible */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_rgba(10,10,11,0.10)_0%,_rgba(10,10,11,0.55)_55%,_rgba(10,10,11,0.92)_100%)]" />
      <div className="absolute inset-0 pointer-events-none bg-[#0a0a0b]/30" />
      <div className="absolute inset-x-0 bottom-0 h-72 pointer-events-none bg-gradient-to-b from-transparent via-[#0a0a0b]/85 to-[#0a0a0b]" />
      <div className="absolute inset-x-0 top-0 h-32 pointer-events-none bg-gradient-to-b from-[#0a0a0b]/85 to-transparent" />

      <Navbar />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center -translate-y-[3%]">
        <div className="text-mono text-[#f5f1e8]/65 text-[10px] sm:text-[11px] tracking-[0.32em] uppercase mb-7 animate-fade-rise">
          Nosytlabs&nbsp;·&nbsp;Independent&nbsp;Studio&nbsp;·&nbsp;Est.&nbsp;2025
        </div>

        <h1 className="text-serif text-[#f5f1e8] tracking-[-0.025em] leading-[0.94] text-[3.25rem] sm:text-7xl md:text-8xl lg:text-[8.5rem] xl:text-[10rem] max-w-[1200px] animate-fade-rise-d1">
          Notable opportunities{" "}
          <span className="text-italic-serif text-[#d8b87a]">shape</span>{" "}
          your <span className="text-italic-serif shimmer-text">tomorrow</span>.
        </h1>

        <p className="mt-8 max-w-xl text-[#f5f1e8]/85 text-base sm:text-lg leading-relaxed animate-fade-rise-d2">
          A small independent studio building AI agents, MCP servers, and
          tools for developers. Open source where it counts.
        </p>

        <form
          className="mt-10 w-full max-w-lg animate-fade-rise-d3"
          onSubmit={onSubmit}
          aria-label="Subscribe to build notes"
        >
          <label htmlFor="hero-email" className="sr-only">
            Email address
          </label>
          <div className="liquid-glass-strong rounded-full pl-6 pr-2 py-2 flex items-center gap-3 focus-within:ring-2 focus-within:ring-[#d8b87a]/50 transition">
            <input
              id="hero-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "sending"}
              placeholder={
                status === "sent"
                  ? "Thanks — you're on the list."
                  : "your@email.com"
              }
              className="flex-1 bg-transparent outline-none text-[#f5f1e8] placeholder:text-[#f5f1e8]/55 text-sm py-2.5 disabled:opacity-60"
              autoComplete="email"
              inputMode="email"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              aria-label="Subscribe to build notes"
              className="bg-[#f5f1e8] rounded-full px-5 py-2.5 text-[#0a0a0b] text-sm font-medium hover:bg-[#f5f1e8]/90 active:scale-[0.97] transition flex items-center gap-1.5 disabled:opacity-60 motion-reduce:active:scale-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d8b87a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
            >
              {status === "sending" ? "Sending…" : status === "sent" ? "On the list ✓" : "Get notes"}
              {status === "idle" && <ArrowRight size={14} strokeWidth={2.4} aria-hidden="true" />}
            </button>
          </div>
          <p
            className="mt-3 text-[#f5f1e8]/45 text-xs min-h-[1.25rem]"
            aria-live="polite"
          >
            {status === "sent"
              ? "Thanks — your email client just opened with a draft. Send it and you’re on the list."
              : status === "error"
                ? "Couldn't reach the server — opening your mail client instead."
                : "Occasional updates when something ships. No spam, ever."}
          </p>
        </form>

        <div className="mt-10 flex items-center gap-2.5 animate-fade-rise-d4">
          <Pill href={LINKS.github} label="GitHub"><Github size={16} /></Pill>
          <Pill href={LINKS.youtube} label="YouTube"><Youtube size={16} /></Pill>
          <Pill href={LINKS.x} label="X"><Twitter size={16} /></Pill>
          <Pill href={LINKS.spotify} label="Spotify"><SiSpotify size={16} /></Pill>
        </div>
      </div>

      <div className="relative z-10 pb-10 px-6 animate-fade-rise-d4">
        <div className="mx-auto max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-mono text-[#f5f1e8]/55 text-[10px] tracking-[0.22em] uppercase">
            Independent · Open source · Built in public
          </span>
          <a
            href="#about"
            className="text-[#f5f1e8]/70 hover:text-[#f5f1e8] transition-colors text-sm focus:outline-none focus-visible:underline focus-visible:underline-offset-4 focus-visible:decoration-[#d8b87a]"
          >
            Scroll to read ↓
          </a>
        </div>
      </div>
    </section>
  );
}

function Pill({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      onClick={() => track("social_click", { network: label.toLowerCase() })}
      className="liquid-glass rounded-full p-3 text-[#f5f1e8]/85 hover:text-[#f5f1e8] hover:bg-white/[0.06] transition-all hover:scale-105 motion-reduce:hover:scale-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d8b87a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
    >
      {children}
    </a>
  );
}
