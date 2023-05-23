/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import { DanjiMarker, ListingMarker, RegionMarker } from '@/components/organisms';
import SchoolMarker from '@/components/organisms/map_markers/SchoolMarker';

import { useRecoilValue } from 'recoil';

import CustomOverlay from '@/lib/navermap/components/CustomOverlay';

import DeferredRender from '@/components/atoms/DeferredRender';
import MyMarkerIcon from '@/assets/icons/my_location.svg';
import SearchResultMarkerIcon from '@/assets/icons/search_result_marker.svg';
import { GetDanjiSummaryResponse } from '@/apis/map/mapDanjiSummary';
import { schoolAroundState } from '@/states/danjiButton';
import { styled } from 'twin.macro';
import { KakaoMapCategoryCode } from '@/lib/kakao/kakao_map_category';
import {
  AroundMarker as AroundMarkerType,
  CommonMarker,
  ListingDanjiMarker as ListingDanjiMarkerType,
  SchoolMarker as SchoolMarkerType,
} from './useMapLayout';
import AroundMarker from './AroundMarker';

interface MarkersProps {
  mapLevel: number;
  markers: ListingDanjiMarkerType[];
  schoolMarkers: SchoolMarkerType[];
  aroundMarkers: AroundMarkerType[];
  myMarker?: { lat: number; lng: number } | null;
  searchResultMarker?: { lat: number; lng: number } | null;
  selectedMarker?: CommonMarker | null;
  danjiSummary?: GetDanjiSummaryResponse;
  interactionSelectedMarker?: any;
}

export default function Markers({
  mapLevel,
  markers,
  schoolMarkers,
  aroundMarkers,
  myMarker,
  searchResultMarker,
  selectedMarker,
  danjiSummary,
  interactionSelectedMarker,
}: MarkersProps) {
  const { school, around, selectedAroundMarker, selectedSchoolMarker } = useRecoilValue(schoolAroundState);

  if (school || around) {
    return (
      <>
        {aroundMarkers.length > 0 &&
          aroundMarkers.map((item) => {
            if (typeof item.distance === 'string' && typeof item.place === 'string') {
              return (
                <DeferredRender key={item.id}>
                  <CustomOverlay
                    key={item.id}
                    position={{
                      lat: item.lat,
                      lng: item.lng,
                    }}
                    zIndex={selectedAroundMarker?.id === item.id ? 100 : 9}
                    anchor="bottom-left"
                  >
                    <AroundMarker
                      type={item.type}
                      place={item.place}
                      onClick={() => {
                        item.onClick?.call(item);
                      }}
                      selected={selectedAroundMarker?.id === item.id}
                    />
                  </CustomOverlay>
                </DeferredRender>
              );
            }

            return (
              <DeferredRender key={item.id}>
                <CustomOverlay
                  position={{
                    lat: item.lat,
                    lng: item.lng,
                  }}
                  zIndex={selectedAroundMarker?.id === item.id ? 100 : 9}
                  anchor="bottom-left"
                >
                  <AroundMarker
                    type={item.type}
                    duplicatedCount={item.duplicatedCount}
                    place={item.place}
                    onClick={() => {
                      item.onClick?.call(item);
                    }}
                    selected={selectedAroundMarker?.id === item.id}
                  />
                </CustomOverlay>
              </DeferredRender>
            );
          })}

        {schoolMarkers?.map((marker) => (
          <DeferredRender key={marker.id}>
            <CustomOverlay
              zIndex={selectedSchoolMarker?.id === marker.id ? 100 : 9}
              anchor="bottom-left"
              position={{
                lat: marker.lat,
                lng: marker.lng,
              }}
            >
              <SchoolMarker
                selected={selectedSchoolMarker?.id === marker.id}
                onClick={() => {
                  marker.onClick?.call(marker);
                }}
                name={marker.name}
                type={marker.type}
              />
            </CustomOverlay>
          </DeferredRender>
        ))}

        {interactionSelectedMarker && interactionSelectedMarker?.lat && interactionSelectedMarker?.lng && (
          <DeferredRender key={interactionSelectedMarker?.id}>
            <CustomOverlay
              zIndex={100}
              anchor="bottom-left"
              position={{
                lat: interactionSelectedMarker.lat,
                lng: interactionSelectedMarker.lng,
              }}
            >
              {interactionSelectedMarker?.pyoung && (
                <DanjiMarker
                  selected
                  variant="blue"
                  area={Number(interactionSelectedMarker?.pyoung ?? 0)}
                  price={interactionSelectedMarker?.price ?? 0}
                  count={interactionSelectedMarker?.listingCount ?? 0}
                  onClick={() => {
                    interactionSelectedMarker.onClick?.call(interactionSelectedMarker);
                  }}
                >
                  {danjiSummary?.pnu === interactionSelectedMarker?.pnu &&
                    danjiSummary?.realestate_type === interactionSelectedMarker?.danjiRealestateType && (
                      <DanjiMarker.Popper
                        name={danjiSummary?.string ?? ''}
                        householdCount={danjiSummary?.saedae_count ?? 0}
                        buyListingCount={danjiSummary?.buy_listing_count ?? 0}
                        rentListingCount={danjiSummary?.rent_listing_count ?? 0}
                      />
                    )}
                </DanjiMarker>
              )}
            </CustomOverlay>
          </DeferredRender>
        )}
      </>
    );
  }

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
              <RegionMarker
                variant={marker.variant}
                name={marker?.bubjungdongName ?? ''}
                onClick={() => {
                  marker.onClick?.call(marker);
                }}
              >
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
              zIndex={selectedMarker?.id === marker.id ? 100 : marker.listingCount ? 11 : 10}
              anchor="bottom-left"
              position={{
                lat: marker.lat,
                lng: marker.lng,
              }}
            >
              {marker.pyoung ? (
                <DanjiMarker
                  selected={selectedMarker?.id === marker.id}
                  variant={marker.variant}
                  area={Number(marker?.pyoung ?? 0)}
                  price={marker.price ?? 0}
                  count={marker?.listingCount ?? 0}
                  onClick={() => {
                    marker.onClick?.call(marker);
                  }}
                >
                  {selectedMarker?.id === marker.id &&
                    danjiSummary?.pnu === marker?.pnu &&
                    danjiSummary?.realestate_type === marker?.danjiRealestateType && (
                      <DanjiMarker.Popper
                        name={danjiSummary?.string ?? ''}
                        householdCount={danjiSummary?.saedae_count ?? 0}
                        buyListingCount={danjiSummary?.buy_listing_count ?? 0}
                        rentListingCount={danjiSummary?.rent_listing_count ?? 0}
                      />
                    )}
                </DanjiMarker>
              ) : (
                <ListingMarker
                  selected={selectedMarker?.id === marker.id}
                  price={marker.price ?? 0}
                  count={marker.listingCount ?? 0}
                  onClick={() => {
                    marker.onClick?.call(marker);
                  }}
                />
              )}
            </CustomOverlay>
          </DeferredRender>
        ))}

      {schoolMarkers?.map((marker) => (
        <DeferredRender key={marker.id}>
          <CustomOverlay
            zIndex={selectedMarker?.id === marker.id ? 100 : 9}
            anchor="bottom-left"
            position={{
              lat: marker.lat,
              lng: marker.lng,
            }}
          >
            <SchoolMarker
              selected={selectedMarker?.id === marker.id}
              onClick={() => {
                marker.onClick?.call(marker);
              }}
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

      {searchResultMarker && mapLevel < 3 && (
        <CustomOverlay
          position={{
            lat: searchResultMarker.lat,
            lng: searchResultMarker.lng,
          }}
        >
          <SearchResultMarkerIcon tw="w-10 h-10" />
        </CustomOverlay>
      )}
    </>
  );
}
