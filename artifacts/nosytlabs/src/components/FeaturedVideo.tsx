import Reveal from "./Reveal";

// Replaces the autoplaying "earth video" with a still cosmic plate +
// typographic statement. Faster, calmer, more honest.
export default function FeaturedVideo() {
  return (
    <section className="relative bg-black pt-6 md:pt-10 pb-24 md:pb-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <Reveal y={40} duration={0.95}>
          <div className="relative rounded-[28px] md:rounded-[36px] overflow-hidden aspect-[16/9] liquid-glass">
            <img
              src="/img/cosmos-mirror.png"
              alt="A figure stands on a still mirrored plain under a starlit sky."
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12">
              <div className="max-w-2xl">
                <div className="text-white/70 text-[11px] tracking-[0.3em] uppercase mb-4">
                  Working in the open
                </div>
                <p className="text-serif text-2xl sm:text-3xl md:text-5xl text-white leading-[1.15] tracking-tight">
                  Every project is built on{" "}
                  <span className="text-italic-serif text-white/75">GitHub</span>,
                  walked through on{" "}
                  <span className="text-italic-serif text-white/75">YouTube</span>,
                  and shipped without a marketing department.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href="https://github.com/NosytLabs"
                    target="_blank"
                    rel="noreferrer"
                    className="liquid-glass-strong rounded-full px-6 py-3 text-white text-sm font-medium hover:scale-[1.03] active:scale-95 transition"
                  >
                    Browse the code →
                  </a>
                  <a
                    href="https://www.youtube.com/channel/UC_tgfMnIcskFOjY3bX9T2QQ"
                    target="_blank"
                    rel="noreferrer"
                    className="liquid-glass rounded-full px-6 py-3 text-white text-sm font-medium hover:bg-white/[0.05] transition"
                  >
                    Watch on YouTube →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
