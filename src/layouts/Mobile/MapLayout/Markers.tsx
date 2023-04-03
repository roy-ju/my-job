import { MobDanjiMarker, MobRegionMarker } from '@/components/organisms';

import CustomOverlay from '@/lib/navermap/components/CustomOverlay';

import DeferredRender from '@/components/atoms/DeferredRender';
import MobSchoolMarker from '@/components/organisms/map_markers/MobSchoolMarker';
import { useCallback, useEffect, useMemo } from 'react';
import { toastError } from '@/components/molecules';
import { CommonMapMarker, CommonSchoolMarker, DanjiSummary } from './useMapLayout';

interface MarkersProps {
  mapLevel: number;
  markers: CommonMapMarker[];
  schoolMarkers: CommonSchoolMarker[];
  selectedDanjiSummary: DanjiSummary | null;
  selectedSchoolID: string;
}

export default function Markers({
  mapLevel,
  markers,
  schoolMarkers,
  selectedDanjiSummary,
  selectedSchoolID,
}: MarkersProps) {
  const shouldShowSchoolMarker = useMemo(() => {
    if (mapLevel !== 1 && schoolMarkers.length > 1) {
      toastError({ message: '지도를 확대하여 학교마커를 확인하세요.', id: 'toast-error-map-school' });
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
              <MobDanjiMarker
                selected={selectedDanjiSummary?.id === marker.id}
                variant={marker.variant}
                area={Number(marker?.pyoung ?? 0)}
                price={marker.price ?? 0}
                count={marker?.listingCount ?? 0}
                onClick={marker.onClick}
              >
                {selectedDanjiSummary?.id === marker.id && (
                  <MobDanjiMarker.Popper
                    name={selectedDanjiSummary?.name ?? ''}
                    householdCount={selectedDanjiSummary?.householdCount ?? 0}
                    buyListingCount={selectedDanjiSummary?.buyListingCount ?? 0}
                    rentListingCount={selectedDanjiSummary?.rentListingCount ?? 0}
                  />
                )}
              </MobDanjiMarker>
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
    </>
  );
}
