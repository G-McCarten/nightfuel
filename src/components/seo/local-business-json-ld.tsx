import { siteConfig } from "@/content/site";
import { getLiveLocations } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

/**
 * Organization at launch. Once machines are placed, each live location is also
 * emitted as a LocalBusiness with its address and coordinates, which is what
 * gets NightFuel into "near me" results.
 */
export function LocalBusinessJsonLd() {
  const organization = {
    "@type": "Organization",
    "@id": `${absoluteUrl("/")}#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: absoluteUrl("/"),
    slogan: siteConfig.tagline,
    areaServed: { "@type": "State", name: "New Jersey" },
    sameAs: Object.values(siteConfig.social).filter(Boolean),
  };

  const businesses = getLiveLocations().map((location) => ({
    "@type": "LocalBusiness",
    "@id": `${absoluteUrl("/find-a-machine")}#${location.id}`,
    name: `${siteConfig.name} at ${location.venueName}`,
    parentOrganization: { "@id": organization["@id"] },
    address: {
      "@type": "PostalAddress",
      streetAddress: location.address,
      addressLocality: location.city,
      addressRegion: location.state,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: location.lat,
      longitude: location.lng,
    },
    ...(location.hours ? { openingHours: location.hours } : {}),
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [organization, ...businesses],
  };

  return (
    <script
      type="application/ld+json"
      // Built server-side from our own content modules, never from user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
