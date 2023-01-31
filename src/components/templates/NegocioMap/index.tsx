import { Map, NaverMap } from '@/lib/navermap';
import type { ReactNode } from 'react';

type Props = {
  center: { lat: number; lng: number };
  zoom: number;
  minZoom: number;
  maxZoom: number;
  children?: ReactNode;
  onCreate: (map: NaverMap) => void;
  onClick: () => void;
};

export default function NegocioMap({
  center,
  zoom,
  minZoom,
  maxZoom,
  onCreate,
  onClick,
  children,
}: Props) {
  return (
    <div className="flex h-full w-full flex-row overflow-hidden">
      {children}
      <div className="h-full flex-1">
        <Map
          center={center}
          zoom={zoom}
          minZoom={minZoom}
          maxZoom={maxZoom}
          onCreate={onCreate}
          onClick={onClick}
        />
      </div>
    </div>
  );
}
