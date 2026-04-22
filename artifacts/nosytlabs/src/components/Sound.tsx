import Reveal from "./Reveal";

export default function Sound() {
  return (
    <section
      id="sound"
      className="relative bg-black py-28 md:py-40 px-6 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_rgba(216,184,122,0.06)_0%,_transparent_60%)]" />
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <Reveal x={-30}>
            <div>
              <div className="text-white/40 text-xs tracking-[0.28em] uppercase mb-5">
                A Side Project
              </div>
              <h2 className="text-serif text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.05]">
                Sound from the{" "}
                <span className="text-italic-serif text-white/55">lab.</span>
              </h2>
              <p className="mt-7 text-white/65 text-base md:text-lg leading-relaxed max-w-md">
                Nosyt is the music side of the studio — quiet electronic
                textures, slow ambient grooves, and late-night experiments
                from the same builders behind the code.
              </p>
              <a
                href="https://open.spotify.com/artist/0Au3MjZ2Yll5St15Nt2RDq"
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-2 liquid-glass rounded-full px-7 py-3.5 text-white text-sm font-medium hover:bg-white/[0.04] transition-colors"
              >
                Listen on Spotify →
              </a>
            </div>
          </Reveal>

          <Reveal x={30}>
            <div className="liquid-glass-strong rounded-[28px] p-3 md:p-4">
              <iframe
                title="Nosyt on Spotify"
                src="https://open.spotify.com/embed/artist/0Au3MjZ2Yll5St15Nt2RDq?utm_source=generator&theme=0"
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
