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
      "An optimized OpenClaw AI Gateway designed to run inside Termux on Android — agentic workflows on a phone in your pocket.",
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
    tag: "Prompt Library",
    title: "AI Empire 2025",
    description:
      "A premium prompt collection — 100+ multi-modal prompts for business automation and scale, organized for actual reuse.",
    href: "https://github.com/NosytLabs/ai-empire-2025-prompts",
    stars: 4,
    lang: "Markdown",
    slug: "ai-empire-2025-prompts",
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
  {
    tag: "Game",
    title: "Tidefall",
    description:
      "An in-development browser game built with Phaser. A side-experiment in moving fast with a small game engine.",
    href: "https://github.com/NosytLabs/tidefall-phaser",
    lang: "JavaScript",
    slug: "tidefall-phaser",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative bg-[#0a0a0b] py-24 md:py-32 px-6 overflow-hidden border-t border-[#f5f1e8]/5"
    >
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="flex items-end justify-between flex-wrap gap-4 mb-14 md:mb-16">
            <div>
              <div className="text-mono text-[#f5f1e8]/65 text-[11px] tracking-[0.3em] uppercase mb-4">
                04 — Selected work
              </div>
              <h2 className="text-serif text-4xl md:text-6xl lg:text-7xl text-[#f5f1e8] tracking-tight">
                What we{" "}
                <span className="text-italic-serif text-[#d8b87a]">ship</span>.
              </h2>
            </div>
            <a
              href="https://github.com/NosytLabs"
              target="_blank"
              rel="noreferrer"
              className="liquid-glass rounded-full px-5 py-2.5 text-[#f5f1e8] text-sm font-medium inline-flex items-center gap-2 hover:bg-white/[0.05] transition-colors"
            >
              <Github size={15} />
              All repos on GitHub
            </a>
          </div>
        </Reveal>

        <div className="border-t border-[#f5f1e8]/10">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.04} y={20}>
              <motion.a
                href={p.href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ x: 6 }}
                transition={{ type: "spring", stiffness: 220, damping: 22 }}
                className="group grid grid-cols-12 items-center gap-4 md:gap-6 py-7 md:py-9 border-b border-[#f5f1e8]/10 hover:bg-[#f5f1e8]/[0.015] transition-colors px-1 md:px-3"
              >
                <div className="col-span-12 md:col-span-1 text-mono text-[#f5f1e8]/40 text-xs tracking-wider">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="col-span-12 md:col-span-3">
                  <h3 className="text-serif text-2xl md:text-[1.85rem] text-[#f5f1e8] tracking-tight leading-tight group-hover:text-[#d8b87a] transition-colors">
                    {p.title}
                  </h3>
                  <div className="text-mono text-[#f5f1e8]/40 text-[11px] mt-1.5">
                    NosytLabs/{p.slug}
                  </div>
                </div>
                <div className="col-span-12 md:col-span-5">
                  <p className="text-[#f5f1e8]/75 text-[15px] leading-relaxed">
                    {p.description}
                  </p>
                </div>
                <div className="col-span-12 md:col-span-2 flex items-center gap-3 text-mono text-[11px]">
                  <span className="text-[#f5f1e8]/55">{p.tag}</span>
                  <span className="text-[#f5f1e8]/40">·</span>
                  <span className="text-[#f5f1e8]/55">{p.lang}</span>
                  {p.stars !== undefined && p.stars > 0 && (
                    <span className="text-[#f5f1e8]/55 inline-flex items-center gap-1">
                      <Star size={10} fill="currentColor" />
                      {p.stars}
                    </span>
                  )}
                </div>
                <div className="col-span-12 md:col-span-1 flex md:justify-end">
                  <span className="text-[#f5f1e8]/55 group-hover:text-[#d8b87a] group-hover:translate-x-1 transition-all inline-flex items-center">
                    <ArrowUpRight size={20} />
                  </span>
                </div>
              </motion.a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
