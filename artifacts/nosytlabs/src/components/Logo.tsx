type Props = { className?: string };

/**
 * Brand mark — italic serif "n" with a gold period.
 * - Subtle radial gradient on the tile + a faint inner stroke give the mark
 *   weight without leaving the cream/gold/near-black palette.
 * - The italic "n" mirrors the Hero h1 / italic serif accents used across the
 *   site (Instrument Serif aesthetic, with `Times New Roman` as a fallback so
 *   the mark renders correctly even before the web font loads / on favicons).
 * - The gold dot reads as the period from the tagline ("…shape your tomorrow."),
 *   wrapped in a soft glow so it punches at small favicon sizes.
 * - Stays a single inline SVG so it scales crisply at any size and stays in
 *   sync with the static /favicon.svg in /public — keep both in lockstep.
 */
export default function Logo({ className }: Props) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="nl-tile" cx="35%" cy="30%" r="85%">
          <stop offset="0%" stopColor="#1a1a22" />
          <stop offset="55%" stopColor="#0e0e12" />
          <stop offset="100%" stopColor="#06060a" />
        </radialGradient>
        <linearGradient id="nl-n" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fbf6e8" />
          <stop offset="100%" stopColor="#d8d2c2" />
        </linearGradient>
        <radialGradient id="nl-dot-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f0c878" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#d8b87a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="url(#nl-tile)" />
      <rect
        x="0.75"
        y="0.75"
        width="62.5"
        height="62.5"
        rx="13.25"
        fill="none"
        stroke="#f5f1e8"
        strokeOpacity="0.22"
        strokeWidth="1"
      />
      <rect
        x="2.5"
        y="2.5"
        width="59"
        height="59"
        rx="11.5"
        fill="none"
        stroke="#f5f1e8"
        strokeOpacity="0.05"
        strokeWidth="1"
      />
      <text
        x="17"
        y="49"
        fontFamily="'Instrument Serif', 'Times New Roman', Georgia, serif"
        fontSize="46"
        fontStyle="italic"
        fontWeight="400"
        fill="url(#nl-n)"
      >
        n
      </text>
      <circle cx="49" cy="47" r="8" fill="url(#nl-dot-glow)" />
      <circle cx="49" cy="47" r="3.4" fill="#d8b87a" />
    </svg>
  );
}
