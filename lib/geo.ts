// City center coordinates — fallback when GPS is unavailable
export const CITY_CENTERS: Record<string, { lat: number; lng: number }> = {
  providence: { lat: 41.824, lng: -71.4128 },
  boston: { lat: 42.3555, lng: -71.0565 },
};

export const PROVIDENCE_CENTER = CITY_CENTERS.providence;

export function getCityCenter(city: string) {
  return CITY_CENTERS[city] ?? CITY_CENTERS.providence;
}

/**
 * Haversine formula — returns distance in miles between two lat/lng points.
 */
export function distanceMiles(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 3958.8; // Earth radius in miles
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

/**
 * Generates a deep-link URL for navigation to the given coordinates.
 * On iOS, Apple Maps opens automatically. On Android/desktop, Google Maps opens.
 */
export function generateMapsUrl(
  lat: number,
  lng: number,
  platform: "google" | "apple"
): string {
  if (platform === "apple") {
    return `https://maps.apple.com/?daddr=${lat},${lng}`;
  }
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}

/**
 * Returns both Google and Apple Maps URLs for a given coordinate pair.
 */
export function generateBothMapsUrls(lat: number, lng: number) {
  return {
    google: generateMapsUrl(lat, lng, "google"),
    apple: generateMapsUrl(lat, lng, "apple"),
  };
}
