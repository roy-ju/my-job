import { ReactNode } from 'react';

type Props = {
  map: ReactNode;
  panels: ReactNode;
};

export default function NegocioMap({ map, panels }: Props) {
  return (
    <div tw="flex h-full w-full flex-row overflow-hidden">
      {panels}
      <div id="map-container" tw="flex-1">
        {map}
      </div>
    </div>
  );
}
