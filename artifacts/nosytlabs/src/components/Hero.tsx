import { useEffect, useRef, useState } from "react";
import { ArrowRight, Github, Youtube, Twitter } from "lucide-react";
import { SiSpotify } from "react-icons/si";
import Navbar from "./Navbar";

const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260330_145725_08886141-ed95-4a8e-8d6d-b75eaadce638.mp4";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const tryPlay = () => v.play().catch(() => {});
    v.addEventListener("loadeddata", tryPlay);
    return () => v.removeEventListener("loadeddata", tryPlay);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col">
      {/* Background video - native loop */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover object-center"
        src={HERO_VIDEO}
        muted
        autoPlay
        loop
        playsInline
        preload="auto"
        style={{ animation: "fade-rise 1.2s cubic-bezier(.2,.7,.2,1) both" }}
      />
      {/* Layered overlays — strong vignette for contrast */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.15)_0%,_rgba(0,0,0,0.55)_55%,_rgba(0,0,0,0.92)_100%)]" />
      <div className="absolute inset-0 pointer-events-none bg-black/35" />
      <div className="absolute inset-x-0 bottom-0 h-56 pointer-events-none bg-gradient-to-b from-transparent via-black/70 to-black" />
      <div className="absolute inset-x-0 top-0 h-32 pointer-events-none bg-gradient-to-b from-black/80 to-transparent" />

      <Navbar />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center -translate-y-[4%]">
        <div className="liquid-glass rounded-full px-4 py-1.5 text-[11px] tracking-[0.22em] uppercase text-white/85 mb-7 animate-fade-rise">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-white mr-2 align-middle pulse-ring" />
          Independent AI &amp; Tools Lab · Active
        </div>

        <h1 className="text-serif text-white tracking-[-0.025em] leading-[0.94] text-[3.25rem] sm:text-7xl md:text-8xl lg:text-[8.5rem] xl:text-[10rem] max-w-[1200px] animate-fade-rise-d1">
          Notable opportunities{" "}
          <span className="text-italic-serif text-white/70">shape</span>{" "}
          your <span className="text-italic-serif shimmer-text">tomorrow</span>.
        </h1>

        <p className="mt-8 max-w-xl text-white/80 text-base sm:text-lg leading-relaxed animate-fade-rise-d2">
          We&rsquo;re an independent lab building AI agents, MCP servers, and
          tools for the people who actually ship.
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
                  ? "You're on the list — see you in the lab."
                  : "Get build notes — your@email.com"
              }
              className="flex-1 bg-transparent outline-none text-white placeholder:text-white/55 text-sm py-2.5"
              aria-label="Email address"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="bg-white rounded-full px-5 py-2.5 text-black text-sm font-medium hover:bg-white/90 active:scale-95 transition flex items-center gap-1.5"
            >
              Subscribe
              <ArrowRight size={14} strokeWidth={2.4} />
            </button>
          </div>
        </form>

        {/* Social row inline */}
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

      {/* Stats strip — real, anchored to actual project data */}
      <div className="relative z-10 pb-12 px-6 animate-fade-rise-d4">
        <div className="liquid-glass mx-auto max-w-3xl rounded-2xl px-6 py-4 grid grid-cols-3 gap-4 text-center">
          <Stat n="9+" label="Open-source repos" />
          <Stat n="OpenClaw" label="MCP ecosystem" />
          <Stat n="2026" label="Active &amp; shipping" />
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

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-serif text-2xl md:text-3xl text-white tracking-tight">
        {n}
      </div>
      <div
        className="text-white/60 text-[10px] sm:text-[11px] tracking-[0.18em] uppercase mt-1"
        dangerouslySetInnerHTML={{ __html: label }}
      />
    </div>
  );
}
