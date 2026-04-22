import Reveal from "./Reveal";

const LINES = [
  "We build for the curious-by-default.",
  "We choose the question over the easy answer.",
  "We ship small, sharp, and on purpose.",
  "We treat every repo as a quiet promise.",
  "And we believe notable opportunities — the ones that matter — shape your tomorrow.",
];

export default function Manifesto() {
  return (
    <section
      id="manifesto"
      className="relative bg-[#0a0a0b] py-28 md:py-40 px-6 overflow-hidden border-t border-[#f5f1e8]/5"
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_rgba(216,184,122,0.06)_0%,_transparent_70%)]" />
      <div className="max-w-4xl mx-auto text-center relative">
        <Reveal>
          <div className="text-mono text-[#f5f1e8]/65 text-[11px] tracking-[0.3em] uppercase mb-10">
            05 — Manifesto
          </div>
        </Reveal>
        <div className="space-y-7 md:space-y-9">
          {LINES.map((line, i) => (
            <Reveal key={i} delay={i * 0.1} y={30}>
              <p
                className={`text-serif text-[1.75rem] sm:text-3xl md:text-5xl lg:text-6xl leading-[1.15] tracking-tight ${
                  i === LINES.length - 1
                    ? "text-italic-serif text-[#f5f1e8]"
                    : "text-[#f5f1e8]/90"
                }`}
              >
                {line}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
