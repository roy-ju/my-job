import useAPI_MapSearchList from '@/apis/map/mapSearchList';
import { getDefaultFilterAptOftl } from '@/components/organisms/MapFilter';
import { Filter } from '@/components/organisms/MapFilter/types';
import { useNegocioMapEvent } from '@/hooks/utils';
import { MapBounds, getBounds } from '@/layouts/MapLayout/useMapLayout';
import useMap from '@/states/map';
import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';

export default function useMapListingList() {
  const { naverMap } = useMap();

  const [filter, setFilter] = useState<Filter | null>(null);
  const [bounds, setBounds] = useState<MapBounds | null>(null);
  const [mapToggleValue, setMapToggleValue] = useState(0);

  const { data, isLoading, increamentPageNumber } = useAPI_MapSearchList(mapToggleValue, bounds, filter);

  // 지도 필터가 바뀔때 호출
  const onFilterChange = useCallback((f: Filter) => {
    setFilter(f);
  }, []);

  // 지도 위치가 바뀔때 호출
  const onBoundsChange = useCallback((b: MapBounds) => {
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
