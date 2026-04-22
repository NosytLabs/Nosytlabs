type Props = { className?: string };

export default function Logo({ className }: Props) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="nl_g" cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#f3e3bd" />
          <stop offset="55%" stopColor="#d8b87a" />
          <stop offset="100%" stopColor="#7a5a22" />
        </radialGradient>
      </defs>
      <circle cx="16" cy="16" r="14.5" stroke="rgba(255,255,255,0.85)" strokeWidth="1" />
      <circle cx="16" cy="16" r="4.5" fill="url(#nl_g)" />
      <circle cx="16" cy="16" r="9" stroke="rgba(255,255,255,0.35)" strokeWidth="0.7" />
    </svg>
  );
}
