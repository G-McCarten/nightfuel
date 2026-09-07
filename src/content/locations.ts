import type { Location } from "./types";

/**
 * Machine placements. Empty until the first venue goes live — /find-a-machine
 * branches on `hasLiveLocation()` and shows the teaser until then.
 *
 * To add the first one, copy the shape below:
 *
 * {
 *   id: "the-alibi-hoboken",
 *   venueName: "The Alibi",
 *   address: "123 Washington St",
 *   city: "Hoboken",
 *   state: "NJ",
 *   hours: "Thu–Sat, 9pm–2am",
 *   status: "live",
 *   lat: 40.7439,
 *   lng: -74.0324,
 * }
 */
export const locations: Location[] = [];
