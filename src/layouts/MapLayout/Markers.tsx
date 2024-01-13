/* eslint-disable arrow-body-style */
import { useRouter as useNextRouter } from 'next/router';

import { useRecoilValue } from 'recoil';

import DeferredRender from '@/components/atoms/DeferredRender';

import { DanjiMarker, RegionMarker } from '@/components/organisms';

import SchoolMarker from '@/components/organisms/map_markers/SchoolMarker';

import {
  AroundMarker as AroundMarkerType,
  CommonMarker,
  ListingDanjiMarker as ListingDanjiMarkerType,
  SchoolMarker as SchoolMarkerType,
} from '@/types/markers';

import danjiInteractionAtom from '@/states/atom/danjiInteraction';

import useDanjiInteraction from '@/states/hooks/useDanjiInteraction';

import CustomOverlay from '@/lib/navermap/components/CustomOverlay';

import { GetDanjiSummaryResponse } from '@/apis/map/mapDanjiSummary';

import MyMarkerIcon from '@/assets/icons/my_location.svg';

import SearchResultMarkerIcon from '@/assets/icons/search_result_marker.svg';

import AroundMarker from './AroundMarker';

interface MarkersProps {
  mapLevel: number;
  markers: ListingDanjiMarkerType[];
  schoolMarkers: SchoolMarkerType[];
  aroundMarkers: AroundMarkerType[];
  myMarker?: { lat: number; lng: number } | null;
  searchResultMarker?: { lat: number; lng: number } | null;
  selectedMarker?: CommonMarker | null;
  selectedMouseOverMarker?: CommonMarker | null;
  danjiSummary?: GetDanjiSummaryResponse;
  interactionSelectedDanjiSummary?: GetDanjiSummaryResponse;
  interactionStateDanjiSummary?: GetDanjiSummaryResponse;
  selectedMouseOverDanjiSummary?: GetDanjiSummaryResponse;
  interactionSelectedMarker?: any;
  mapBuyOrRent?: string;
}

export default function Markers({
  mapLevel,
  markers,
  schoolMarkers,
  aroundMarkers,
  myMarker,
  searchResultMarker,
  selectedMarker,
  selectedMouseOverMarker,
  danjiSummary,
  interactionSelectedDanjiSummary,
  interactionStateDanjiSummary,
  selectedMouseOverDanjiSummary,
  interactionSelectedMarker,
  mapBuyOrRent,
}: MarkersProps) {
  const router = useNextRouter();

  const { school, around, selectedAroundMarker, selectedSchoolMarker, danjiAroundPlaceName, activeCategory } =
    useRecoilValue(danjiInteractionAtom);

  const interactionAction = useDanjiInteraction({ danjiData: undefined });

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
                        interactionAction.makeDanjiAroundPlaceName('');
                      }}
                      selected={
                        activeCategory === 'SW8'
                          ? typeof item.place === 'string' && danjiAroundPlaceName
                            ? danjiAroundPlaceName === item?.place?.split(' ')[0]
                            : selectedAroundMarker?.id === item.id
                          : selectedAroundMarker?.id === item.id
                      }
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
                      interactionAction.makeDanjiAroundPlaceName('');
                    }}
                    selected={
                      activeCategory === 'SW8'
                        ? typeof item.place === 'string' && danjiAroundPlaceName
                          ? danjiAroundPlaceName === item?.place?.split(' ')[0]
                          : selectedAroundMarker?.id === item.id
                        : selectedAroundMarker?.id === item.id
                    }
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
                  {interactionSelectedDanjiSummary?.danji_id === interactionSelectedMarker?.danjiID &&
                    interactionSelectedDanjiSummary?.realestate_type ===
                      interactionSelectedMarker?.danjiRealestateType &&
                    !!interactionSelectedDanjiSummary?.saedae_count && (
                      <DanjiMarker.Popper
                        name={interactionSelectedDanjiSummary?.string ?? ''}
                        suggestCount={interactionSelectedDanjiSummary.suggest_count ?? 0}
                        householdCount={interactionSelectedDanjiSummary?.saedae_count}
                        buyListingCount={interactionSelectedDanjiSummary?.buy_listing_count ?? 0}
                        rentListingCount={interactionSelectedDanjiSummary?.rent_listing_count ?? 0}
                        onClick={() => {}}
                        mapBuyOrRent={mapBuyOrRent}
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
        markers.map((marker) => {
          return (
            <DeferredRender key={marker.id}>
              <CustomOverlay
                zIndex={
                  selectedMarker?.id === marker.id
                    ? 100
                    : selectedMouseOverMarker?.id === marker.id
                    ? 99
                    : `danjiMarker:${interactionStateDanjiSummary?.danji_id}${interactionStateDanjiSummary?.realestate_type}` ===
                      marker.id
                    ? 99
                    : marker.listingCount
                    ? 11
                    : 10
                }
                anchor="bottom-left"
                position={{
                  lat: marker.lat,
                  lng: marker.lng,
                }}
              >
                <DanjiMarker
                  selected={selectedMarker?.id === marker.id || marker.danjiID === Number(router?.query?.danjiID)}
                  variant={marker.variant}
                  area={Number(marker?.pyoung ?? 0)}
                  price={marker.price ?? 0}
                  count={marker?.listingCount ?? 0}
                  onClick={() => {
                    marker.onClick?.call(marker);
                  }}
                  onMouseOver={() => {
                    marker.onMouseOver?.call(marker);
                  }}
                  onMouseLeave={() => {
                    marker.onMouseLeave?.call(marker);
                  }}
                >
                  {danjiSummary
                    ? danjiSummary?.danji_id === marker?.danjiID &&
                      danjiSummary?.realestate_type === marker?.danjiRealestateType &&
                      !!danjiSummary?.saedae_count &&
                      selectedMarker?.id === marker.id && (
                        <DanjiMarker.Popper
                          name={danjiSummary?.string ?? ''}
                          householdCount={danjiSummary.saedae_count}
                          suggestCount={danjiSummary.suggest_count ?? 0}
                          buyListingCount={danjiSummary?.buy_listing_count ?? 0}
                          rentListingCount={danjiSummary?.rent_listing_count ?? 0}
                          mapBuyOrRent={mapBuyOrRent}
                          onClick={() => {}}
                        />
                      )
                    : interactionStateDanjiSummary?.danji_id === marker?.danjiID &&
                      interactionStateDanjiSummary?.realestate_type === marker?.danjiRealestateType &&
                      !!interactionStateDanjiSummary?.saedae_count && (
                        <DanjiMarker.Popper
                          name={interactionStateDanjiSummary?.string ?? ''}
                          householdCount={interactionStateDanjiSummary.saedae_count}
                          suggestCount={interactionStateDanjiSummary.suggest_count ?? 0}
                          buyListingCount={interactionStateDanjiSummary?.buy_listing_count ?? 0}
                          rentListingCount={interactionStateDanjiSummary?.rent_listing_count ?? 0}
                          mapBuyOrRent={mapBuyOrRent}
                          onClick={() => {}}
                        />
                      )}

                  {selectedMouseOverDanjiSummary &&
                    selectedMouseOverDanjiSummary?.danji_id === marker?.danjiID &&
                    selectedMouseOverDanjiSummary?.realestate_type === marker?.danjiRealestateType &&
                    !!selectedMouseOverDanjiSummary?.saedae_count &&
                    selectedMouseOverMarker?.id === marker.id &&
                    selectedMouseOverMarker?.id !== selectedMarker?.id && (
                      <DanjiMarker.Popper
                        name={selectedMouseOverDanjiSummary?.string ?? ''}
                        suggestCount={selectedMouseOverDanjiSummary.suggest_count ?? 0}
                        householdCount={selectedMouseOverDanjiSummary.saedae_count}
                        buyListingCount={selectedMouseOverDanjiSummary?.buy_listing_count ?? 0}
                        rentListingCount={selectedMouseOverDanjiSummary?.rent_listing_count ?? 0}
                        mapBuyOrRent={mapBuyOrRent}
                        onClick={() => {}}
                      />
                    )}
                </DanjiMarker>
              </CustomOverlay>
            </DeferredRender>
          );
        })}

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
