import { useState } from "react";
import { ArrowRight, Github, Mail } from "lucide-react";
import Reveal from "./Reveal";
import { LINKS } from "@/lib/links";

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("collab");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !message || status === "sending") return;
    setStatus("sending");
    const subject = encodeURIComponent(`[Nosytlabs · ${topic}] ${name || "Hello"}`);
    const body = encodeURIComponent(`${message}\n\n— ${name || "Anonymous"}\n${email}`);
    window.location.href = `${LINKS.email}?subject=${subject}&body=${body}`;
    setTimeout(() => {
      setStatus("sent");
      setName(""); setEmail(""); setMessage(""); setTopic("collab");
      setTimeout(() => setStatus("idle"), 4000);
    }, 400);
  }

  return (
    <section
      id="contact"
      className="relative bg-[#0a0a0b] py-24 md:py-32 px-6 overflow-hidden border-t border-[#f5f1e8]/5"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-12 md:gap-16">
          <Reveal x={-20}>
            <div>
              <div className="text-mono text-[#f5f1e8]/65 text-[11px] tracking-[0.3em] uppercase mb-6">
                07 — Get in touch
              </div>
              <h2 className="text-serif text-4xl md:text-6xl lg:text-7xl text-[#f5f1e8] tracking-tight leading-[1.05]">
                Have an idea?{" "}
                <span className="text-italic-serif text-[#d8b87a]">
                  Drop a line.
                </span>
              </h2>
              <p className="mt-7 text-[#f5f1e8]/80 text-base md:text-lg leading-relaxed max-w-md">
                Working on something interesting in agents, MCP, or quiet
                developer tooling? Open an issue on a repo, or send a note —
                no funnel, just a real reply.
              </p>
              <div className="mt-8 space-y-3">
                <a
                  href={LINKS.email}
                  className="inline-flex items-center gap-2.5 text-[#f5f1e8]/85 hover:text-[#d8b87a] transition-colors text-sm text-mono"
                >
                  <Mail size={15} />
                  {LINKS.emailRaw}
                </a>
                <a
                  href={LINKS.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 text-[#f5f1e8]/85 hover:text-[#d8b87a] transition-colors text-sm text-mono"
                >
                  <Github size={15} />
                  github.com/NosytLabs
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal x={20}>
            <form onSubmit={onSubmit} className="liquid-glass rounded-3xl p-7 md:p-9 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Name">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ada Lovelace"
                    className="w-full bg-transparent outline-none text-[#f5f1e8] placeholder:text-[#f5f1e8]/40 text-sm border-b border-[#f5f1e8]/15 py-2 focus:border-[#d8b87a]/60 transition-colors"
                  />
                </Field>
                <Field label="Email">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ada@example.com"
                    className="w-full bg-transparent outline-none text-[#f5f1e8] placeholder:text-[#f5f1e8]/40 text-sm border-b border-[#f5f1e8]/15 py-2 focus:border-[#d8b87a]/60 transition-colors"
                  />
                </Field>
              </div>
              <Field label="Topic">
                <div className="flex flex-wrap gap-2">
                  {[
                    { v: "collab", l: "Collaboration" },
                    { v: "consult", l: "Consulting" },
                    { v: "press", l: "Press / interview" },
                    { v: "hello", l: "Just saying hi" },
                  ].map((opt) => (
                    <button
                      key={opt.v}
                      type="button"
                      onClick={() => setTopic(opt.v)}
                      className={`text-xs px-3.5 py-1.5 rounded-full border transition ${
                        topic === opt.v
                          ? "border-[#d8b87a] text-[#d8b87a] bg-[#d8b87a]/[0.06]"
                          : "border-[#f5f1e8]/15 text-[#f5f1e8]/70 hover:border-[#f5f1e8]/30 hover:text-[#f5f1e8]"
                      }`}
                    >
                      {opt.l}
                    </button>
                  ))}
                </div>
              </Field>
              <Field label="Message">
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="What's on your mind?"
                  className="w-full bg-transparent outline-none text-[#f5f1e8] placeholder:text-[#f5f1e8]/40 text-sm border-b border-[#f5f1e8]/15 py-2 focus:border-[#d8b87a]/60 transition-colors resize-none"
                />
              </Field>
              <div className="flex items-center justify-between flex-wrap gap-3 pt-2">
                <p className="text-[#f5f1e8]/45 text-xs">
                  Opens your email client with a pre-filled draft.
                </p>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="bg-[#f5f1e8] text-[#0a0a0b] rounded-full px-6 py-3 text-sm font-medium hover:bg-[#f5f1e8]/90 active:scale-95 transition flex items-center gap-2 disabled:opacity-60"
                >
                  {status === "sent" ? "Drafted ✓" : status === "sending" ? "Opening…" : "Send a note"}
                  {status === "idle" && <ArrowRight size={14} strokeWidth={2.4} />}
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-mono text-[#f5f1e8]/55 text-[10px] tracking-[0.22em] uppercase mb-1.5 block">
        {label}
      </span>
      {children}
    </label>
  );
}
