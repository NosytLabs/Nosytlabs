import Reveal from "./Reveal";

const PILLARS = [
  {
    n: "01",
    label: "Agents",
    title: "Agents that do real work.",
    body: "Specialized AI agents — including the OpenClaw Droid gateway running on Android via Termux — built to execute, not impress.",
  },
  {
    n: "02",
    label: "MCP & Skills",
    title: "Tooling for the agent era.",
    body: "Open-source MCP servers (image, TTS) and clean SKILL.md files like the Presearch search skill — the building blocks others plug into.",
  },
  {
    n: "03",
    label: "Experiments",
    title: "Side projects, in public.",
    body: "Browser games like Tidefall (Phaser), prompt libraries, and the occasional one-off — all open, all logged in commits anyone can read.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative bg-[#0a0a0b] pt-32 md:pt-40 pb-24 md:pb-32 px-6 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_rgba(245,241,232,0.04)_0%,_transparent_60%)]" />

      <div className="relative max-w-6xl mx-auto">
        <Reveal>
          <div className="text-mono text-[#f5f1e8]/65 text-[11px] tracking-[0.3em] uppercase mb-6">
            01 — The studio
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="text-serif text-4xl md:text-6xl lg:text-7xl text-[#f5f1e8] leading-[1.05] tracking-tight max-w-5xl">
            Nosyt is a{" "}
            <span className="text-italic-serif text-[#d8b87a]">small studio</span>{" "}
            for AI agents, open tooling, and the occasional{" "}
            <span className="text-italic-serif text-[#d8b87a]">side project</span>.
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-12 grid md:grid-cols-[2fr_1fr] gap-10 md:gap-16 items-end">
            <p className="max-w-2xl text-[#f5f1e8]/85 text-base md:text-lg leading-relaxed">
              Nosytlabs was registered as Nosyt&nbsp;LLC in early 2025 —
              a one-person studio working out of a single desk. No funding
              round, no investor deck, no growth team. The output is what
              you&rsquo;ll find on GitHub: agents, MCP servers, prompt
              systems, and the occasional experiment. Music gets released
              under the same name when a track is ready.
            </p>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-5 md:border-l md:border-[#f5f1e8]/10 md:pl-10">
              <Fact k="Founded" v="2025" />
              <Fact k="Studio" v="Nosytlabs" />
              <Fact k="Mode" v="Independent" />
              <Fact k="License" v="Mostly OSS" />
            </dl>
          </div>
        </Reveal>

        <div className="mt-20 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-px bg-[#f5f1e8]/10 rounded-3xl overflow-hidden">
          {PILLARS.map((p, i) => (
            <Reveal key={p.label} delay={0.1 + i * 0.08} y={30}>
              <div className="bg-[#0a0a0b] p-8 md:p-10 h-full flex flex-col">
                <div className="flex items-center justify-between mb-7">
                  <div className="text-mono text-[#f5f1e8]/65 text-[11px] tracking-[0.28em] uppercase">
                    {p.label}
                  </div>
                  <div className="text-mono text-[#f5f1e8]/35 text-[11px] tracking-wider">
                    {p.n}
                  </div>
                </div>
                <h3 className="text-serif text-2xl md:text-3xl text-[#f5f1e8] leading-tight tracking-tight mb-4">
                  {p.title}
                </h3>
                <p className="text-[#f5f1e8]/75 text-[15px] leading-relaxed">
                  {p.body}
                </p>
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
      <dt className="text-mono text-[#f5f1e8]/55 text-[10px] tracking-[0.22em] uppercase">{k}</dt>
      <dd className="text-serif text-[#f5f1e8] text-2xl md:text-3xl tracking-tight mt-1">{v}</dd>
    </div>
  );
}
