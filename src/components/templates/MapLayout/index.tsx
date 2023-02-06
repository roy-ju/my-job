import { ReactNode } from 'react';

type Props = {
  map: ReactNode;
  panels: ReactNode;
};

export default function NegocioMap({ map, panels }: Props) {
  return (
    <div className="flex h-full w-full flex-row overflow-hidden">
      {panels}
      <div id="map-container" className="flex-1">
        {map}
      </div>
    </div>
  );
}
