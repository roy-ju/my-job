import { DanjiMarker, RegionMarker } from '@/components/organisms';
import SchoolMarker from '@/components/organisms/map_markers/SchoolMarker';
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
    handleChangeMapToggleValue,
    mapType,
    mapLayer,
    schoolType,
    centerAddress,
    bounds,
    filter,
    markers,
    schoolMarkers,
    mapToggleValue,
    listingCount,
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
      mapToggleValue={mapToggleValue}
      listingCount={listingCount}
      onClickCurrentLocation={morphToCurrentLocation}
      onClickZoomIn={zoomIn}
      onClickZoomOut={zoomOut}
      onChangeMapType={handleChangeMapType}
      onClickMapLayerCadastral={() => handleChangeMapLayer('cadastral')}
      onClickMapLayerStreet={() => handleChangeMapLayer('street')}
      onChangeSchoolType={handleChangeSchoolType}
      onMapSearchSubmit={handleMapSearch}
      onChangeFilter={handleChangeFilter}
      onChangeMapToggleValue={handleChangeMapToggleValue}
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
              <RegionMarker variant={marker.variant} name={marker?.bubjungdongName ?? ''}>
                <RegionMarker.DanjiCount count={marker?.danjiCount ?? 0} />
                <RegionMarker.Divider />
                <RegionMarker.ListingCount count={marker.listingCount} />
              </RegionMarker>
            </CustomOverlay>
          ))}

        {bounds?.mapLevel === 1 &&
          markers?.map((marker) => (
            <CustomOverlay
              anchor="bottom-left"
              key={`${marker.pnu}${marker.danjiRealestateType}`}
              position={{
                lat: marker.lat,
                lng: marker.lng,
              }}
            >
              <DanjiMarker
                variant={marker.variant}
                area={Number(marker?.pyoung ?? 0)}
                price={marker.price ?? 0}
                count={marker?.listingCount ?? 0}
              />
            </CustomOverlay>
          ))}

        {(bounds?.mapLevel ?? 4) < 3 &&
          schoolMarkers?.map((marker) => (
            <CustomOverlay
              key={marker.id}
              position={{
                lat: marker.lat,
                lng: marker.lng,
              }}
            >
              <SchoolMarker onClick={marker.onClick} name={marker.name} type={marker.type} />
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
