import { NegocioMap } from '@/components/templates';
import { useMapLayout } from '@/hooks/services';
import type { ReactNode } from 'react';

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
    <NegocioMap
      center={initialCenter}
      zoom={initialZoom}
      minZoom={minZoom}
      maxZoom={maxZoom}
      onCreate={onCreate}
      onClick={onClick}
      onIdle={onIdle}
    >
      {children}
    </NegocioMap>
  );
}
