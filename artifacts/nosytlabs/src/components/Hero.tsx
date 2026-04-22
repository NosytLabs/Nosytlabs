import { useEffect, useRef, useState } from "react";
import { ArrowRight, Github, Youtube, Twitter, Globe } from "lucide-react";
import { SiSpotify } from "react-icons/si";
import Navbar from "./Navbar";

const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260330_145725_08886141-ed95-4a8e-8d6d-b75eaadce638.mp4";

function animateOpacity(el: HTMLElement, from: number, to: number, ms: number) {
  const start = performance.now();
  const tick = (t: number) => {
    const k = Math.min(1, (t - start) / ms);
    el.style.opacity = String(from + (to - from) * k);
    if (k < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.style.opacity = "0";

    const onCanPlay = () => {
      void v.play().catch(() => {});
      animateOpacity(v, 0, 1, 700);
    };
    const onTime = () => {
      const remaining = v.duration - v.currentTime;
      if (remaining > 0 && remaining <= 0.55) {
        animateOpacity(v, parseFloat(v.style.opacity || "1"), 0, 500);
      }
    };
    const onEnded = () => {
      v.style.opacity = "0";
      setTimeout(() => {
        v.currentTime = 0;
        void v.play().catch(() => {});
        animateOpacity(v, 0, 1, 500);
      }, 100);
    };

    v.addEventListener("canplay", onCanPlay);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("ended", onEnded);
    return () => {
      v.removeEventListener("canplay", onCanPlay);
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("ended", onEnded);
    };
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col">
      {/* Background video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover object-center"
        src={HERO_VIDEO}
        muted
        autoPlay
        playsInline
        preload="auto"
      />
      {/* Vignette + gradient overlays */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0)_30%,_rgba(0,0,0,0.55)_75%,_rgba(0,0,0,0.95)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-48 pointer-events-none bg-gradient-to-b from-transparent to-black" />
      <div className="absolute inset-x-0 top-0 h-32 pointer-events-none bg-gradient-to-b from-black/70 to-transparent" />

      <Navbar />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center -translate-y-[6%]">
        <div className="liquid-glass rounded-full px-4 py-1.5 text-[11px] tracking-[0.22em] uppercase text-white/70 mb-7 animate-fade-rise">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#d8b87a] mr-2 align-middle pulse-ring" />
          NosytLabs · Research Lab
        </div>

        <h1
          className="text-serif text-white tracking-[-0.03em] leading-[0.92] text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[9rem] max-w-6xl animate-fade-rise-d1"
        >
          Notable opportunities{" "}
          <span className="text-italic-serif text-white/55">shape</span>{" "}
          your <span className="text-italic-serif shimmer-text">tomorrow</span>.
        </h1>

        <p className="mt-7 max-w-xl text-white/65 text-base sm:text-lg leading-relaxed font-normal animate-fade-rise-d2">
          NosytLabs is a quiet research studio building AI agents, prompt
          systems, and unreasonable tools for builders, thinkers, and the
          curious-by-default.
        </p>

        <form
          className="mt-9 w-full max-w-xl animate-fade-rise-d3"
          onSubmit={(e) => {
            e.preventDefault();
            if (email) setSubmitted(true);
          }}
        >
          <div className="liquid-glass rounded-full pl-6 pr-2 py-2 flex items-center gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={submitted ? "You're on the list — see you in the lab." : "your@email.com"}
              className="flex-1 bg-transparent outline-none text-white placeholder:text-white/40 text-sm py-2"
              aria-label="Email address"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="bg-white rounded-full p-3 text-black hover:scale-[1.04] active:scale-95 transition-transform"
            >
              <ArrowRight size={18} strokeWidth={2.2} />
            </button>
          </div>
        </form>

        <div className="mt-7 flex items-center gap-3 animate-fade-rise-d4">
          <a
            href="#manifesto"
            className="liquid-glass rounded-full px-7 py-3 text-white text-sm font-medium hover:bg-white/[0.04] transition-colors"
          >
            Read the manifesto
          </a>
          <a
            href="#projects"
            className="rounded-full px-7 py-3 text-white/70 text-sm font-medium hover:text-white transition-colors"
          >
            See what we ship →
          </a>
        </div>
      </div>

      {/* Social row */}
      <div className="relative z-10 flex justify-center gap-3 pb-10 animate-fade-rise-d4">
        <a
          href="https://github.com/NosytLabs"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          className="liquid-glass rounded-full p-3.5 text-white/80 hover:text-white hover:bg-white/[0.04] transition-all"
        >
          <Github size={18} />
        </a>
        <a
          href="https://www.youtube.com/channel/UC_tgfMnIcskFOjY3bX9T2QQ"
          target="_blank"
          rel="noreferrer"
          aria-label="YouTube"
          className="liquid-glass rounded-full p-3.5 text-white/80 hover:text-white hover:bg-white/[0.04] transition-all"
        >
          <Youtube size={18} />
        </a>
        <a
          href="https://x.com/NosytLabs"
          target="_blank"
          rel="noreferrer"
          aria-label="X / Twitter"
          className="liquid-glass rounded-full p-3.5 text-white/80 hover:text-white hover:bg-white/[0.04] transition-all"
        >
          <Twitter size={18} />
        </a>
        <a
          href="https://open.spotify.com/artist/0Au3MjZ2Yll5St15Nt2RDq"
          target="_blank"
          rel="noreferrer"
          aria-label="Spotify"
          className="liquid-glass rounded-full p-3.5 text-white/80 hover:text-white hover:bg-white/[0.04] transition-all"
        >
          <SiSpotify size={18} />
        </a>
        <a
          href="https://nosytlabs.com"
          target="_blank"
          rel="noreferrer"
          aria-label="Website"
          className="liquid-glass rounded-full p-3.5 text-white/80 hover:text-white hover:bg-white/[0.04] transition-all"
        >
          <Globe size={18} />
        </a>
      </div>
    </section>
  );
}
