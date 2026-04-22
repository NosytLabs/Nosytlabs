import { useEffect, useRef, useState } from "react";
import { ArrowRight, Github, Youtube, Twitter } from "lucide-react";
import { SiSpotify } from "react-icons/si";
import Navbar from "./Navbar";

const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260330_145725_08886141-ed95-4a8e-8d6d-b75eaadce638.mp4";

// Static cosmic poster used as instant first-paint AND fallback.
const POSTER = "/img/cosmos-hero.png";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Robust autoplay: only fade the video in once it's actually playing.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onPlaying = () => setVideoReady(true);
    const tryPlay = () => v.play().catch(() => {});

    v.addEventListener("playing", onPlaying);
    v.addEventListener("loadeddata", tryPlay);
    v.addEventListener("canplay", tryPlay);

    // Pause when off-screen to avoid jank when scrolled away.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) tryPlay();
        else v.pause();
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
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col">
      {/* 1. Static poster — paints instantly, anchors the composition */}
      <img
        src={POSTER}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      {/* 2. Video crossfades over poster once playing */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-[1200ms]"
        style={{ opacity: videoReady ? 1 : 0 }}
        src={HERO_VIDEO}
        muted
        autoPlay
        loop
        playsInline
        preload="auto"
        poster={POSTER}
      />
      {/* 3. Layered overlays — strong vignette + bottom fade so type pops */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.1)_0%,_rgba(0,0,0,0.55)_55%,_rgba(0,0,0,0.92)_100%)]" />
      <div className="absolute inset-0 pointer-events-none bg-black/40" />
      <div className="absolute inset-x-0 bottom-0 h-64 pointer-events-none bg-gradient-to-b from-transparent via-black/75 to-black" />
      <div className="absolute inset-x-0 top-0 h-32 pointer-events-none bg-gradient-to-b from-black/80 to-transparent" />

      <Navbar />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center -translate-y-[3%]">
        {/* Plain, factual eyebrow — replaces the badge */}
        <div className="text-white/65 text-[11px] sm:text-xs tracking-[0.32em] uppercase mb-7 animate-fade-rise">
          Nosyt&nbsp;LLC&nbsp;·&nbsp;Est.&nbsp;2025
        </div>

        <h1 className="text-serif text-white tracking-[-0.025em] leading-[0.94] text-[3.25rem] sm:text-7xl md:text-8xl lg:text-[8.5rem] xl:text-[10rem] max-w-[1200px] animate-fade-rise-d1">
          Notable opportunities{" "}
          <span className="text-italic-serif text-white/70">shape</span>{" "}
          your <span className="text-italic-serif shimmer-text">tomorrow</span>.
        </h1>

        <p className="mt-8 max-w-xl text-white/85 text-base sm:text-lg leading-relaxed animate-fade-rise-d2">
          A small independent studio shipping AI agents, MCP servers, and
          quietly useful tools — built openly, run by people, not pipelines.
        </p>

        <form
          className="mt-10 w-full max-w-lg animate-fade-rise-d3"
          onSubmit={(e) => {
            e.preventDefault();
            if (/^\S+@\S+\.\S+$/.test(email)) {
              setSubmitted(true);
              setEmail("");
            }
          }}
        >
          <div className="liquid-glass-strong rounded-full pl-6 pr-2 py-2 flex items-center gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={
                submitted
                  ? "Thanks — see you in the next note."
                  : "your@email.com"
              }
              className="flex-1 bg-transparent outline-none text-white placeholder:text-white/55 text-sm py-2.5"
              aria-label="Email address"
            />
            <button
              type="submit"
              aria-label="Subscribe to build notes"
              className="bg-white rounded-full px-5 py-2.5 text-black text-sm font-medium hover:bg-white/90 active:scale-95 transition flex items-center gap-1.5"
            >
              Get notes
              <ArrowRight size={14} strokeWidth={2.4} />
            </button>
          </div>
          <p className="mt-3 text-white/45 text-xs">
            Occasional build notes. No spam, no funnel.
          </p>
        </form>

        <div className="mt-10 flex items-center gap-2.5 animate-fade-rise-d4">
          <SocialPill href="https://github.com/NosytLabs" label="GitHub">
            <Github size={16} />
          </SocialPill>
          <SocialPill
            href="https://www.youtube.com/channel/UC_tgfMnIcskFOjY3bX9T2QQ"
            label="YouTube"
          >
            <Youtube size={16} />
          </SocialPill>
          <SocialPill href="https://x.com/NosytLabs" label="X">
            <Twitter size={16} />
          </SocialPill>
          <SocialPill
            href="https://open.spotify.com/artist/0Au3MjZ2Yll5St15Nt2RDq"
            label="Spotify"
          >
            <SiSpotify size={16} />
          </SocialPill>
        </div>
      </div>

      {/* Real, simple footer caption instead of fake stats */}
      <div className="relative z-10 pb-10 px-6 animate-fade-rise-d4">
        <div className="mx-auto max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-3 text-white/55 text-[11px] tracking-[0.22em] uppercase">
          <span>Independent · Open Source · Run by humans</span>
          <a
            href="#about"
            className="text-white/70 hover:text-white transition-colors normal-case tracking-normal text-sm"
          >
            Scroll to read ↓
          </a>
        </div>
      </div>
    </section>
  );
}

function SocialPill({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="liquid-glass rounded-full p-3 text-white/85 hover:text-white hover:bg-white/[0.06] transition-all hover:scale-105"
    >
      {children}
    </a>
  );
}
