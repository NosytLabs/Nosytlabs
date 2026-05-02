type Props = { className?: string };

/**
 * Brand mark — italic serif "n" with a gold period.
 * - The italic "n" mirrors the Hero h1 / italic serif accents used across the
 *   site (Instrument Serif aesthetic, with `Times New Roman` as a fallback so
 *   the mark renders correctly even before the web font loads / on favicons).
 * - The gold dot reads as the period from the tagline ("…shape your tomorrow.").
 * - Cream-on-near-black matches the global palette tokens.
 *
 * Stays a single inline SVG so it scales crisply at any size and stays in sync
 * with the static /favicon.svg in /public.
 */
export default function Logo({ className }: Props) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="64" height="64" rx="14" fill="#0a0a0b" />
      <rect
        x="0.5"
        y="0.5"
        width="63"
        height="63"
        rx="13.5"
        fill="none"
        stroke="#f5f1e8"
        strokeOpacity="0.18"
      />
      <text
        x="18"
        y="48"
        fontFamily="'Instrument Serif', 'Times New Roman', Georgia, serif"
        fontSize="44"
        fontStyle="italic"
        fontWeight="400"
        fill="#f5f1e8"
      >
        n
      </text>
      <circle cx="48" cy="46" r="3.2" fill="#d8b87a" />
    </svg>
  );
}
