import MapMarkerSearchItem from '@/assets/icons/mob_map_danji_pin.svg';

type MapMarkerSearchItemProps = { width?: string; height?: string; opacity?: number };

export default function MapMarkerSearch({ width = '32px', height = '32px', opacity = 0.9 }: MapMarkerSearchItemProps) {
  return <MapMarkerSearchItem style={{ width, height, opacity }} tw="animate-bounce" />;
}
