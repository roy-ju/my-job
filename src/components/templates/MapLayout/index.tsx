import { ReactNode } from 'react';

type Props = {
  map: ReactNode;
  panels: ReactNode;
};

export default function NegocioMap({ map, panels }: Props) {
  return (
    <div tw="flex h-full w-full flex-row overflow-hidden">
      <div tw="flex flex-row z-20">{panels}</div>
      <div id="map-container" tw="flex-1 z-10">
        {map}
      </div>
    </div>
  );
}
