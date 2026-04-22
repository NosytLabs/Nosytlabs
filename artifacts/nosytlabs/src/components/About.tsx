import Reveal from "./Reveal";

const BACKRONYM = [
  { letter: "N", word: "Notable" },
  { letter: "O", word: "Opportunities" },
  { letter: "S", word: "Shape" },
  { letter: "Y", word: "Your" },
  { letter: "T", word: "Tomorrow" },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative bg-black pt-32 md:pt-44 pb-20 md:pb-28 px-6 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_rgba(216,184,122,0.05)_0%,_transparent_60%)]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_bottom,_rgba(255,255,255,0.03)_0%,_transparent_70%)]" />

      <div className="relative max-w-6xl mx-auto">
        <Reveal>
          <div className="text-white/40 text-xs sm:text-sm tracking-[0.3em] uppercase mb-6">
            The Lab · Est. {new Date().getFullYear()}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="text-serif text-4xl md:text-6xl lg:text-7xl text-white leading-[1.05] tracking-tight max-w-5xl">
            Pioneering <span className="text-italic-serif text-white/55">ideas</span> for
            <br className="hidden md:block" /> minds that{" "}
            <span className="text-italic-serif text-white/55">create, build, and inspire.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.25}>
          <p className="mt-10 max-w-2xl text-white/60 text-base md:text-lg leading-relaxed">
            We build AI agents, prompt platforms, and quietly unreasonable
            developer tools. Our name is a contract — five letters, one
            promise: that the work we ship today shapes a better tomorrow for
            the people who use it.
          </p>
        </Reveal>

        {/* N · O · S · Y · T backronym lockup */}
        <div className="mt-20 md:mt-28 grid grid-cols-1 sm:grid-cols-5 gap-x-10 gap-y-12">
          {BACKRONYM.map((b, i) => (
            <Reveal key={b.letter} delay={0.1 + i * 0.08} y={40}>
              <div className="group">
                <div className="flex items-baseline gap-3">
                  <span className="text-serif text-7xl md:text-8xl text-white/85 leading-none tracking-tighter group-hover:text-[#d8b87a] transition-colors duration-700">
                    {b.letter}
                  </span>
                  <span className="text-italic-serif text-white/30 text-xl md:text-2xl">·</span>
                </div>
                <div className="mt-4 text-italic-serif text-white/70 text-2xl md:text-3xl">
                  {b.word}
                </div>
                <div className="mt-3 h-px w-10 bg-white/20 group-hover:w-full group-hover:bg-[#d8b87a]/60 transition-all duration-700" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
