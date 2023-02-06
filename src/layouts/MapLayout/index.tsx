import { MapLayout as Layout } from '@/components/templates';
import { useMapLayout } from '@/hooks/services';
import { Map } from '@/lib/navermap';
import { AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

export default function MapLayout({ children }: Props) {
  const {
    minZoom,
    maxZoom,
    initialZoom,
    initialCenter,
    onCreate,
    onClick,
    onIdle,
  } = useMapLayout();

  return (
    <Layout
      panels={<AnimatePresence initial={false}>{children}</AnimatePresence>}
      map={
        <Map
          center={initialCenter}
          zoom={initialZoom}
          minZoom={minZoom}
          maxZoom={maxZoom}
          onCreate={onCreate}
          onClick={onClick}
          onIdle={onIdle}
        />
      }
    />
  );
}
