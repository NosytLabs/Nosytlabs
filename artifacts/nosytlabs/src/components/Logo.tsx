type Props = { className?: string };

// Wordmark sigil — a stylised serif "N" inside a soft circle.
// Quiet, geometric, and reads at any size.
export default function Logo({ className }: Props) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="15" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1" />
      <path
        d="M11 22.5 V 9.5 L 21 22.5 V 9.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      {/* small serif anchors */}
      <path d="M9 9.5 H 13 M19 9.5 H 23 M9 22.5 H 13 M19 22.5 H 23" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square"/>
    </svg>
  );
}
