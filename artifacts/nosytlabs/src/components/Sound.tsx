import Reveal from "./Reveal";

export default function Sound() {
  return (
    <section
      id="sound"
      className="relative bg-black py-28 md:py-36 px-6 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.05)_0%,_transparent_60%)]" />
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <Reveal x={-30}>
            <div>
              <div className="text-white/55 text-xs tracking-[0.3em] uppercase mb-5">
                Side quest · Music
              </div>
              <h2 className="text-serif text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.05]">
                There&rsquo;s also a{" "}
                <span className="text-italic-serif text-white/70">
                  music project.
                </span>
              </h2>
              <p className="mt-7 text-white/80 text-base md:text-lg leading-relaxed max-w-md">
                When the agents stop running for the night, the same person
                sometimes makes music as <em className="text-italic-serif text-white">Nosyt</em>.
                It&rsquo;s a side project, not a pivot — quiet textures and
                slow loops, on Spotify and YouTube.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="https://open.spotify.com/artist/0Au3MjZ2Yll5St15Nt2RDq"
                  target="_blank"
                  rel="noreferrer"
                  className="liquid-glass-strong rounded-full px-6 py-3 text-white text-sm font-medium hover:scale-[1.03] active:scale-95 transition"
                >
                  Spotify →
                </a>
                <a
                  href="https://www.youtube.com/channel/UC_tgfMnIcskFOjY3bX9T2QQ"
                  target="_blank"
                  rel="noreferrer"
                  className="liquid-glass rounded-full px-6 py-3 text-white text-sm font-medium hover:bg-white/[0.05] transition"
                >
                  YouTube channel →
                </a>
              </div>
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
