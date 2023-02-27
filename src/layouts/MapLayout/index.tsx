import { DanjiMarker } from '@/components/molecules';
import { MapLayout as Layout } from '@/components/templates';
import { useMapLayout } from '@/hooks/services';
import { Map } from '@/lib/navermap';
import CustomOverlay from '@/lib/navermap/components/CustomOverlay';
import { AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

function MapWrapper() {
  const props = useMapLayout();

  return (
    <Layout.MapContainer>
      <Map {...props}>
        <CustomOverlay
          position={{
            lat: 37.3945005,
            lng: 127.1109415,
          }}
        >
          <DanjiMarker variant="blue" area={34} price={300000000} count={1} />
        </CustomOverlay>
      </Map>
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
