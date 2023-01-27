import { Map } from '@/lib/navermap';
import type { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

export default function MapLayout({ children }: Props) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="absolute top-0 left-0 z-0 h-full w-full">
        <Map
          center={{
            lat: 37.3945005,
            lng: 127.1109415,
          }}
          zoom={17}
        />
      </div>
      {children}
    </div>
  );
}
