import { useRef } from 'react';

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

export interface PanoramaProps {
  position: {
    lat: number;
    lng: number;
  };
  onCreate?: (panorama: naver.maps.Panorama) => void;
}

export default function Panorama({ onCreate, position }: PanoramaProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const container = containerRef.current;

    if (!container) return () => {};
    if (typeof naver === 'undefined') return () => {};

    try {
      const p = new naver.maps.Panorama(container, {
        position: new naver.maps.LatLng(position.lat, position.lng),
        logoControlOptions: { position: naver.maps.Position.LEFT_BOTTOM },
        pov: {
          pan: -105,
          tilt: 10,
          fov: 100,
        },
      });
      onCreate?.(p);
      return () => {};
    } catch (e) {
      return () => {};
    }
  }, [onCreate]);

  return <div ref={containerRef} tw="h-full w-full" />;
}
