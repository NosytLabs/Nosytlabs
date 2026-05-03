import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

const WORK_TYPES = [
  {
    n: "01",
    label: "Sites & Web Apps",
    body: "Small marketing sites, landing pages, and focused web apps. Clean code, deployed — not sprawling platforms.",
  },
  {
    n: "02",
    label: "AI Agents",
    body: "Custom agents for real workflows — not ChatGPT wrappers. OpenClaw-compatible, local-first where possible, documented thoroughly.",
  },
  {
    n: "03",
    label: "MCP Servers",
    body: "Model Context Protocol servers for tools your team already uses. Open source by default; private builds on request.",
  },
  {
    n: "04",
    label: "Custom Tooling",
    body: "CLI tools, automation scripts, and developer utilities. Scope tight, timeline honest, nothing gold-plated.",
  },
];

export default function Opportunities() {
  return (
    <section
      id="opportunities"
      className="relative bg-[#0a0a0b] py-24 md:py-32 px-6 overflow-hidden border-t border-[#f5f1e8]/5"
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_bottom_left,_rgba(216,184,122,0.05)_0%,_transparent_60%)]" />
      <div className="max-w-6xl mx-auto relative">
        <Reveal>
          <div className="text-mono text-[#f5f1e8]/65 text-[11px] tracking-[0.3em] uppercase mb-6">
            What we take on
          </div>
        </Reveal>

        <div className="grid md:grid-cols-[1fr_1fr] gap-10 md:gap-20 items-start">
          <Reveal delay={0.1}>
            <h2 className="text-serif text-4xl md:text-6xl lg:text-7xl text-[#f5f1e8] tracking-tight leading-[1.05]">
              Currently available for work.
            </h2>
            <p className="mt-7 text-[#f5f1e8]/80 text-base md:text-lg leading-relaxed max-w-md">
              Independent US studio, deliberately selective. We take on
              concrete problems for founders and teams — focused
              engineering, fixed scope, code you own. If you have a real
              project, let&rsquo;s see if it&rsquo;s a fit.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById("contact");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                  window.dispatchEvent(new CustomEvent("set-contact-topic", { detail: "hire" }));
                }}
                className="bg-[#f5f1e8] text-[#0a0a0b] rounded-full px-6 py-3 text-sm font-medium hover:bg-[#f5f1e8]/90 active:scale-[0.97] motion-reduce:active:scale-100 transition flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d8b87a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
              >
                Start a project conversation
                <ArrowRight size={14} strokeWidth={2.4} aria-hidden="true" />
              </a>
              <a
                href="/services/"
                className="liquid-glass rounded-full px-6 py-3 text-[#f5f1e8] text-sm font-medium hover:bg-white/[0.04] transition flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d8b87a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
              >
                Browse services
                <ArrowRight size={14} strokeWidth={2.4} aria-hidden="true" />
              </a>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 md:border-t md:border-[#f5f1e8]/10 md:pt-8">
              <Fact k="Turnaround" v="2–6 weeks" />
              <Fact k="Engagement" v="Independent" />
              <Fact k="Format" v="Fixed scope" />
              <Fact k="Location" v="Remote, US" />
            </div>
          </Reveal>

          <Reveal delay={0.15} y={30}>
            <div className="grid grid-cols-1 gap-px bg-[#f5f1e8]/10 rounded-3xl overflow-hidden">
              {WORK_TYPES.map((w, i) => (
                <div key={w.n} className="bg-[#0a0a0b] p-7 md:p-8 flex gap-5 items-start">
                  <div className="text-mono text-[#f5f1e8]/30 text-[11px] tracking-wider mt-1 shrink-0 w-6">
                    {w.n}
                  </div>
                  <div>
                    <div className="text-mono text-[#f5f1e8]/65 text-[10px] tracking-[0.28em] uppercase mb-2">
                      {w.label}
                    </div>
                    <p className="text-[#f5f1e8]/75 text-[15px] leading-relaxed">
                      {w.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
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
