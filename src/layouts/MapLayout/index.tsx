import { MapLayout as Layout } from '@/components/templates';
import { useMapLayout, useMapMarkers } from '@/hooks/services';
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
    handleChangeMapType,
    handleChangeMapLayer,
    handleChangeSchoolType,
    mapType,
    mapLayer,
    schoolType,
    handleMapSearch,
    centerAddress,
    // Map
    ...props
  } = useMapLayout();

  const { filter, handleChangeFilter } = useMapMarkers();

  return (
    <Layout.MapContainer
      mapLayer={mapLayer}
      mapType={mapType}
      schoolType={schoolType}
      filter={filter}
      centerAddress={centerAddress}
      onClickCurrentLocation={morphToCurrentLocation}
      onClickZoomIn={zoomIn}
      onClickZoomOut={zoomOut}
      onChangeMapType={handleChangeMapType}
      onClickMapLayerCadastral={() => handleChangeMapLayer('cadastral')}
      onClickMapLayerStreet={() => handleChangeMapLayer('street')}
      onChangeSchoolType={handleChangeSchoolType}
      onMapSearchSubmit={handleMapSearch}
      onChangeFilter={handleChangeFilter}
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
