/**
 * Reserved slot for the machine-finder map. There is no map at launch — this
 * renders nothing until `NEXT_PUBLIC_MAP_ENABLED` is set, so the layout it will
 * eventually occupy is already decided.
 */
export function MapPlaceholder() {
  if (process.env.NEXT_PUBLIC_MAP_ENABLED !== "true") return null;

  return (
    <div
      role="presentation"
      className="mb-10 flex aspect-[16/7] w-full items-center justify-center rounded-xl border border-hairline bg-surface text-sm text-muted"
    >
      Map coming soon
    </div>
  );
}
