/**
 * lucide dropped brand glyphs in v1, so the two social marks are inlined here.
 * Both are decorative: the surrounding link carries the accessible name.
 */
type IconProps = React.SVGProps<SVGSVGElement>;

export function InstagramIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TikTokIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M16.5 2.5a5.6 5.6 0 0 0 5 4.7v3.1a8.6 8.6 0 0 1-5-1.8v6.6a6.3 6.3 0 1 1-6.3-6.3c.35 0 .7.03 1.03.09v3.15a3.15 3.15 0 1 0 2.22 3.06V2.5h3.05Z" />
    </svg>
  );
}
