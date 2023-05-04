/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-return-assign */

import { Dispatch, useCallback, useEffect, useMemo, useState } from 'react';
import tw, { styled } from 'twin.macro';
import MapMarkerSearchItem from '@/assets/icons/mob_map_danji_pin.svg';
import { getZoomByMeters } from '@/utils/map';
import { NaverMapV1 } from '@/lib/navermapV1';
import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';
import { KakaoMapCategoryCode } from '@/lib/kakao/kakao_map_category';
import {
  DanjiBankMarker,
  DanjiConvienceMarker,
  DanjiHospitalMarker,
  DanjiInstituteMarker,
  DanjiMartMarker,
  DanjiSubwayMarker,
} from './DanjiMarker';
import { CustomOverlayDanji } from './CustomOverlayDanji';

type AroundListType = {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  place_name: string | string[];
  x: string | string[];
  y: string | string[];
  id: string;
  phone: string;
  road_address_name: string;
  place_url: string;
}[];

const Box = styled.div``;

export default function DanjiAroundMapCard({
  aroundList,
  addressName,
  defaultMapSize = '190px',
  isCircle = false,
  isEventMarker = false,
  isNewMarker = false,
  getPlaceName,
  danji,
  setM,
  handleAddressName,
}: {
  aroundList: AroundListType;
  addressName: string;
  danji?: GetDanjiDetailResponse;
  defaultMapSize?: string;
  isCircle?: boolean;
  isEventMarker?: boolean;
  isNewMarker?: boolean;
  getPlaceName?: (name: string | { placeName: string; distance: string }[]) => void;
  setM?: Dispatch<React.SetStateAction<naver.maps.Map | null | undefined>>;
  handleAddressName?: (val: string) => void;
}) {
  const [map, setMap] = useState<naver.maps.Map | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>();

  const minZoom = useMemo(() => getZoomByMeters(20000), []);
  const maxZoom = useMemo(() => getZoomByMeters(20), []);

  const onCreate = useCallback(
    (m: naver.maps.Map) => {
      if (!danji?.lat) return;
      if (!danji?.long) return;

      setMap(m);

      m.morph({ lat: +danji.lat, lng: +danji.long }, 15);
    },
    [danji],
  );

  const center = useMemo(() => {
    if (!danji?.lat) return;
    if (!danji?.long) return;

    return {
      lat: +danji.lat,
      lng: +danji.long,
    };
  }, [danji]);

  const onClickMarker = (val: string | { placeName: string; distance: string }[], distance = '') => {
    if (isEventMarker && getPlaceName && typeof val === 'string') {
      getPlaceName([{ placeName: val, distance }]);
    }

    if (isEventMarker && getPlaceName && typeof val !== 'string') {
      getPlaceName(val);
    }
  };

  const renderMarker = useCallback(
    (
      code: string,
      place: string | { placeName: string; distance: string }[],
      duplicatedCount: number = 0,
      distance: string = '',
    ) => {
      if (duplicatedCount && duplicatedCount > 0) {
        if (code === KakaoMapCategoryCode.SUBWAY)
          return <DanjiSubwayMarker duplicatedCount={duplicatedCount} place={place} onClickMarker={onClickMarker} />;
        if (code === KakaoMapCategoryCode.HOSPITAL)
          return <DanjiHospitalMarker duplicatedCount={duplicatedCount} place={place} onClickMarker={onClickMarker} />;
        if (code === KakaoMapCategoryCode.BANK)
          return <DanjiBankMarker duplicatedCount={duplicatedCount} place={place} onClickMarker={onClickMarker} />;
        if (code === KakaoMapCategoryCode.MART)
          return <DanjiMartMarker duplicatedCount={duplicatedCount} place={place} onClickMarker={onClickMarker} />;
        if (code === KakaoMapCategoryCode.CONVENIENCESTORE)
          return <DanjiConvienceMarker duplicatedCount={duplicatedCount} place={place} onClickMarker={onClickMarker} />;
        if (code === KakaoMapCategoryCode.PUBLICINSTITUTIONS)
          return <DanjiInstituteMarker duplicatedCount={duplicatedCount} place={place} onClickMarker={onClickMarker} />;
        return null;
      }

      if (code === KakaoMapCategoryCode.SUBWAY)
        return <DanjiSubwayMarker onClickMarker={onClickMarker} place={place} distance={distance} />;
      if (code === KakaoMapCategoryCode.HOSPITAL)
        return <DanjiHospitalMarker onClickMarker={onClickMarker} place={place} distance={distance} />;
      if (code === KakaoMapCategoryCode.BANK)
        return <DanjiBankMarker onClickMarker={onClickMarker} place={place} distance={distance} />;
      if (code === KakaoMapCategoryCode.MART)
        return <DanjiMartMarker onClickMarker={onClickMarker} place={place} distance={distance} />;
      if (code === KakaoMapCategoryCode.CONVENIENCESTORE)
        return <DanjiConvienceMarker onClickMarker={onClickMarker} place={place} distance={distance} />;
      if (code === KakaoMapCategoryCode.PUBLICINSTITUTIONS)
        return <DanjiInstituteMarker onClickMarker={onClickMarker} place={place} distance={distance} />;
      return null;
    },
    [],
  );

  useEffect(() => {
    if (map && setM) {
      setM(map);
    }
  }, [map]);

  useEffect(() => {
    setSelectedIndex(null);
  }, [aroundList]);

  useEffect(() => {
    if (aroundList && addressName) {
      const firstIndex = aroundList.findIndex((item) => item.address_name === addressName);
      setSelectedIndex(firstIndex);
    }
  }, [addressName, aroundList]);

  if (!danji) return null;

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
    >
      {aroundList.length > 0 &&
        aroundList.map((item, index) => {
          if (typeof item.distance === 'string' && typeof item.place_name === 'string') {
            return (
              <CustomOverlayDanji
                key={item.id}
                position={{
                  lat: Number(item.y),
                  lng: Number(item.x),
                }}
                isMarker
              >
                <Box
                  onClick={
                    handleAddressName
                      ? () => {
                          handleAddressName(item.address_name);
                          setSelectedIndex(index);
                        }
                      : () => {}
                  }
                  css={
                    handleAddressName
                      ? selectedIndex === index
                        ? [tw`relative [z-index: 160] animate-bounce`]
                        : [tw`relative [z-index: 150]`]
                      : [tw`relative [z-index: 150]`]
                  }
                >
                  {renderMarker(item.category_group_code, item.place_name, 0, item.distance)}
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
            >
              <Box
                onClick={
                  handleAddressName
                    ? () => {
                        handleAddressName(item.address_name);
                        setSelectedIndex(index);
                      }
                    : () => {}
                }
                css={
                  handleAddressName
                    ? selectedIndex === index
                      ? [tw`relative [z-index: 160] animate-bounce`]
                      : [tw`relative [z-index: 150]`]
                    : [tw`relative [z-index: 150]`]
                }
              >
                {renderMarker(item.category_group_code, array, item.x.length)}
              </Box>
            </CustomOverlayDanji>
          );
        })}

      <CustomOverlayDanji
        key={`${danji.lat}${danji.long}`}
        position={{
          lat: +danji.lat,
          lng: +danji.long,
        }}
      >
        {!isNewMarker && <MapMarkerSearchItem style={{ position: 'relative', zIndex: 140 }} />}
      </CustomOverlayDanji>

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
          {/* <Stack
            sx={{
              minWidth: '1rem',
              minHeight: '1rem',
              background: theme.palette.error.main,
              borderRadius: '50%',
            }}
          /> */}
        </CustomOverlayDanji>
      )}
    </NaverMapV1>
  );
}
