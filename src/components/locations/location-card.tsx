import { MapPinIcon } from "lucide-react";
import type { Location } from "@/content/types";
import { cn } from "@/lib/utils";

const STATUS_LABEL: Record<Location["status"], string> = {
  live: "Live now",
  coming_soon: "Coming soon",
};

export function LocationCard({ location }: { location: Location }) {
  const isLive = location.status === "live";

  return (
    <li className="rounded-xl border border-hairline bg-surface p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">{location.venueName}</h3>
          <p className="flex items-start gap-1.5 text-sm text-muted">
            <MapPinIcon aria-hidden className="mt-0.5 size-4 shrink-0" />
            <span>
              {location.address}, {location.city}, {location.state}
            </span>
          </p>
        </div>

        <span
          className={cn(
            "shrink-0 rounded-full border px-2.5 py-1 text-xs font-semibold",
            isLive
              ? "border-neon-blue/50 text-neon-blue"
              : "border-hairline text-muted",
          )}
        >
          {STATUS_LABEL[location.status]}
        </span>
      </div>

      {location.hours && (
        <p className="mt-4 text-sm text-muted">{location.hours}</p>
      )}
    </li>
  );
}
