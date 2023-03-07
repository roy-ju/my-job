import { MapLayout as Layout } from '@/components/templates';
import { useMapLayout } from '@/hooks/services';
import { Map } from '@/lib/navermap';
import { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

function MapWrapper() {
  const {
    // Layout.MapContainer
    morphToCurrentLocation,
    zoomIn,
    zoomOut,
    setMapTypeNormal,
    setMapTypeTerrain,
    toggleStreetLayer,
    handleChangeSchoolType,
    isStreetLayerActive,
    schoolType,
    // Map
    ...props
  } = useMapLayout();

  return (
    <Layout.MapContainer
      mapType={props.mapType}
      schoolType={schoolType}
      isStreetLayerActive={isStreetLayerActive}
      onClickCurrentLocation={morphToCurrentLocation}
      onClickZoomIn={zoomIn}
      onClickZoomOut={zoomOut}
      onClickMapTypeNormal={setMapTypeNormal}
      onClickMapTypeTerrain={setMapTypeTerrain}
      onClickMapTypeRoadMap={toggleStreetLayer}
      onChangeSchoolType={handleChangeSchoolType}
    >
      <Map {...props} />
    </Layout.MapContainer>
  );
}

export default function MapLayout({ children }: Props) {
  return (
    <Layout>
      <Layout.Panels>{children}</Layout.Panels>
      {/* Map 과 useMapLayout 의 state 가 Panel 안에 그려지는 화면의 영향을 주지 않기위해서
      분리된 컴포넌트로 사용한다. */}
      <MapWrapper />
    </Layout>
  );
}
