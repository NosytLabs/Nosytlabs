import { motion } from "framer-motion";
import { ArrowUpRight, Github, Star } from "lucide-react";
import Reveal from "./Reveal";

type Project = {
  tag: string;
  title: string;
  description: string;
  href: string;
  stars?: number;
  lang: string;
  slug: string;
};

const PROJECTS: Project[] = [
  {
    tag: "AI Gateway",
    title: "OpenClaw Droid",
    description:
      "An optimized OpenClaw AI Gateway designed to run inside Termux on Android — bring agentic workflows to a phone in your pocket.",
    href: "https://github.com/NosytLabs/openclaw-droid",
    stars: 29,
    lang: "Shell",
    slug: "openclaw-droid",
  },
  {
    tag: "MCP Servers",
    title: "Free MCP Servers",
    description:
      "Free Image Generation and Text-to-Speech MCP servers. No API keys required — plug them in, run them locally, ship.",
    href: "https://github.com/NosytLabs/openclaw-free-mcp-servers",
    lang: "Python",
    slug: "openclaw-free-mcp-servers",
  },
  {
    tag: "Agent Skill",
    title: "Presearch Search Skill",
    description:
      "A clean SKILL.md for the Presearch Search API — privacy-first, decentralized search built specifically for AI agents.",
    href: "https://github.com/NosytLabs/presearch-search-skill",
    stars: 2,
    lang: "Python",
    slug: "presearch-search-skill",
  },
  {
    tag: "SaaS",
    title: "AI Newsletter SaaS",
    description:
      "An AI-powered newsletter platform stitching NewsAPI, Hugging Face, Kit Email, and WHOP into end-to-end newsletter automation.",
    href: "https://github.com/NosytLabs/ai-newsletter-saas-2025",
    stars: 1,
    lang: "TypeScript",
    slug: "ai-newsletter-saas-2025",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative bg-black py-28 md:py-36 px-6 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="flex items-end justify-between flex-wrap gap-4 mb-14 md:mb-16">
            <div>
              <div className="text-white/65 text-xs tracking-[0.3em] uppercase mb-4">
                Selected work
              </div>
              <h2 className="text-serif text-4xl md:text-6xl lg:text-7xl text-white tracking-tight">
                What we{" "}
                <span className="text-italic-serif text-white/70">ship</span>.
              </h2>
            </div>
            <a
              href="https://github.com/NosytLabs"
              target="_blank"
              rel="noreferrer"
              className="liquid-glass rounded-full px-5 py-2.5 text-white text-sm font-medium inline-flex items-center gap-2 hover:bg-white/[0.05] transition-colors"
            >
              <Github size={15} />
              All repos on GitHub
            </a>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08} y={50}>
              <motion.a
                href={p.href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 220, damping: 22 }}
                className="liquid-glass rounded-[28px] block group h-full p-7 md:p-9 relative overflow-hidden"
              >
                {/* Subtle code-like backdrop, no AI video */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-[0.06] pointer-events-none select-none"
                  style={{
                    backgroundImage:
                      "linear-gradient(transparent 0 23px, rgba(255,255,255,0.6) 23px 24px)",
                    backgroundSize: "100% 24px",
                  }}
                />

                <div className="relative flex items-center justify-between mb-7">
                  <div className="liquid-glass rounded-full px-3 py-1 text-[10px] tracking-[0.22em] uppercase text-white/95">
                    {p.tag}
                  </div>
                  <div className="flex items-center gap-2">
                    {p.stars !== undefined && p.stars > 0 && (
                      <div className="text-white/70 text-xs inline-flex items-center gap-1">
                        <Star size={11} fill="currentColor" />
                        {p.stars}
                      </div>
                    )}
                    <div className="text-white/55 text-xs">{p.lang}</div>
                  </div>
                </div>

                <div className="relative">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-serif text-2xl md:text-[1.85rem] text-white tracking-tight leading-tight">
                      {p.title}
                    </h3>
                    <span className="liquid-glass rounded-full p-2.5 text-white shrink-0 group-hover:rotate-45 transition-transform duration-500">
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                  <p className="text-white/75 text-[15px] leading-relaxed max-w-[42ch]">
                    {p.description}
                  </p>
                  <div className="mt-7 flex items-center gap-2 text-white/55 text-xs font-mono tracking-tight">
                    <Github size={13} />
                    <span>github.com/NosytLabs/{p.slug}</span>
                  </div>
                </div>
              </motion.a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
