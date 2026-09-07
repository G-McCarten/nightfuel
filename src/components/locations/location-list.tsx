import { getSortedLocations } from "@/lib/content";
import { LocationCard } from "./location-card";
import { MapPlaceholder } from "./map-placeholder";

/** Live placements first, then announced-but-not-shipped. */
export function LocationList() {
  const locations = getSortedLocations();

  return (
    <div>
      <MapPlaceholder />
      <ul className="grid gap-5 sm:grid-cols-2">
        {locations.map((location) => (
          <LocationCard key={location.id} location={location} />
        ))}
      </ul>
    </div>
  );
}
