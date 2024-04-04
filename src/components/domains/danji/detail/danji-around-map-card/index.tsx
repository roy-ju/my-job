/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-return-assign */

import { Dispatch } from 'react';

import dynamic from 'next/dynamic';

import { NaverMapV1 } from '@/lib/navermapV1';

import { KakaoMapCategoryCode } from '@/lib/kakao/kakao_map_category';

import useDanjiAroundMapCardMobile from './hooks/useDanjiAroundMapCardMobile';

import { Box, PlaceNameText, PlaceNameWrraper, styles } from './widget/DanjiAroundMapCardWidget';

import { AroundListType } from './types';

import { CommonDanjiDetailProps } from '../types';

import MapMarkerSearch from '../shared/MapMarkerSearch';

import { MapMarkerShadow } from '../shared/widgets';

const CustomOverlayDanji = dynamic(() => import('../CustomOverlayDanji'), { ssr: false });

interface DanjiAroundMapCardProps extends CommonDanjiDetailProps {
  activeIndex?: number;
  aroundList: AroundListType;
  addressName: string;
  defaultMapSize?: string;
  isCircle?: boolean;
  isEventMarker?: boolean;
  isNewMarker?: boolean;
  danjiAroundLat?: string;
  danjiAroundLng?: string;
  getPlaceName?: (name: string | { placeName: string; distance: string }[]) => void;
  setM?: Dispatch<React.SetStateAction<naver.maps.Map | null | undefined>>;
  handleAddressName?: (val: string) => void;
  handlePlaceName?: (val: string) => void;
  handleSelectedSubwayMarker?: (val?: string) => void;
  placeName?: string;
  selectedSubwayMarker?: string;
}

export default function DanjiAroundMapCard({
  activeIndex,
  aroundList,
  addressName,
  danji,
  defaultMapSize = '190px',
  isCircle = false,
  isEventMarker = false,
  isNewMarker = false,
  danjiAroundLat,
  danjiAroundLng,
  getPlaceName,
  setM,
  handleAddressName,
  handlePlaceName,
  handleSelectedSubwayMarker,
  placeName,
  selectedSubwayMarker,
}: DanjiAroundMapCardProps) {
  const { map, center, zoomLevel, minZoom, maxZoom, selectedStatus, onCreate, renderMarker, selectedUI, setZoomLevel } =
    useDanjiAroundMapCardMobile({
      danji,
      addressName,
      isEventMarker,
      danjiAroundLat,
      danjiAroundLng,
      getPlaceName,
      setM,
      placeName,
      selectedSubwayMarker,
    });

  return (
    <NaverMapV1
      center={center}
      onCreate={onCreate}
      minZoom={minZoom}
      maxZoom={maxZoom}
      style={{
        width: '100%',
        height: defaultMapSize,
        flex: 1,
      }}
      onZoomChanged={(m) => {
        setZoomLevel(m.getZoom());
      }}
    >
      {aroundList.length > 0 &&
        aroundList.map((item) => {
          if (typeof item.distance === 'string' && typeof item.place_name === 'string') {
            return (
              <CustomOverlayDanji
                key={item.id}
                position={{
                  lat: Number(item.y),
                  lng: Number(item.x),
                }}
                isMarker
                tw="animate-scale will-change-transform [text-rendering: optimizeSpeed]"
                zIndex={handleAddressName ? (item.address_name === addressName ? 150 : 140) : 140}
              >
                <Box
                  onClick={
                    handleAddressName
                      ? () => {
                          handleAddressName(item.address_name);

                          if (typeof item.x === 'string' && typeof item.x === 'string') {
                            map?.morph({ lng: Number(item.x), lat: Number(item.y) }, 17);
                          } else {
                            map?.morph({ lng: Number(item.x[0]), lat: Number(item.y[0]) }, 17);
                          }

                          if (item.category_group_code === 'SW8') {
                            handleSelectedSubwayMarker?.(item.id);

                            if (typeof item.place_name === 'string') {
                              handlePlaceName?.(item.place_name.split(' ')[0]);
                            }
                          } else {
                            handleSelectedSubwayMarker?.('');
                            handlePlaceName?.('');
                          }
                        }
                      : () => {}
                  }
                  css={
                    activeIndex === 0
                      ? selectedStatus(item)
                        ? [styles.bounce]
                        : [styles.nonBounce]
                      : handleAddressName
                      ? item.address_name === addressName
                        ? [styles.bounce]
                        : [styles.nonBounce]
                      : [styles.nonBounce]
                  }
                >
                  {renderMarker(item.category_group_code, item.place_name, 0, item.distance)}

                  {activeIndex === 0
                    ? selectedUI(item)
                    : placeName
                    ? item.place_name === placeName && (
                        <PlaceNameWrraper>
                          <PlaceNameText>{item.place_name}</PlaceNameText>
                        </PlaceNameWrraper>
                      )
                    : addressName
                    ? item.address_name === addressName && (
                        <PlaceNameWrraper>
                          <PlaceNameText>{item.place_name}</PlaceNameText>
                        </PlaceNameWrraper>
                      )
                    : zoomLevel &&
                      zoomLevel >= 17 && (
                        <PlaceNameWrraper>
                          <PlaceNameText>
                            {item.category_group_code === 'SW8' ? item.place_name.split(' ')[0] : item.place_name}
                          </PlaceNameText>
                        </PlaceNameWrraper>
                      )}
                </Box>
              </CustomOverlayDanji>
            );
          }

          // @ts-ignore
          const array = item.place_name.map((place) => ({
            placeName: place,
          }));

          // @ts-ignore
          item.distance.forEach(
            (item: string, index: number) => (array[index].distance = item),
            // @ts-ignore
          );

          return (
            <CustomOverlayDanji
              key={item.id}
              position={{
                lat: Number(item.y[0]),
                lng: Number(item.x[0]),
              }}
              tw="cursor-default animate-scale will-change-transform [text-rendering: optimizeSpeed]"
              zIndex={handleAddressName ? (item.address_name === addressName ? 150 : 140) : 140}
            >
              <Box
                onClick={
                  handleAddressName
                    ? () => {
                        handleAddressName(item.address_name);
                        if (typeof item.x === 'string' && typeof item.x === 'string') {
                          map?.morph({ lng: Number(item.x), lat: Number(item.y) }, 17);
                        } else {
                          map?.morph({ lng: Number(item.x[0]), lat: Number(item.y[0]) }, 17);
                        }

                        handlePlaceName?.('');
                      }
                    : () => {}
                }
                css={
                  handleAddressName
                    ? item.address_name === addressName
                      ? [styles.bounce]
                      : [styles.nonBounce]
                    : [styles.nonBounce]
                }
              >
                {renderMarker(item.category_group_code, array, item.x.length)}

                {activeIndex === 0 ? (
                  <div />
                ) : placeName ? (
                  item.place_name.includes(placeName) && (
                    <PlaceNameWrraper tw="bottom-[23px]">
                      <PlaceNameText>{placeName}</PlaceNameText>
                    </PlaceNameWrraper>
                  )
                ) : addressName ? (
                  item.address_name === addressName && (
                    <PlaceNameWrraper tw="bottom-[23px]">
                      <PlaceNameText>
                        {item.category_group_code === KakaoMapCategoryCode.SUBWAY
                          ? `${item.place_name[0]}`
                          : `${item.place_name[0]} 외 ${item.place_name.length - 1} 곳`}
                      </PlaceNameText>
                    </PlaceNameWrraper>
                  )
                ) : (
                  zoomLevel &&
                  zoomLevel >= 17 && (
                    <PlaceNameWrraper tw="bottom-[23px]">
                      <PlaceNameText>
                        {item.category_group_code === KakaoMapCategoryCode.SUBWAY
                          ? `${item.place_name[0]}`
                          : `${item.place_name[0]} 외 ${item.place_name.length - 1} 곳`}
                      </PlaceNameText>
                    </PlaceNameWrraper>
                  )
                )}
              </Box>
            </CustomOverlayDanji>
          );
        })}

      {isCircle && (
        <CustomOverlayDanji
          key={`${danji.long}${danji.lat}`}
          position={{
            lat: +danji.lat,
            lng: +danji.long,
          }}
          centerDanji={{
            lat: +danji.lat,
            lng: +danji.long,
          }}
        >
          <></>
        </CustomOverlayDanji>
      )}

      <CustomOverlayDanji
        key={`${danji.lat}${danji.long}`}
        position={{
          lat: +danji.lat,
          lng: +danji.long,
        }}
        tw="z-[150]"
      >
        {!isNewMarker && (
          <>
            <MapMarkerSearch />
            <MapMarkerShadow />
          </>
        )}
      </CustomOverlayDanji>
    </NaverMapV1>
  );
}
