import { useEffect, useState } from "react";
import { ArrowRight, Github, Mail } from "lucide-react";
import Reveal from "./Reveal";
import { LINKS } from "@/lib/links";
import { track } from "@/lib/analytics";

type Status = "idle" | "sending" | "sent" | "error";

function friendlyContactError(_raw: string | null | undefined): string {
  return "Couldn't deliver your note right now. Please email hi@nosytlabs.com directly — it lands in the same inbox.";
}

const TOPICS = [
  { v: "hire", l: "Hire the studio" },
  { v: "collab", l: "Collaboration" },
  { v: "consult", l: "Consulting" },
  { v: "press", l: "Press / interview" },
  { v: "hello", l: "Just saying hi" },
] as const;

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState<(typeof TOPICS)[number]["v"]>("hire");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [hp, setHp] = useState("");

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail === "hire") setTopic("hire");
    };
    window.addEventListener("set-contact-topic", handler);
    return () => window.removeEventListener("set-contact-topic", handler);
  }, []);

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
    if (hp) {
      track("contact_honeypot", { topic });
      setStatus("sent");
      setName(""); setEmail(""); setMessage(""); setTopic("hire");
      setHp("");
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
      _captcha: "false",
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
      const data = await res.json().catch(() => ({} as { success?: string; message?: string }));
      const ok = res.ok && String(data.success).toLowerCase() === "true";
      if (!ok) {
        throw new Error(friendlyContactError(data.message));
      }
      setStatus("sent");
      setName(""); setEmail(""); setMessage(""); setTopic("hire");
      track("contact_success", { topic });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      track("contact_error", { topic });
      setError(err instanceof Error ? friendlyContactError(err.message) : "Something went wrong. Please email hi@nosytlabs.com directly.");
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
                Have a project?{" "}
                <span className="text-italic-serif text-[#d8b87a]">
                  Let&rsquo;s talk.
                </span>
              </h2>
              <p className="mt-7 text-[#f5f1e8]/80 text-base md:text-lg leading-relaxed max-w-md">
                Bring a real problem. Sites, agents, MCP servers, custom
                tooling — if it fits what the studio does, a real person
                replies with an honest take.
              </p>
              <ul
                className="mt-7 flex flex-wrap gap-2 max-w-md"
                aria-label="What to expect when you reach out"
              >
                {[
                  "Replies within 2 business days",
                  "Code transferred to your repo",
                  "NDAs welcome",
                ].map((label) => (
                  <li
                    key={label}
                    className="liquid-glass rounded-full px-3 py-1.5 text-mono text-[10.5px] tracking-[0.06em] text-[#f5f1e8]/80 inline-flex items-center gap-1.5"
                  >
                    <span aria-hidden="true" className="inline-block w-1 h-1 rounded-full bg-[#d8b87a]" />
                    {label}
                  </li>
                ))}
              </ul>
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
                    aria-invalid={Boolean(error) || undefined}
                    aria-describedby="contact-error"
                    placeholder="ada@example.com"
                    autoComplete="email"
                    inputMode="email"
                    className="w-full bg-transparent outline-none text-[#f5f1e8] placeholder:text-[#f5f1e8]/40 text-sm border-b border-[#f5f1e8]/15 py-2 focus:border-[#d8b87a]/60 transition-colors aria-[invalid=true]:border-[#ff8a8a]/60"
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
                  aria-invalid={Boolean(error) || undefined}
                  aria-describedby="contact-error"
                  placeholder="Tell us about your project — scope, timeline, what you're trying to build."
                  className="w-full bg-transparent outline-none text-[#f5f1e8] placeholder:text-[#f5f1e8]/40 text-sm border-b border-[#f5f1e8]/15 py-2 focus:border-[#d8b87a]/60 transition-colors resize-none aria-[invalid=true]:border-[#ff8a8a]/60"
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
                    : status === "sent"
                    ? "Got it — we'll reply personally."
                    : "Sent straight to hi@nosytlabs.com."}
                </p>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  aria-busy={status === "sending"}
                  className="bg-[#f5f1e8] text-[#0a0a0b] rounded-full px-6 py-3 text-sm font-medium hover:bg-[#f5f1e8]/90 active:scale-[0.97] transition flex items-center gap-2 disabled:opacity-60 motion-reduce:active:scale-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d8b87a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b] disabled:cursor-wait"
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
