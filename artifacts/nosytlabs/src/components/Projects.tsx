import { motion } from "framer-motion";
import { ArrowUpRight, Github, Star } from "lucide-react";
import Reveal from "./Reveal";

type Project = {
  tag: string;
  title: string;
  description: string;
  href: string;
  video: string;
  stars?: number;
  lang: string;
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
    video:
      "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4",
  },
  {
    tag: "MCP Servers",
    title: "OpenClaw Free MCP Servers",
    description:
      "Free Image Generation and Text-to-Speech MCP servers for OpenClaw. No API keys required — plug them in, run them locally, ship.",
    href: "https://github.com/NosytLabs/openclaw-free-mcp-servers",
    lang: "Python",
    video:
      "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4",
  },
  {
    tag: "Agent Skill",
    title: "Presearch Search Skill",
    description:
      "A clean SKILL.md for the Presearch Search API — privacy-first, decentralized search built specifically for AI agents.",
    href: "https://github.com/NosytLabs/presearch-search-skill",
    stars: 2,
    lang: "Python",
    video:
      "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4",
  },
  {
    tag: "SaaS",
    title: "AI Newsletter SaaS 2025",
    description:
      "An AI-powered newsletter platform stitching together NewsAPI, Hugging Face, Kit Email, and WHOP for end-to-end newsletter automation.",
    href: "https://github.com/NosytLabs/ai-newsletter-saas-2025",
    stars: 1,
    lang: "TypeScript",
    video:
      "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4",
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
              <div className="text-white/55 text-xs tracking-[0.3em] uppercase mb-4">
                Selected work · github.com/NosytLabs
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
              See all repos
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
                className="liquid-glass rounded-[28px] overflow-hidden block group h-full"
              >
                <div className="relative aspect-video overflow-hidden">
                  <video
                    className="w-full h-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.06]"
                    src={p.video}
                    muted
                    autoPlay
                    loop
                    playsInline
                    preload="metadata"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-black/30" />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <div className="liquid-glass rounded-full px-3 py-1 text-[10px] tracking-[0.22em] uppercase text-white/95">
                      {p.tag}
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    {p.stars !== undefined && p.stars > 0 && (
                      <div className="liquid-glass rounded-full px-2.5 py-1 text-[11px] text-white/95 inline-flex items-center gap-1">
                        <Star size={11} fill="currentColor" />
                        {p.stars}
                      </div>
                    )}
                    <div className="liquid-glass rounded-full px-2.5 py-1 text-[11px] text-white/85">
                      {p.lang}
                    </div>
                  </div>
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-serif text-2xl md:text-[1.75rem] text-white tracking-tight leading-tight">
                      {p.title}
                    </h3>
                    <span className="liquid-glass rounded-full p-2.5 text-white shrink-0 group-hover:rotate-45 transition-transform duration-500">
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                  <p className="text-white/70 text-[15px] leading-relaxed">
                    {p.description}
                  </p>
                  <div className="mt-5 flex items-center gap-2 text-white/55 text-xs tracking-wider">
                    <Github size={13} />
                    <span>{p.href.replace("https://", "")}</span>
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
