import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Github, XLogo } from "./icons/Brand";
import Navbar from "./Navbar";
import { LINKS } from "@/lib/links";
import { track } from "@/lib/analytics";

type SubStatus = "idle" | "sending" | "sent" | "error";

/**
 * Map raw form-backend error strings to friendly visitor-facing copy.
 * The form provider (formsubmit.co) returns implementation-detail messages
 * like "This form needs Activation…" which are confusing to end users and
 * make the site look broken. Anything we don't explicitly recognise falls
 * back to a generic "couldn't reach server" + mailto pointer.
 */
function friendlyFormError(_raw: string | null | undefined): string {
  // Always return the same neutral copy — never leak provider mechanics
  // (activation, captcha, rate limits, spam scoring, etc.) to visitors.
  // The mailto rendered next to this string is the visitor's real escape
  // hatch when the subscribe service is having a bad day.
  return "Couldn't reach the subscribe service. Please email us instead — a real person replies.";
}

export default function Hero() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SubStatus>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  // Honeypot — invisible to humans. Bots that auto-fill every field will
  // populate this and get silently dropped. formsubmit also drops any
  // submission with `_honey` set on its end (defense in depth).
  const [hp, setHp] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email) || status === "sending") return;
    // Honeypot trip — pretend it succeeded so the bot doesn't retry, but
    // never POST and never count it as a real subscriber.
    if (hp) {
      track("subscribe_honeypot", { location: "hero" });
      setStatus("sent");
      setEmail("");
      setHp(""); // reset so an autofill mishap can't permanently lock the form
      setTimeout(() => setStatus("idle"), 5000);
      return;
    }
    setStatus("sending");
    setErrorMsg(null);
    track("subscribe_attempt", { location: "hero" });
    try {
      const res = await fetch(LINKS.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          email,
          _subject: "[Nosytlabs] New subscriber to build notes",
          _template: "table",
          _captcha: "false",
          _honey: "",
          source: "hero-subscribe",
          _autoresponse:
            "You're on the list for Nosytlabs build notes.\n" +
            "We only send when there's something worth your attention. Reply to this email any time — it lands in our inbox.\n" +
            "— Nosytlabs · hi@nosytlabs.com\n" +
            "To stop receiving build notes, reply with 'unsubscribe' and we'll remove you within 48h.",
        }),
      });
      // formsubmit returns 200 with { success: "true" | "false", message }
      // even when the request was rejected (rate-limited, captcha required,
      // etc.), so we have to inspect the body — not just res.ok.
      const data = await res.json().catch(() => ({} as { success?: string; message?: string }));
      const ok = res.ok && String(data.success).toLowerCase() === "true";
      if (!ok) {
        // Never surface the raw third-party error string to the visitor —
        // formsubmit's text ("This form needs Activation. We've sent you an
        // email…") is incomprehensible and looks broken. Map to a friendly
        // fallback that points at the direct mailto.
        throw new Error(friendlyFormError(data.message));
      }
      setStatus("sent");
      setEmail("");
      track("subscribe_success", { location: "hero" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      // Stay in-page on failure — never hijack the visitor to their mail client.
      track("subscribe_error", { location: "hero" });
      setErrorMsg(err instanceof Error ? friendlyFormError(err.message) : "Something went wrong. Please try again, or email hi@nosytlabs.com.");
      setStatus("error");
      setTimeout(() => {
        setStatus("idle");
        setErrorMsg(null);
      }, 6000);
    }
  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col bg-[#0a0a0b]">
      {/* Cosmos hero — same gorgeous static image at every viewport. The
          previous wide-screen MP4 had the planet jammed against the right
          edge with mostly empty black on the left, which read as broken.
          The 76 KB webp poster keeps the LCP fast and renders identically
          on every device. */}
      <img
        src="/img/cosmos-hero.webp"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center"
        decoding="async"
        fetchPriority="high"
      />

      {/* Layered overlays — lighter vignette so the cosmos image actually
          shows through, plus a bottom fade so type stays legible. */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_rgba(10,10,11,0.20)_0%,_rgba(10,10,11,0.55)_60%,_rgba(10,10,11,0.92)_100%)] sm:bg-[radial-gradient(ellipse_at_center,_rgba(10,10,11,0.05)_0%,_rgba(10,10,11,0.40)_60%,_rgba(10,10,11,0.88)_100%)]" />
      <div className="absolute inset-0 pointer-events-none bg-[#0a0a0b]/25 sm:bg-[#0a0a0b]/15" />
      <div className="absolute inset-x-0 bottom-0 h-[55%] pointer-events-none bg-gradient-to-b from-transparent via-[#0a0a0b]/85 to-[#0a0a0b] sm:h-64 sm:bg-gradient-to-b sm:from-transparent sm:via-[#0a0a0b]/80 sm:to-[#0a0a0b]" />
      <div className="absolute inset-x-0 top-0 h-28 pointer-events-none bg-gradient-to-b from-[#0a0a0b]/75 to-transparent" />

      <Navbar />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center -translate-y-[3%]">
        <div className="text-mono text-[#f5f1e8]/65 text-[10px] sm:text-[11px] tracking-[0.32em] uppercase mb-7 animate-fade-rise">
          Nosytlabs&nbsp;·&nbsp;Independent&nbsp;Studio&nbsp;·&nbsp;Est.&nbsp;2025
        </div>

        <h1 className="text-serif text-[#f5f1e8] tracking-[-0.025em] leading-[0.94] text-[3.25rem] sm:text-7xl md:text-8xl lg:text-[8.5rem] xl:text-[10rem] max-w-[1200px] animate-fade-rise-d1">
          Notable opportunities{" "}
          <span className="text-italic-serif text-[#d8b87a]">shape</span>{" "}
          your tomorrow.
        </h1>

        <p className="mt-8 max-w-xl text-[#f5f1e8]/85 text-base sm:text-lg leading-relaxed animate-fade-rise-d2">
          An independent US studio building practical AI agents, MCP
          servers, and small, fast web apps for founders, teams, and
          fellow builders. Fixed scope, honest timelines, code you own.{" "}
          <a
            href="/services/"
            className="underline underline-offset-4 decoration-[#d8b87a]/50 hover:decoration-[#d8b87a] text-[#f5f1e8] transition-colors"
          >
            Available for new work
          </a>
          .
        </p>

        <form
          className="mt-10 w-full max-w-lg animate-fade-rise-d3"
          onSubmit={onSubmit}
          aria-label="Subscribe to build notes"
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

          <label htmlFor="hero-email" className="sr-only">
            Email address
          </label>
          <div className="liquid-glass-strong rounded-full pl-6 pr-2 py-2 flex items-center gap-3 focus-within:ring-2 focus-within:ring-[#d8b87a]/50 transition">
            <input
              id="hero-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "sending"}
              aria-invalid={status === "error" || undefined}
              aria-describedby="hero-email-status"
              placeholder={
                status === "sent"
                  ? "Thanks — you're on the list."
                  : "your@email.com"
              }
              className="flex-1 bg-transparent outline-none text-[#f5f1e8] placeholder:text-[#f5f1e8]/55 text-sm py-2.5 disabled:opacity-60"
              autoComplete="email"
              inputMode="email"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="bg-[#f5f1e8] rounded-full px-5 py-2.5 text-[#0a0a0b] text-sm font-medium hover:bg-[#f5f1e8]/90 active:scale-[0.97] transition inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 disabled:opacity-60 motion-reduce:active:scale-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d8b87a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
            >
              {status === "sending" ? "Sending…" : status === "sent" ? "On the list ✓" : "Get notes"}
              {status === "idle" && <ArrowRight size={14} strokeWidth={2.4} aria-hidden="true" />}
            </button>
          </div>
          <p
            id="hero-email-status"
            className="mt-3 text-[#f5f1e8]/55 text-xs min-h-[1.25rem]"
            aria-live="polite"
          >
            {status === "sent" ? (
              <span>You&rsquo;re on the list. Reply to any future note if you ever want off.</span>
            ) : status === "error" ? (
              <span>
                {errorMsg ?? "Something went wrong."}{" "}
                <a
                  href={LINKS.email}
                  className="underline underline-offset-4 decoration-[#d8b87a]/60 hover:decoration-[#d8b87a] text-[#f5f1e8]/80 hover:text-[#f5f1e8]"
                >
                  hi@nosytlabs.com
                </a>
              </span>
            ) : (
              <span>Occasional updates when something ships. No spam, ever.</span>
            )}
          </p>
        </form>

        <div className="mt-10 flex items-center gap-2.5 animate-fade-rise-d4">
          <Pill href={LINKS.github} label="GitHub"><Github size={16} /></Pill>
          <Pill href={LINKS.x} label="X"><XLogo size={16} /></Pill>
        </div>
      </div>

      <div className="relative z-10 pb-10 px-6 animate-fade-rise-d4">
        <div className="mx-auto max-w-4xl flex justify-center">
          <a
            href="#about"
            className="text-[#f5f1e8]/70 hover:text-[#f5f1e8] transition-colors text-sm focus:outline-none focus-visible:underline focus-visible:underline-offset-4 focus-visible:decoration-[#d8b87a]"
          >
            Scroll to read ↓
          </a>
        </div>
      </div>
    </section>
  );
}

function Pill({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      onClick={() => track("social_click", { network: label.toLowerCase() })}
      className="liquid-glass rounded-full p-3 text-[#f5f1e8]/85 hover:text-[#f5f1e8] hover:bg-white/[0.06] transition-all hover:scale-[1.04] motion-reduce:hover:scale-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d8b87a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
    >
      {children}
    </a>
  );
}
