type Props = { className?: string };

// Minimal geometric mark: a tilted square with an inner dot.
// No "character", no orbital theatrics — just a quiet maker's mark.
export default function Logo({ className }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="2"
        transform="rotate(45 12 12)"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="12" cy="12" r="2.2" fill="currentColor" />
    </svg>
  );
}
