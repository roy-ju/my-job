import { createContext } from 'react';

interface IMapStreetViewContext {
  panorama: naver.maps.Panorama | null;
  setPanorama: (p: naver.maps.Panorama | null) => void;
  position: { lat: number; lng: number };
  expanded: boolean;
  setExpanded: (v: boolean | ((prev: boolean) => boolean)) => void;
}

const MapStreetViewContext = createContext<IMapStreetViewContext>({
  panorama: null,
  position: { lat: 0, lng: 0 },
  expanded: false,
  setPanorama: () => {},
  setExpanded: () => {},
});

export default MapStreetViewContext;
