import Reveal from "./Reveal";

const LINES = [
  "We build for the curious-by-default.",
  "We choose the question over the easy answer.",
  "We ship small, sharp, and on purpose.",
  "We treat every artifact as a quiet promise.",
  "And we believe that notable opportunities — the ones that matter — shape your tomorrow.",
];

export default function Manifesto() {
  return (
    <section
      id="manifesto"
      className="relative bg-black py-28 md:py-44 px-6 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.04)_0%,_transparent_70%)]" />
      <div className="max-w-4xl mx-auto text-center">
        <Reveal>
          <div className="text-white/40 text-xs tracking-[0.3em] uppercase mb-8">
            Manifesto
          </div>
        </Reveal>
        <div className="space-y-7 md:space-y-9">
          {LINES.map((line, i) => (
            <Reveal key={i} delay={i * 0.1} y={36}>
              <p
                className={`text-serif text-3xl md:text-5xl lg:text-6xl leading-[1.15] tracking-tight ${
                  i === LINES.length - 1
                    ? "text-italic-serif text-white"
                    : "text-white/85"
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
