import { useEffect, useRef, useState } from "react";
import { ArrowRight, Github, Youtube, Twitter } from "lucide-react";
import { SiSpotify } from "react-icons/si";
import Navbar from "./Navbar";
import { LINKS } from "@/lib/links";
import { track } from "@/lib/analytics";

const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260330_145725_08886141-ed95-4a8e-8d6d-b75eaadce638.mp4";

type SubStatus = "idle" | "sending" | "sent" | "error";

// Decide if this device/network can afford the ~13 MB hero MP4.
// Defaults to "no" during SSR so the poster is shown first. Returns false
// for: small phones (<=640px), Save-Data users, 2G/slow-2G connections,
// and prefers-reduced-motion. Lighthouse mobile reports effectiveType
// "4g" even on Slow-4G throttling, so we use the viewport as the real
// mobile signal — that drops the MP4 entirely on phones, which is what
// the audit flagged.
function shouldLoadHeroVideo(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (window.matchMedia("(max-width: 640px)").matches) return false;
  type NetInfo = { saveData?: boolean; effectiveType?: string };
  const conn = (navigator as Navigator & { connection?: NetInfo }).connection;
  if (conn?.saveData) return false;
  if (conn?.effectiveType && /^(slow-2g|2g)$/.test(conn.effectiveType)) return false;
  return true;
}

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [loadVideo, setLoadVideo] = useState(false);
  // Held back until IntersectionObserver confirms the hero is on-screen.
  // Setting `src` is what triggers the actual MP4 fetch, so deferring this
  // assignment keeps initial-paint resources (HTML/CSS/JS/poster) un-contended.
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SubStatus>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  // Honeypot — invisible to humans. Bots that auto-fill every field will
  // populate this and get silently dropped. formsubmit also drops any
  // submission with `_honey` set on its end (defense in depth).
  const [hp, setHp] = useState("");

  // Decide whether to even mount the <video> element. Doing this in an effect
  // (instead of at render-time inline) keeps SSR/initial-paint deterministic
  // and means the static poster always shows first — the video upgrade is a
  // strict enhancement.
  useEffect(() => {
    setLoadVideo(shouldLoadHeroVideo());
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onPlaying = () => setVideoReady(true);
    const tryPlay = () => v.play().catch(() => {});
    v.addEventListener("playing", onPlaying);
    v.addEventListener("loadeddata", tryPlay);
    v.addEventListener("canplay", tryPlay);
    // Lazy-load: only assign src once the hero is actually in view (always
    // true on first paint for this section, but the IO gate ensures the
    // browser prioritises the LCP elements before the MP4 begins streaming).
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!videoSrc) setVideoSrc(HERO_VIDEO);
          tryPlay();
        } else {
          v.pause();
        }
      },
      { threshold: 0.05 },
    );
    io.observe(v);
    return () => {
      v.removeEventListener("playing", onPlaying);
      v.removeEventListener("loadeddata", tryPlay);
      v.removeEventListener("canplay", tryPlay);
      io.disconnect();
    };
  }, [loadVideo, videoSrc]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email) || status === "sending") return;
    // Honeypot trip — pretend it succeeded so the bot doesn't retry, but
    // never POST and never count it as a real subscriber.
    if (hp) {
      track("subscribe_honeypot", { location: "hero" });
      setStatus("sent");
      setEmail("");
      setHp(""); // reset so an autofill mishap can't permanently lock the form
      setTimeout(() => setStatus("idle"), 5000);
      return;
    }
    setStatus("sending");
    setErrorMsg(null);
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
          _honey: "",
          source: "hero-subscribe",
          _autoresponse:
            "You're on the list for Nosytlabs build notes.\n" +
            "We only send when there's something worth your attention. Reply to this email any time — it lands in our inbox.\n" +
            "— Nosytlabs · hi@nosytlabs.com\n" +
            "To stop receiving build notes, reply with 'unsubscribe' and we'll remove you within 48h.",
        }),
      });
      // formsubmit returns 200 with { success: "true" | "false", message }
      // even when the request was rejected (rate-limited, captcha required,
      // etc.), so we have to inspect the body — not just res.ok.
      const data = await res.json().catch(() => ({} as { success?: string; message?: string }));
      const ok = res.ok && String(data.success).toLowerCase() === "true";
      if (!ok) {
        throw new Error(data.message || "Couldn't reach the server. Please try again, or email hi@nosytlabs.com.");
      }
      setStatus("sent");
      setEmail("");
      track("subscribe_success", { location: "hero" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      // Stay in-page on failure — never hijack the visitor to their mail client.
      track("subscribe_error", { location: "hero" });
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
      setTimeout(() => {
        setStatus("idle");
        setErrorMsg(null);
      }, 6000);
    }
  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col bg-[#0a0a0b]">
      {loadVideo ? (
        // Capable device — pure black until the cinematic video is actually
        // playing, then the video fades in. No poster underneath, so the
        // visitor never sees the static frame mid-buffer.
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-[1400ms] ease-out motion-reduce:transition-none"
          style={{ opacity: videoReady ? 1 : 0 }}
          src={videoSrc ?? undefined}
          poster="/img/cosmos-hero.webp"
          muted
          autoPlay
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
        />
      ) : (
        // Fallback for reduced-motion / Save-Data / 2G — show the poster as
        // a static image instead of fetching the ~13 MB MP4.
        <img
          src="/img/cosmos-hero.webp"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center"
          decoding="async"
          fetchPriority="high"
        />
      )}

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
          A one-person studio building AI agents, MCP servers, and small
          tools for developers. Most of it open source, all of it on GitHub.
        </p>

        <form
          className="mt-10 w-full max-w-lg animate-fade-rise-d3"
          onSubmit={onSubmit}
          aria-label="Subscribe to build notes"
        >
          {/* Honeypot — visually hidden, off the tab order, and ignored by AT.
              Real visitors never touch it; spam bots almost always do. */}
          <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
            <label>
              Leave this field empty
              <input
                type="text"
                name="_honey"
                tabIndex={-1}
                autoComplete="off"
                value={hp}
                onChange={(e) => setHp(e.target.value)}
              />
            </label>
          </div>

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
              ? "You're on the list. Reply to any future note if you ever want off."
              : status === "error"
                ? errorMsg ?? "Couldn't reach the server. Please try again, or email hi@nosytlabs.com."
                : "Occasional updates when something ships. No spam, ever."}
          </p>
        </form>

        <div className="mt-10 flex items-center gap-2.5 animate-fade-rise-d4">
          <Pill href={LINKS.github} label="GitHub"><Github size={16} /></Pill>
          <Pill href={LINKS.youtube} label="YouTube"><Youtube size={16} /></Pill>
          <Pill href={LINKS.x} label="X"><Twitter size={16} /></Pill>
          <Pill href={LINKS.spotify} label="Spotify"><SiSpotify size={16} aria-hidden="true" /></Pill>
        </div>
      </div>

      <div className="relative z-10 pb-10 px-6 animate-fade-rise-d4">
        <div className="mx-auto max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-mono text-[#f5f1e8]/55 text-[10px] tracking-[0.22em] uppercase">
            Independent · Open source · Est. 2025
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
