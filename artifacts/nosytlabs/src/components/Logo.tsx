type Props = { className?: string };

export default function Logo({ className }: Props) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Outer orbital ring */}
      <circle cx="20" cy="20" r="18" stroke="white" strokeOpacity="0.25" strokeWidth="0.6" />
      {/* Inclined ellipse — orbital path */}
      <ellipse
        cx="20"
        cy="20"
        rx="17"
        ry="6"
        stroke="white"
        strokeOpacity="0.55"
        strokeWidth="0.8"
        transform="rotate(-28 20 20)"
      />
      {/* N monogram */}
      <path
        d="M13 27 L13 13 L27 27 L27 13"
        stroke="white"
        strokeWidth="1.7"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      {/* Orbiting node */}
      <circle cx="32.5" cy="14.5" r="1.6" fill="white" />
    </svg>
  );
}
