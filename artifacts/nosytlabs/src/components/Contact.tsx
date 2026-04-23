import { useState } from "react";
import { ArrowRight, Github, Mail } from "lucide-react";
import Reveal from "./Reveal";
import { LINKS } from "@/lib/links";
import { track } from "@/lib/analytics";

type Status = "idle" | "sending" | "sent" | "error";

const TOPICS = [
  { v: "collab", l: "Collaboration" },
  { v: "consult", l: "Consulting" },
  { v: "press", l: "Press / interview" },
  { v: "hello", l: "Just saying hi" },
] as const;

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState<(typeof TOPICS)[number]["v"]>("collab");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  // Honeypot — invisible to humans. Bots that auto-fill every field will
  // populate this and get silently dropped. formsubmit also drops any
  // submission with `_honey` set on its end (defense in depth).
  const [hp, setHp] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    setError(null);
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!message.trim()) {
      setError("A short message helps us know what to reply to.");
      return;
    }
    // Honeypot trip — silently fake success so the bot moves on, never POST.
    if (hp) {
      track("contact_honeypot", { topic });
      setStatus("sent");
      setName(""); setEmail(""); setMessage(""); setTopic("collab");
      setHp(""); // reset so an autofill mishap can't permanently lock the form
      setTimeout(() => setStatus("idle"), 5000);
      return;
    }
    setStatus("sending");
    track("contact_attempt", { topic });

    const topicLabel = TOPICS.find((t) => t.v === topic)?.l ?? topic;
    const payload = {
      name: name || "Anonymous",
      email,
      topic: topicLabel,
      message,
      _subject: `[Nosytlabs · ${topicLabel}] ${name || "Hello"}`,
      _template: "table",
      // Built-in formsubmit captcha layered on top of the honeypot — the
      // contact form is lower-volume so a one-time captcha is fine here.
      _captcha: "true",
      _honey: "",
      _autoresponse:
        `Thanks${name ? `, ${name}` : ""} — your note about ${topicLabel.toLowerCase()} reached Nosytlabs.\n` +
        "A real person will reply personally within a couple of business days. Reply to this email any time; it threads straight back.\n" +
        "— Nosytlabs · hi@nosytlabs.com",
    };

    try {
      const res = await fetch(LINKS.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      // formsubmit returns 200 with { success: "true" | "false", message }
      // even when the submission was rejected (rate-limited, captcha required,
      // etc.), so we have to inspect the body — not just res.ok.
      const data = await res.json().catch(() => ({} as { success?: string; message?: string }));
      const ok = res.ok && String(data.success).toLowerCase() === "true";
      if (!ok) {
        throw new Error(data.message || "Couldn't reach the server. Please try again, or email hi@nosytlabs.com.");
      }
      setStatus("sent");
      setName(""); setEmail(""); setMessage(""); setTopic("collab");
      track("contact_success", { topic });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      // Stay in-page on failure — never hijack the visitor to their mail client.
      track("contact_error", { topic });
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
      setTimeout(() => {
        setStatus("idle");
        setError(null);
      }, 6000);
    }
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
                  className="inline-flex items-center gap-2.5 text-[#f5f1e8]/85 hover:text-[#d8b87a] transition-colors text-sm text-mono focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d8b87a] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a0a0b] rounded"
                >
                  <Mail size={15} />
                  {LINKS.emailRaw}
                </a>
                <a
                  href={LINKS.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 text-[#f5f1e8]/85 hover:text-[#d8b87a] transition-colors text-sm text-mono focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d8b87a] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a0a0b] rounded"
                >
                  <Github size={15} />
                  github.com/NosytLabs
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal x={20}>
            <form
              onSubmit={onSubmit}
              aria-label="Contact Nosytlabs"
              className="liquid-glass rounded-3xl p-7 md:p-9 space-y-5"
              aria-describedby={error ? "contact-error" : undefined}
              noValidate
            >
              {/* Honeypot — visually hidden, off the tab order, and ignored by AT.
                  Real visitors never touch it; spam bots almost always do. */}
              <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
                <label>
                  Leave this field empty
                  <input
                    type="text"
                    name="_honey"
                    tabIndex={-1}
                    autoComplete="off"
                    value={hp}
                    onChange={(e) => setHp(e.target.value)}
                  />
                </label>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field id="contact-name" label="Name">
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ada Lovelace"
                    autoComplete="name"
                    className="w-full bg-transparent outline-none text-[#f5f1e8] placeholder:text-[#f5f1e8]/40 text-sm border-b border-[#f5f1e8]/15 py-2 focus:border-[#d8b87a]/60 transition-colors"
                  />
                </Field>
                <Field id="contact-email" label="Email" required>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ada@example.com"
                    autoComplete="email"
                    inputMode="email"
                    className="w-full bg-transparent outline-none text-[#f5f1e8] placeholder:text-[#f5f1e8]/40 text-sm border-b border-[#f5f1e8]/15 py-2 focus:border-[#d8b87a]/60 transition-colors"
                  />
                </Field>
              </div>
              <fieldset>
                <legend className="text-mono text-[#f5f1e8]/65 text-[10px] tracking-[0.22em] uppercase mb-1.5 block">
                  Topic
                </legend>
                <div role="radiogroup" aria-label="Topic" className="flex flex-wrap gap-2">
                  {TOPICS.map((opt) => {
                    const active = topic === opt.v;
                    return (
                      <button
                        key={opt.v}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        onClick={() => setTopic(opt.v)}
                        className={`text-xs px-3.5 py-1.5 rounded-full border transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d8b87a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b] ${
                          active
                            ? "border-[#d8b87a] text-[#d8b87a] bg-[#d8b87a]/[0.08]"
                            : "border-[#f5f1e8]/15 text-[#f5f1e8]/70 hover:border-[#f5f1e8]/30 hover:text-[#f5f1e8]"
                        }`}
                      >
                        {opt.l}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
              <Field id="contact-message" label="Message" required>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="What's on your mind?"
                  className="w-full bg-transparent outline-none text-[#f5f1e8] placeholder:text-[#f5f1e8]/40 text-sm border-b border-[#f5f1e8]/15 py-2 focus:border-[#d8b87a]/60 transition-colors resize-none"
                />
              </Field>
              <div className="flex items-center justify-between flex-wrap gap-3 pt-2">
                <p
                  id="contact-error"
                  aria-live="polite"
                  role={error ? "alert" : "status"}
                  className={`text-xs ${error ? "text-[#ff8a8a]" : "text-[#f5f1e8]/45"}`}
                >
                  {error
                    ? error
                    : status === "error"
                    ? "Couldn't reach the server. Please try again, or email hi@nosytlabs.com."
                    : status === "sent"
                    ? "Got it — we'll reply personally."
                    : "Sent straight to hi@nosytlabs.com."}
                </p>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  aria-busy={status === "sending"}
                  className="bg-[#f5f1e8] text-[#0a0a0b] rounded-full px-6 py-3 text-sm font-medium hover:bg-[#f5f1e8]/90 active:scale-95 transition flex items-center gap-2 disabled:opacity-60 motion-reduce:active:scale-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d8b87a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b] disabled:cursor-wait"
                >
                  {status === "sent" ? "Sent ✓" : status === "sending" ? "Sending…" : "Send a note"}
                  {status === "idle" && <ArrowRight size={14} strokeWidth={2.4} aria-hidden="true" />}
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  required,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="block">
      <label
        htmlFor={id}
        className="text-mono text-[#f5f1e8]/65 text-[10px] tracking-[0.22em] uppercase mb-1.5 block"
      >
        {label}
        {required && <span aria-hidden="true" className="text-[#d8b87a] ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}
