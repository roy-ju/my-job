import { MobDanjiMarker, MobListingMarker, MobRegionMarker } from '@/components/organisms';

import CustomOverlay from '@/lib/navermap/components/CustomOverlay';

import DeferredRender from '@/components/atoms/DeferredRender';
import MobSchoolMarker from '@/components/organisms/map_markers/MobSchoolMarker';
import { useMemo } from 'react';
import MyMarkerIcon from '@/assets/icons/my_location.svg';
import { toast } from 'react-toastify';
import { CommonMapMarker, CommonSchoolMarker, DanjiSummary } from './useMapLayout';

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
  const shouldShowSchoolMarker = useMemo(() => {
    if (mapLevel !== 1 && schoolMarkers.length > 1) {
      toast.error('지도를 확대하여 학교마커를 확인하세요.', { toastId: 'toast-error-school' });
      return false;
    }

    if (mapLevel === 1 && schoolMarkers.length > 1) {
      return true;
    }

    return false;
  }, [mapLevel, schoolMarkers]);

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
              <MobRegionMarker variant={marker.variant} name={marker?.bubjungdongName ?? ''} onClick={marker.onClick}>
                <MobRegionMarker.DanjiCount count={marker?.danjiCount ?? 0} />
                <MobRegionMarker.Divider />
                <MobRegionMarker.ListingCount count={marker.listingCount} />
              </MobRegionMarker>
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
              {marker.pyoung ? (
                <MobDanjiMarker
                  selected={selectedDanjiSummary?.id === marker.id}
                  variant={marker.variant}
                  area={Number(marker?.pyoung ?? 0)}
                  price={marker.price ?? 0}
                  count={marker?.listingCount ?? 0}
                  onClick={marker.onClick}
                />
              ) : (
                <MobListingMarker
                  selected={selectedDanjiSummary?.id === marker.id}
                  price={marker.price ?? 0}
                  count={marker.listingCount ?? 0}
                  onClick={marker.onClick}
                />
              )}
            </CustomOverlay>
          </DeferredRender>
        ))}

      {(mapLevel ?? 4) < 3 &&
        shouldShowSchoolMarker &&
        schoolMarkers?.map((marker) => (
          <DeferredRender key={marker.id}>
            <CustomOverlay
              zIndex={selectedSchoolID === marker.id ? 100 : 9}
              anchor="bottom-left"
              position={{
                lat: marker.lat,
                lng: marker.lng,
              }}
            >
              <MobSchoolMarker
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
