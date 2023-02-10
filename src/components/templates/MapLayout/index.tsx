import { ReactNode } from 'react';

type PropsWithChildren = { children?: ReactNode };

function LayoutMain({ children }: PropsWithChildren) {
  return <div tw="flex h-full w-full flex-row overflow-hidden">{children}</div>;
}

function LayoutPanels({ children }: PropsWithChildren) {
  return <div tw="flex flex-row z-20">{children}</div>;
}

function LayoutMapContainer({ children }: PropsWithChildren) {
  return (
    <div id="map-container" tw="relative flex-1 z-10">
      <button
        type="button"
        tw="absolute bg-amber-700 p-2 top-0 right-0 z-[1000]"
      >
        CLICK
      </button>
      {children}
    </div>
  );
}

export default Object.assign(LayoutMain, {
  Panels: LayoutPanels,
  MapContainer: LayoutMapContainer,
});
