import { useCallback, useContext, useEffect, useRef } from 'react';

import MapStreetViewContext from '../context/MapStreetViewContext';

export default function useStreetView() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { setPanorama, panorama, expanded, position } = useContext(MapStreetViewContext);

  const onCreate = useCallback(
    (p: naver.maps.Panorama) => {
      setPanorama(p);
    },
    [setPanorama],
  );

  useEffect(() => {
    const callback = () => {
      if (!containerRef.current || !panorama) return;
      if (!naver.maps) return;

      const { offsetWidth, offsetHeight } = containerRef.current;

      const size = new naver.maps.Size(offsetWidth, offsetHeight);

      panorama.setSize(size);
    };

    window.addEventListener('resize', callback);
    return () => window.removeEventListener('resize', callback);
  }, [panorama]);

  return { containerRef, expanded, position, onCreate };
}
