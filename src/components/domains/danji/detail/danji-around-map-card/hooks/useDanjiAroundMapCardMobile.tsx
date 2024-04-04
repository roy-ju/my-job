/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-return-assign */

import { Dispatch, useCallback, useEffect, useMemo, useState } from 'react';

import { getZoomByMeters } from '@/utils/map';

import { KakaoMapCategoryCode } from '@/lib/kakao/kakao_map_category';

import {
  DanjiBankMarker,
  DanjiConvienceMarker,
  DanjiHospitalMarker,
  DanjiInstituteMarker,
  DanjiMartMarker,
  DanjiSubwayMarker,
} from '../widget/DanjiMarker';

import { Item } from '../types';

import { PlaceNameText, PlaceNameWrraper } from '../widget/DanjiAroundMapCardWidget';

import { CommonDanjiDetailProps } from '../../types';

interface Props extends CommonDanjiDetailProps {
  addressName: string;
  isEventMarker?: boolean;
  danjiAroundLat?: string;
  danjiAroundLng?: string;
  getPlaceName?: (name: string | { placeName: string; distance: string }[]) => void;
  setM?: Dispatch<React.SetStateAction<naver.maps.Map | null | undefined>>;
  placeName?: string;
  selectedSubwayMarker?: string;
}

export default function useDanjiAroundMapCardMobile({
  danji,
  addressName,
  isEventMarker = false,
  danjiAroundLat,
  danjiAroundLng,
  getPlaceName,
  setM,
  placeName,
  selectedSubwayMarker,
}: Props) {
  const [map, setMap] = useState<naver.maps.Map | null>(null);

  const minZoom = useMemo(() => getZoomByMeters(20000), []);
  const maxZoom = useMemo(() => getZoomByMeters(20), []);

  const [zoomLevel, setZoomLevel] = useState<number>();

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
    if (danjiAroundLat && danjiAroundLng) {
      map?.morph({ lat: Number(danjiAroundLat), lng: Number(danjiAroundLng) }, 17);
    }
  }, [danjiAroundLat, danjiAroundLng]);

  const selectedStatus = useCallback(
    (item: Item) => {
      if (selectedSubwayMarker) {
        if (selectedSubwayMarker === item.id) return true;

        return false;
      }

      if (placeName) {
        if (typeof item.place_name === 'string' && placeName === item.place_name.split(' ')[0]) return true;

        return false;
      }

      if (addressName) {
        if (addressName && item.address_name) return true;

        return false;
      }

      return false;
    },
    [placeName, addressName, selectedSubwayMarker],
  );

  const selectedUI = useCallback(
    (item: Item) => {
      if (typeof item.place_name !== 'string') return null;

      if (selectedSubwayMarker) {
        if (selectedSubwayMarker === item.id)
          return (
            <PlaceNameWrraper>
              <PlaceNameText>{item.place_name.split(' ')[0]}</PlaceNameText>
            </PlaceNameWrraper>
          );

        return null;
      }

      if (placeName) {
        if (item.place_name.split(' ')[0] === placeName) {
          return (
            <PlaceNameWrraper>
              <PlaceNameText>{placeName}</PlaceNameText>
            </PlaceNameWrraper>
          );
        }

        return null;
      }

      if (addressName) {
        if (addressName && item.address_name) {
          return (
            <PlaceNameWrraper>
              <PlaceNameText>{item.place_name.split(' ')[0]}</PlaceNameText>
            </PlaceNameWrraper>
          );
        }

        return null;
      }

      if (zoomLevel) {
        if (zoomLevel >= 17) {
          return (
            <PlaceNameWrraper>
              <PlaceNameText>{item.place_name.split(' ')[0]}</PlaceNameText>
            </PlaceNameWrraper>
          );
        }

        return null;
      }

      return null;
    },
    [placeName, addressName, selectedSubwayMarker, zoomLevel],
  );

  return { map, center, zoomLevel, selectedStatus, minZoom, maxZoom, onCreate, renderMarker, selectedUI, setZoomLevel };
}
