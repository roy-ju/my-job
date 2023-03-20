import { DanjiMarker, RegionMarker } from '@/components/organisms';
import SchoolMarker from '@/components/organisms/map_markers/SchoolMarker';

import CustomOverlay from '@/lib/navermap/components/CustomOverlay';

import DeferredRender from '@/components/atoms/DeferredRender';
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
              <RegionMarker variant={marker.variant} name={marker?.bubjungdongName ?? ''} onClick={marker.onClick}>
                <RegionMarker.DanjiCount count={marker?.danjiCount ?? 0} />
                <RegionMarker.Divider />
                <RegionMarker.ListingCount count={marker.listingCount} />
              </RegionMarker>
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
              <DanjiMarker
                selected={selectedDanjiSummary?.id === marker.id}
                variant={marker.variant}
                area={Number(marker?.pyoung ?? 0)}
                price={marker.price ?? 0}
                count={marker?.listingCount ?? 0}
                onClick={marker.onClick}
              >
                {selectedDanjiSummary?.id === marker.id && (
                  <DanjiMarker.Popper
                    name={selectedDanjiSummary?.name ?? ''}
                    householdCount={selectedDanjiSummary?.householdCount ?? 0}
                    buyListingCount={selectedDanjiSummary?.buyListingCount ?? 0}
                    rentListingCount={selectedDanjiSummary?.rentListingCount ?? 0}
                  />
                )}
              </DanjiMarker>
            </CustomOverlay>
          </DeferredRender>
        ))}

      {(mapLevel ?? 4) < 3 &&
        schoolMarkers?.map((marker) => (
          <DeferredRender key={marker.id}>
            <CustomOverlay
              zIndex={selectedSchoolID === marker.id ? 100 : 9}
              position={{
                lat: marker.lat,
                lng: marker.lng,
              }}
            >
              <SchoolMarker
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
