import { NegocioMap } from '@/components/templates';
import { useMapLayout } from '@/hooks/services';
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
    <NegocioMap
      center={initialCenter}
      zoom={initialZoom}
      minZoom={minZoom}
      maxZoom={maxZoom}
      onCreate={onCreate}
      onClick={onClick}
      onIdle={onIdle}
    >
      <div className="flex h-full">{children}</div>
    </NegocioMap>
  );
}
