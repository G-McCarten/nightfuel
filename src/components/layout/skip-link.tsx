/**
 * First thing in the tab order. Invisible until focused, then it parks itself
 * over the header so a keyboard user can jump past the nav.
 */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only rounded-md bg-neon-blue px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100"
    >
      Skip to content
    </a>
  );
}
