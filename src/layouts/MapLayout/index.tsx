import { MapLayout as Layout } from '@/components/templates';
import { useMapLayout } from '@/hooks/services';
import { Map } from '@/lib/navermap';
import { AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

function MapWrapper() {
  const props = useMapLayout();

  return (
    <Layout.MapContainer>
      <Map {...props} />
    </Layout.MapContainer>
  );
}

export default function MapLayout({ children }: Props) {
  return (
    <Layout>
      <Layout.Panels>
        <AnimatePresence initial={false}>{children}</AnimatePresence>
      </Layout.Panels>
      <MapWrapper />
    </Layout>
  );
}
