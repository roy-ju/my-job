import { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { getDefaultFilterAptOftl } from '@/components/organisms/MapFilter';

import { Filter } from '@/components/organisms/MapFilter/types';

import useMap from '@/states/hooks/useMap';

import { MapBounds, getBounds } from '@/hooks/useMapLayout';

import useNegocioMapEvent from '@/hooks/useNegocioMapEvent';

import useAPI_MapSearchList from '@/apis/map/mapSearchList';

export default function useMapListingList() {
  const router = useRouter();

  const { naverMap } = useMap();

  const [filter, setFilter] = useState<Filter | null>(null);
  const [bounds, setBounds] = useState<MapBounds | null>(null);
  const [mapToggleValue, setMapToggleValue] = useState(0);

  const [listingIds, setListingIds] = useState<string>();

  const { data, isLoading, increamentPageNumber } = useAPI_MapSearchList(mapToggleValue, bounds, filter, listingIds);

  // 지도 필터가 바뀔때 호출
  const onFilterChange = useCallback((f: Filter) => {
    setFilter(f);
  }, []);

  // 지도 위치가 바뀔때 호출
  const onBoundsChange = useCallback((b: MapBounds) => {
    setListingIds(undefined);
    setBounds(b);
  }, []);

  const onMapToggleValueChange = useCallback((value: number) => {
    setMapToggleValue(value);
  }, []);

  // 지도 위치 초기값을 설정 한다.
  useEffect(() => {
    if (naverMap) {
      setBounds(getBounds(naverMap));
    }
  }, [naverMap]);

  useEffect(() => {
    if (router.query.listingIDs) {
      setListingIds(router.query.listingIDs as string);
    }
  }, [router.query.listingIDs]);

  // 필터의 초기값을 설정 한다.
  useEffect(() => {
    const item = window.sessionStorage.getItem('mapFilter');
    if (item !== null) {
      setFilter(JSON.parse(item));
    } else {
      setFilter(getDefaultFilterAptOftl());
    }
  }, []);

  useNegocioMapEvent('filter', onFilterChange);
  useNegocioMapEvent('bounds', onBoundsChange);
  useNegocioMapEvent('toggle', onMapToggleValueChange);

  return {
    data,
    isLoading,
    increamentPageNumber,
  };
}
