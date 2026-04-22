type Props = { className?: string };

// NOSYT LABS stacked wordmark in a rounded square. Matches the brand mark.
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
        x="32"
        y="29"
        fontFamily="Geist, -apple-system, system-ui, sans-serif"
        fontSize="17"
        fontWeight="800"
        fill="#f5f1e8"
        textAnchor="middle"
        letterSpacing="-0.5"
      >
        NOSYT
      </text>
      <text
        x="32"
        y="49"
        fontFamily="Geist, -apple-system, system-ui, sans-serif"
        fontSize="17"
        fontWeight="800"
        fill="#f5f1e8"
        textAnchor="middle"
        letterSpacing="-0.5"
      >
        LABS
      </text>
    </svg>
  );
}
