import Reveal from "./Reveal";

const PILLARS = [
  {
    n: "01",
    label: "Sites & Agents",
    title: "Sites, apps, and agents.",
    body: "The studio takes on small sites, focused web apps, and AI agents like OpenClaw Droid — an OpenClaw gateway built to run inside Termux on Android. Useful first, clever second.",
  },
  {
    n: "02",
    label: "MCP & Tooling",
    title: "MCP servers and tools.",
    body: "Open-source MCP servers for image generation and text-to-speech, plus clean SKILL.md files like the Presearch search skill. Custom tooling built to scope — no API keys needed for the basics.",
  },
  {
    n: "03",
    label: "Experiments",
    title: "The side projects, too.",
    body: "Browser games like Tidefall, prompt libraries, the occasional one-off. They live on GitHub next to everything else.",
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
            Nosytlabs is a{" "}
            <span className="text-italic-serif text-[#d8b87a]">one-person studio</span>{" "}
            you can{" "}
            <span className="text-italic-serif text-[#d8b87a]">hire</span>{" "}
            for sites, agents, and open tooling.
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-12 grid md:grid-cols-[2fr_1fr] gap-10 md:gap-16 items-end">
            <p className="max-w-2xl text-[#f5f1e8]/85 text-base md:text-lg leading-relaxed">
              Nosytlabs was registered as Nosyt&nbsp;LLC in early 2025.
              One person, one desk, one bet — that small, sharp, open
              tools age better than sprawling platforms. Available for
              focused work across sites, web apps, AI agents, MCP servers,
              and custom tooling. The full output lives on GitHub.
            </p>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-5 md:border-l md:border-[#f5f1e8]/10 md:pl-10">
              <Fact k="Founded" v="2025" />
              <Fact k="Studio" v="Nosytlabs" />
              <Fact k="Status" v="Available" />
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
