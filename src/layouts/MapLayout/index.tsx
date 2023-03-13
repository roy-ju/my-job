import { DanjiMarker, RegionMarker } from '@/components/organisms';
import { MapLayout as Layout } from '@/components/templates';
import { useMapLayout } from '@/hooks/services';
import { Map } from '@/lib/navermap';
import CustomOverlay from '@/lib/navermap/components/CustomOverlay';
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
    handleMapSearch,
    handleChangeFilter,
    mapType,
    mapLayer,
    schoolType,
    centerAddress,
    bounds,
    filter,
    markers,
    // Map
    ...props
  } = useMapLayout();

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
      <Map {...props}>
        {bounds?.mapLevel !== 1 &&
          markers?.map((marker) => (
            <CustomOverlay
              key={marker.bubjungdongCode}
              position={{
                lat: marker.lat,
                lng: marker.lng,
              }}
            >
              <RegionMarker variant="blue" name={marker?.bubjungdongName ?? ''}>
                <RegionMarker.DanjiCount count={marker?.danjiCount ?? 0} />
                <RegionMarker.Divider />
                <RegionMarker.ListingCount count={marker.listingCount} />
              </RegionMarker>
            </CustomOverlay>
          ))}

        {bounds?.mapLevel === 1 &&
          markers?.map((marker) => (
            <CustomOverlay
              key={`${marker.pnu}${marker.danjiRealestateType}`}
              position={{
                lat: marker.lat,
                lng: marker.lng,
              }}
            >
              <DanjiMarker
                variant="blue"
                area={Number(marker?.pyoung ?? 0)}
                price={marker.price ?? 0}
                count={marker?.listingCount ?? 0}
              />
            </CustomOverlay>
          ))}
      </Map>
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
