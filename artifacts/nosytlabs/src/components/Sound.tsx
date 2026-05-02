import Reveal from "./Reveal";
import { LINKS } from "@/lib/links";

export default function Sound() {
  return (
    <section
      id="sound"
      className="relative bg-[#0a0a0b] py-24 md:py-32 px-6 overflow-hidden border-t border-[#f5f1e8]/5"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <Reveal x={-20}>
            <div>
              <div className="text-mono text-[#f5f1e8]/65 text-[11px] tracking-[0.3em] uppercase mb-6">
                06 — Music
              </div>
              <h2 className="text-serif text-5xl md:text-6xl lg:text-7xl text-[#f5f1e8] tracking-tight leading-[1.05]">
                There&rsquo;s also a{" "}
                <span className="text-italic-serif text-[#d8b87a]">
                  music project.
                </span>
              </h2>
              <p className="mt-7 text-[#f5f1e8]/85 text-base md:text-lg leading-relaxed max-w-md">
                Same person, different output. Released as{" "}
                <em className="text-italic-serif text-[#d8b87a]">Nosyt</em> —
                ambient textures and slow loops, on Spotify when a track is
                ready.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={LINKS.spotify}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#f5f1e8] text-[#0a0a0b] rounded-full px-6 py-3 text-sm font-medium hover:bg-[#f5f1e8]/90 active:scale-[0.97] motion-reduce:active:scale-100 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d8b87a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
                >
                  Listen on Spotify →
                </a>
                <a
                  href={LINKS.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="liquid-glass rounded-full px-6 py-3 text-[#f5f1e8] text-sm font-medium hover:bg-white/[0.05] transition"
                >
                  YouTube channel →
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal x={20}>
            <div className="liquid-glass-strong rounded-[28px] p-3 md:p-4">
              <iframe
                title="Nosyt on Spotify"
                src={LINKS.spotifyEmbed}
                width="100%"
                height="380"
                frameBorder={0}
                style={{ borderRadius: 20, background: "transparent" }}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
