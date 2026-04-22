import Reveal from "./Reveal";

const PILLARS = [
  {
    label: "Agents",
    title: "AI agents that ship work.",
    body: "Specialized agents and gateways — like the OpenClaw stack — that run real workflows on real machines, including Android via Termux.",
  },
  {
    label: "MCP & Skills",
    title: "Open infrastructure for tooling.",
    body: "Free MCP servers (image generation, TTS), Presearch search skills, and reusable building blocks designed for agent ecosystems.",
  },
  {
    label: "Prompts & SaaS",
    title: "Prompt systems &amp; products.",
    body: "From the AI Empire prompt library to the AI Newsletter SaaS — practical systems that turn prompting into a craft.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative bg-black pt-32 md:pt-40 pb-24 md:pb-32 px-6 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.04)_0%,_transparent_60%)]" />

      <div className="relative max-w-6xl mx-auto">
        <Reveal>
          <div className="text-white/55 text-xs sm:text-sm tracking-[0.3em] uppercase mb-6">
            The Lab
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="text-serif text-4xl md:text-6xl lg:text-7xl text-white leading-[1.05] tracking-tight max-w-5xl">
            An independent lab for{" "}
            <span className="text-italic-serif text-white/70">AI agents</span>,
            open <span className="text-italic-serif text-white/70">tooling</span>,
            and <span className="text-italic-serif text-white/70">side quests</span>.
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-10 max-w-2xl text-white/75 text-base md:text-lg leading-relaxed">
            NosytLabs is a small, independent operation. No funding round, no
            roadmap deck — just an open GitHub, a YouTube channel, and a
            steady output of agents, MCP servers, and prompt systems. The
            music project on Spotify is a side quest from the same desk.
          </p>
        </Reveal>

        {/* Three pillars — replaces the backronym */}
        <div className="mt-20 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {PILLARS.map((p, i) => (
            <Reveal key={p.label} delay={0.1 + i * 0.1} y={40}>
              <div className="liquid-glass rounded-3xl p-7 md:p-8 h-full flex flex-col">
                <div className="text-white/60 text-[11px] tracking-[0.28em] uppercase mb-5">
                  {p.label}
                </div>
                <h3
                  className="text-serif text-2xl md:text-3xl text-white leading-tight tracking-tight mb-4"
                  dangerouslySetInnerHTML={{ __html: p.title }}
                />
                <p
                  className="text-white/65 text-[15px] leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: p.body }}
                />
                <div className="mt-6 h-px w-10 bg-white/30" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
