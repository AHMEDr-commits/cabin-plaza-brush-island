export function Mark({ className = "size-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="7" fill="currentColor" className="text-foreground" />
      <path fill="var(--color-bg)" d="M16 5 L25 14 L16 23 L7 14 Z" />
      <path fill="currentColor" className="text-foreground" d="M9 13 H23 V15.6 H9 Z" />
      <path fill="currentColor" className="text-foreground" d="M14.7 7 H17.3 V21 H14.7 Z" />
      <path fill="var(--color-accent)" d="M16 22.8 L12.4 28 H19.6 Z" />
    </svg>
  );
}
