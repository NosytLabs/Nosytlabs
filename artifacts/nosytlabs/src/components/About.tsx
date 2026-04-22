import Reveal from "./Reveal";

const PILLARS = [
  {
    label: "Agents",
    title: "Agents that ship work.",
    body: "Small, specialized AI agents — including the OpenClaw Droid gateway running on Android via Termux — designed to do real work on real machines.",
  },
  {
    label: "MCP & Skills",
    title: "Tooling for the agent era.",
    body: "Open-source MCP servers (image generation, TTS) and clean SKILL.md files like the Presearch search skill — the building blocks other agents plug into.",
  },
  {
    label: "Prompts & SaaS",
    title: "Prompt systems & products.",
    body: "From the AI Empire prompt library to the AI Newsletter SaaS — practical systems that turn prompting into a craft and ship into the world.",
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
          <div className="text-white/65 text-xs sm:text-sm tracking-[0.3em] uppercase mb-6">
            About — The studio
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="text-serif text-4xl md:text-6xl lg:text-7xl text-white leading-[1.05] tracking-tight max-w-5xl">
            Nosyt&nbsp;LLC is a{" "}
            <span className="text-italic-serif text-white/70">small studio</span>{" "}
            for AI agents, open tooling, and the occasional{" "}
            <span className="text-italic-serif text-white/70">side project</span>.
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-10 grid md:grid-cols-[2fr_1fr] gap-10 md:gap-16 items-end">
            <p className="max-w-2xl text-white/85 text-base md:text-lg leading-relaxed">
              Nosyt&nbsp;LLC was registered in 2025. It&rsquo;s a one-desk
              operation: no funding round, no roadmap deck, no growth team.
              Just an open GitHub, a YouTube channel, and a steady output of
              agents, MCP servers, and prompt systems that quietly try to be
              useful. The music project on Spotify is a side quest from the
              same desk.
            </p>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-5 md:border-l md:border-white/10 md:pl-10">
              <Fact k="Founded" v="2025" />
              <Fact k="Entity" v="Nosyt LLC" />
              <Fact k="Mode" v="Independent" />
              <Fact k="License" v="Mostly OSS" />
            </dl>
          </div>
        </Reveal>

        <div className="mt-20 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {PILLARS.map((p, i) => (
            <Reveal key={p.label} delay={0.1 + i * 0.1} y={40}>
              <div className="liquid-glass rounded-3xl p-7 md:p-8 h-full flex flex-col">
                <div className="text-white/65 text-[11px] tracking-[0.28em] uppercase mb-5">
                  {p.label}
                </div>
                <h3 className="text-serif text-2xl md:text-3xl text-white leading-tight tracking-tight mb-4">
                  {p.title}
                </h3>
                <p className="text-white/75 text-[15px] leading-relaxed">
                  {p.body}
                </p>
                <div className="mt-6 h-px w-10 bg-white/30" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Fact({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="text-white/55 text-[11px] tracking-[0.22em] uppercase">{k}</dt>
      <dd className="text-serif text-white text-2xl md:text-3xl tracking-tight mt-1">{v}</dd>
    </div>
  );
}
