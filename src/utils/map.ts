/**
 * Zoom 8: 30km
 * Zoom 9: 20km
 * Zoom 10: 10km
 * Zoom 11: 5km
 * Zoom 12: 3km
 * Zoom 13: 1km
 * Zoom 14: 500m
 * Zoom 15: 300m
 * Zoom 16: 100m
 * Zoom 17: 50m
 * Zoom 18: 30m
 * Zoom 19: 20m
 */
export function getZoomByMeters(meters: number) {
  if (meters <= 5) return 21;
  if (meters <= 10) return 20;
  if (meters <= 20) return 19;
  if (meters <= 30) return 18;
  if (meters <= 50) return 17;
  if (meters <= 100) return 16;
  if (meters <= 300) return 15;
  if (meters <= 500) return 14;
  if (meters <= 1000) return 13;
  if (meters <= 3000) return 12;
  if (meters <= 5000) return 11;
  if (meters <= 10000) return 10;
  if (meters <= 20000) return 9;
  return 8;
}

export function getMetersByZoom(zoom: number) {
  if (zoom === 21) return 5;
  if (zoom === 20) return 10;
  if (zoom === 19) return 20;
  if (zoom === 18) return 30;
  if (zoom === 17) return 50;
  if (zoom === 16) return 100;
  if (zoom === 15) return 300;
  if (zoom === 14) return 500;
  if (zoom === 13) return 1000;
  if (zoom === 12) return 3000;
  if (zoom === 11) return 5000;
  if (zoom === 10) return 10000;
  if (zoom === 9) return 20000;
  if (zoom === 8) return 30000;
  return -1;
}

export function getZoomByMapLevel(mapLevel: number) {
  if (mapLevel === 4) {
    return 8;
  }
  if (mapLevel === 3) {
    return 11;
  }
  if (mapLevel === 2) {
    return 14;
  }
  if (mapLevel === 1) {
    return 15;
  }
}
