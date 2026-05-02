import { motion } from "framer-motion";
import { ArrowUpRight, GitFork, Github, Star } from "lucide-react";
import Reveal from "./Reveal";
import githubData from "@/lib/github-data.json" with { type: "json" };

type Project = {
  tag: string;
  title: string;
  description: string;
  href: string;
  stars: number;
  forks: number;
  lang: string;
  slug: string;
  repoSlug: string;
  pushedAt: string | null;
};

type RepoSnapshot = {
  stars: number;
  forks: number;
  language: string | null;
  pushedAt: string | null;
};

// Static seed data — verified live against github.com/NosytLabs. The build-time
// `scripts/sync-github-data.mjs` overlays current GitHub stats on top of this
// seed via the imported JSON, so stars/language/pushed_at never drift. If the
// JSON is missing or malformed, every field falls back to the seed value.
function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}
function parseSnapshot(v: unknown): RepoSnapshot | null {
  if (!isRecord(v)) return null;
  const stars = typeof v.stars === "number" ? v.stars : null;
  const forks = typeof v.forks === "number" ? v.forks : null;
  const language = typeof v.language === "string" ? v.language : null;
  const pushedAt = typeof v.pushedAt === "string" ? v.pushedAt : null;
  if (stars === null || forks === null) return null;
  return { stars, forks, language, pushedAt };
}
function loadRepoSnapshots(raw: unknown): Record<string, RepoSnapshot> {
  if (!isRecord(raw) || !isRecord(raw.repos)) return {};
  const out: Record<string, RepoSnapshot> = {};
  for (const [slug, value] of Object.entries(raw.repos)) {
    const parsed = parseSnapshot(value);
    if (parsed) out[slug] = parsed;
  }
  return out;
}
const repoSnapshots = loadRepoSnapshots(githubData);

function snapshot(slug: string, fallback: { stars: number; forks: number; lang: string }) {
  const live = repoSnapshots[slug];
  return {
    stars: live?.stars ?? fallback.stars,
    forks: live?.forks ?? fallback.forks,
    lang: live?.language ?? fallback.lang,
    pushedAt: live?.pushedAt ?? null,
  };
}

const PROJECTS: Project[] = [
  {
    tag: "AI Gateway",
    title: "OpenClaw Droid",
    description:
      "An optimized OpenClaw AI Gateway designed to run inside Termux on Android — agentic workflows on a phone in your pocket.",
    href: "https://github.com/NosytLabs/openclaw-droid",
    slug: "openclaw-droid",
    repoSlug: "NosytLabs/openclaw-droid",
    ...snapshot("NosytLabs/openclaw-droid", { stars: 29, forks: 7, lang: "Shell" }),
  },
  {
    tag: "MCP Servers",
    title: "Free MCP Servers",
    description:
      "Free Image Generation and Text-to-Speech MCP servers for OpenClaw — no API keys required. Plug in, run locally, ship.",
    href: "https://github.com/NosytLabs/openclaw-free-mcp-servers",
    slug: "openclaw-free-mcp-servers",
    repoSlug: "NosytLabs/openclaw-free-mcp-servers",
    ...snapshot("NosytLabs/openclaw-free-mcp-servers", { stars: 0, forks: 0, lang: "Python" }),
  },
  {
    tag: "Agent Skill",
    title: "Presearch Search Skill",
    description:
      "A clean SKILL.md for the Presearch Search API — privacy-first, decentralized search built specifically for AI agents.",
    href: "https://github.com/NosytLabs/presearch-search-skill",
    slug: "presearch-search-skill",
    repoSlug: "NosytLabs/presearch-search-skill",
    ...snapshot("NosytLabs/presearch-search-skill", { stars: 2, forks: 0, lang: "Python" }),
  },
  {
    tag: "Game · WIP",
    title: "Tidefall",
    description:
      "An in-development browser game built with Phaser. A small experiment in moving fast with a small game engine.",
    href: "https://github.com/NosytLabs/tidefall-phaser",
    slug: "tidefall-phaser",
    repoSlug: "NosytLabs/tidefall-phaser",
    ...snapshot("NosytLabs/tidefall-phaser", { stars: 0, forks: 0, lang: "JavaScript" }),
  },
];

function relativeTime(iso: string | null): string | null {
  if (!iso) return null;
  const then = new Date(iso).getTime();
  if (!Number.isFinite(then)) return null;
  const days = Math.max(0, Math.round((Date.now() - then) / 86_400_000));
  if (days < 1) return "today";
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.round(days / 7)}w ago`;
  if (days < 365) return `${Math.round(days / 30)}mo ago`;
  return `${Math.round(days / 365)}y ago`;
}

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
                05 — Selected work
              </div>
              <h2 className="text-serif text-4xl md:text-6xl lg:text-7xl text-[#f5f1e8] tracking-tight">
                What we{" "}
                <span className="text-italic-serif text-[#d8b87a]">ship</span>.
              </h2>
              <p className="mt-5 text-[#f5f1e8]/65 text-sm md:text-base max-w-xl leading-relaxed">
                A curated slice from the open repos. Snapshot — for live
                stars and the full list, head to GitHub.
              </p>
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
                id={`project-${p.slug}`}
                href={p.href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ x: 6 }}
                transition={{ type: "spring", stiffness: 220, damping: 22 }}
                className="group grid grid-cols-12 items-center gap-4 md:gap-6 py-7 md:py-9 border-b border-[#f5f1e8]/10 hover:bg-[#f5f1e8]/[0.015] transition-colors px-1 md:px-3 scroll-mt-24"
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
                <div className="col-span-12 md:col-span-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-mono text-[11px]">
                  <span className="text-[#f5f1e8]/55">{p.tag}</span>
                  <span className="text-[#f5f1e8]/30">·</span>
                  <span className="text-[#f5f1e8]/55">{p.lang}</span>
                  {p.stars > 0 && (
                    <>
                      <span className="text-[#f5f1e8]/30">·</span>
                      <span className="text-[#f5f1e8]/55 inline-flex items-center gap-1" aria-label={`${p.stars} stars`}>
                        <Star size={10} fill="currentColor" aria-hidden="true" />
                        {p.stars}
                      </span>
                    </>
                  )}
                  {p.forks > 0 && (
                    <>
                      <span className="text-[#f5f1e8]/30">·</span>
                      <span className="text-[#f5f1e8]/55 inline-flex items-center gap-1" aria-label={`${p.forks} forks`}>
                        <GitFork size={10} aria-hidden="true" />
                        {p.forks}
                      </span>
                    </>
                  )}
                  {(() => {
                    const rel = relativeTime(p.pushedAt);
                    return rel ? (
                      <span
                        className="text-[#f5f1e8]/40 basis-full md:basis-auto md:before:content-['·_'] md:before:mr-1 md:before:text-[#f5f1e8]/30"
                        title={p.pushedAt ?? undefined}
                      >
                        Updated {rel}
                      </span>
                    ) : null;
                  })()}
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
