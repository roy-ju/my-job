import { MapLayout as Layout } from '@/components/templates';
import { useMapLayout } from '@/hooks/services';
import { Map } from '@/lib/navermap';
import { AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

function MapWrapper() {
  const {
    minZoom,
    maxZoom,
    initialZoom,
    initialCenter,
    onInit,
    onCreate,
    onClick,
    onIdle,
  } = useMapLayout();

  return (
    <Map
      center={initialCenter}
      zoom={initialZoom}
      minZoom={minZoom}
      maxZoom={maxZoom}
      onInit={onInit}
      onCreate={onCreate}
      onClick={onClick}
      onIdle={onIdle}
    />
  );
}

export default function MapLayout({ children }: Props) {
  return (
    <Layout
      panels={<AnimatePresence initial={false}>{children}</AnimatePresence>}
      map={<MapWrapper />}
    />
  );
}
