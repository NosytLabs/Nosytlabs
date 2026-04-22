import Reveal from "./Reveal";
import { LINKS } from "@/lib/links";

export default function FeaturedVideo() {
  return (
    <section className="relative bg-[#0a0a0b] py-24 md:py-32 px-6 overflow-hidden border-t border-[#f5f1e8]/5">
      <div className="max-w-6xl mx-auto">
        <Reveal y={40}>
          <div className="text-mono text-[#f5f1e8]/65 text-[11px] tracking-[0.3em] uppercase mb-12">
            02 — Working in the open
          </div>

          <div className="grid md:grid-cols-[1.2fr_1fr] gap-10 md:gap-14 items-stretch">
            {/* Left: Cosmic plate with overlaid statement */}
            <div className="relative rounded-[28px] overflow-hidden aspect-[4/3] md:aspect-auto md:min-h-[480px] liquid-glass">
              <img
                src="/img/cosmos-mirror.png"
                alt="A figure at the edge of a still mirrored plain under a vast starry sky."
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/55 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0b]/55 via-transparent to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-7 md:p-10">
                <div className="text-mono text-[#f5f1e8]/70 text-[11px] tracking-[0.3em] uppercase mb-3">
                  The view from one desk
                </div>
                <p className="text-serif text-2xl sm:text-3xl md:text-4xl text-[#f5f1e8] leading-[1.15] tracking-tight max-w-md">
                  Small enough that{" "}
                  <span className="text-italic-serif text-[#d8b87a]">
                    openness
                  </span>{" "}
                  is the only honest mode.
                </p>
              </div>
            </div>

            {/* Right: text + CTAs */}
            <div className="flex flex-col justify-center md:pl-4">
              <p className="text-serif text-3xl sm:text-4xl md:text-5xl text-[#f5f1e8] leading-[1.12] tracking-tight">
                Every project lives on{" "}
                <a
                  href={LINKS.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-italic-serif text-[#d8b87a] hover:underline underline-offset-8 decoration-[#d8b87a]/40"
                >
                  GitHub
                </a>
                , walked through on{" "}
                <a
                  href={LINKS.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="text-italic-serif text-[#d8b87a] hover:underline underline-offset-8 decoration-[#d8b87a]/40"
                >
                  YouTube
                </a>
                , and shipped without a marketing department.
              </p>
              <p className="mt-7 text-[#f5f1e8]/75 text-[15px] leading-relaxed max-w-md">
                Read the source. File an issue. Fork it. The studio is small
                enough that openness is the only honest mode of operation.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={LINKS.github}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#f5f1e8] text-[#0a0a0b] rounded-full px-6 py-3 text-sm font-medium hover:bg-[#f5f1e8]/90 active:scale-95 transition"
                >
                  Browse the code →
                </a>
                <a
                  href={LINKS.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="liquid-glass rounded-full px-6 py-3 text-[#f5f1e8] text-sm font-medium hover:bg-white/[0.05] transition"
                >
                  Watch on YouTube →
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
