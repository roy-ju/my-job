import DeferredRender from '@/components/atoms/DeferredRender';

import { DanjiSummary } from '@/hooks/useMobileMapLayout';

import CustomOverlay from '@/lib/navermap/components/CustomOverlay';

import MyMarkerIcon from '@/assets/icons/my_location.svg';

import { CommonSchoolMarker, CommonMapMarker } from '@/types/mobileMarkers';

import MobileRegionMarker from '@/components/domains/map/map_markers/mobile-region-marker';

import MobileDanjiMarker from '@/components/domains/map/map_markers/mobile-danji-marker';

import MobileSchoolMarker from '@/components/domains/map/map_markers/mobile-school-marker';

interface MarkersProps {
  mapLevel: number;
  markers: CommonMapMarker[];
  schoolMarkers: CommonSchoolMarker[];
  selectedDanjiSummary: DanjiSummary | null;
  selectedSchoolID: string;
  myMarker?: {
    lat: number;
    lng: number;
  } | null;
}

export default function Markers({
  mapLevel,
  markers,
  schoolMarkers,
  selectedDanjiSummary,
  selectedSchoolID,
  myMarker,
}: MarkersProps) {
  return (
    <>
      {mapLevel !== 1 &&
        markers.map((marker) => (
          <DeferredRender key={marker.id}>
            <CustomOverlay
              position={{
                lat: marker.lat,
                lng: marker.lng,
              }}
            >
              <MobileRegionMarker
                variant={marker.variant}
                name={marker?.bubjungdongName ?? ''}
                onClick={marker.onClick}
              >
                <MobileRegionMarker.DanjiCount count={marker?.danjiCount ?? 0} />
                <MobileRegionMarker.Divider />
                <MobileRegionMarker.ListingCount count={marker.listingCount} />
              </MobileRegionMarker>
            </CustomOverlay>
          </DeferredRender>
        ))}

      {mapLevel === 1 &&
        markers.map((marker) => (
          <DeferredRender key={marker.id}>
            <CustomOverlay
              zIndex={selectedDanjiSummary?.id === marker.id ? 100 : marker.listingCount ? 11 : 10}
              anchor="bottom-left"
              position={{
                lat: marker.lat,
                lng: marker.lng,
              }}
            >
              <MobileDanjiMarker
                selected={selectedDanjiSummary?.id === marker.id}
                variant={marker.variant}
                area={Number(marker?.pyoung ?? 0)}
                price={marker.price ?? 0}
                count={marker?.listingCount ?? 0}
                onClick={marker.onClick}
              />
            </CustomOverlay>
          </DeferredRender>
        ))}

      {schoolMarkers?.map((marker) => (
        <DeferredRender key={marker.id}>
          <CustomOverlay
            zIndex={selectedSchoolID === marker.id ? 100 : 9}
            anchor="bottom-left"
            position={{
              lat: marker.lat,
              lng: marker.lng,
            }}
          >
            <MobileSchoolMarker
              selected={selectedSchoolID === marker.id}
              onClick={marker.onClick}
              name={marker.name}
              type={marker.type}
            />
          </CustomOverlay>
        </DeferredRender>
      ))}

      {myMarker && mapLevel < 3 && (
        <CustomOverlay
          position={{
            lat: myMarker.lat,
            lng: myMarker.lng,
          }}
        >
          <MyMarkerIcon />
        </CustomOverlay>
      )}
    </>
  );
}
