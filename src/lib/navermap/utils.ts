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
