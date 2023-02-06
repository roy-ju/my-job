import { Map, NaverMap } from '@/lib/navermap';
import { ReactNode } from 'react';

type Props = {
  center: { lat: number; lng: number };
  zoom: number;
  minZoom: number;
  maxZoom: number;
  children?: ReactNode;
  onCreate: (map: NaverMap) => void;
  onClick: () => void;
  onIdle: (map: NaverMap) => void;
};

export default function NegocioMap({
  center,
  zoom,
  minZoom,
  maxZoom,
  onCreate,
  onClick,
  onIdle,
  children,
}: Props) {
  return (
    <div className="flex h-full w-full flex-row overflow-hidden">
      {children}
      <div id="map-container" className="flex-1">
        <Map
          center={center}
          zoom={zoom}
          minZoom={minZoom}
          maxZoom={maxZoom}
          onCreate={onCreate}
          onClick={onClick}
          onIdle={onIdle}
        />
      </div>
    </div>
  );
}
