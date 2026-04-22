import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import Reveal from "./Reveal";

type Project = {
  tag: string;
  title: string;
  description: string;
  href: string;
  video: string;
};

const PROJECTS: Project[] = [
  {
    tag: "AI Agent",
    title: "OMNISCIENT",
    description:
      "An AI agent with a god-complex personality. Delivers coding solutions with absolute authority and cosmic certainty.",
    href: "https://github.com/NosytLabs",
    video:
      "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4",
  },
  {
    tag: "Platform",
    title: "Prompt Engineering Platform",
    description:
      "A modern Next.js / React / TypeScript workspace to create, collaborate on, and optimize AI prompts in real time.",
    href: "https://github.com/NosytLabs",
    video:
      "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4",
  },
  {
    tag: "Research",
    title: "Video-Based AI Memory",
    description:
      "Store millions of text chunks inside MP4 files with lightning-fast semantic search — no database required.",
    href: "https://github.com/NosytLabs",
    video:
      "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4",
  },
  {
    tag: "Dev Tools",
    title: "emdash — CLI Skills",
    description:
      "A composable CLI framework for shipping reusable agent skills. Open, scriptable, and built for builders.",
    href: "https://github.com/NosytLabs/emdash",
    video:
      "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative bg-black py-28 md:py-40 px-6 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.025)_0%,_transparent_60%)]" />
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="flex items-end justify-between flex-wrap gap-4 mb-14 md:mb-20">
            <h2 className="text-serif text-4xl md:text-6xl lg:text-7xl text-white tracking-tight">
              What we{" "}
              <span className="text-italic-serif text-white/55">ship</span>
            </h2>
            <div className="text-white/40 text-xs tracking-[0.28em] uppercase">
              Selected Projects · {PROJECTS.length}
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1} y={50}>
              <motion.a
                href={p.href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 220, damping: 22 }}
                className="liquid-glass rounded-[28px] overflow-hidden block group"
              >
                <div className="relative aspect-video overflow-hidden">
                  <video
                    className="w-full h-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.06]"
                    src={p.video}
                    muted
                    autoPlay
                    loop
                    playsInline
                    preload="auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 liquid-glass rounded-full px-3 py-1 text-[10px] tracking-[0.22em] uppercase text-white/85">
                    {p.tag}
                  </div>
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-serif text-2xl md:text-3xl text-white tracking-tight leading-tight">
                      {p.title}
                    </h3>
                    <span className="liquid-glass rounded-full p-2.5 text-white shrink-0 group-hover:rotate-45 transition-transform duration-500">
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                  <p className="text-white/55 text-sm md:text-[15px] leading-relaxed">
                    {p.description}
                  </p>
                  <div className="mt-5 flex items-center gap-2 text-white/45 text-xs tracking-wider">
                    <Github size={13} />
                    <span>github.com/NosytLabs</span>
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
