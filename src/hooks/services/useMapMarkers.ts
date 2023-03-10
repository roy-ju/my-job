import { getDefaultFilterAptOftl } from '@/components/organisms/MapFilter';
import { Filter } from '@/components/organisms/MapFilter/types';
import { useCallback } from 'react';
import useStateSyncedWithURL from '../utils/useStateSyncedWithURL';

/**
 * 지도위의 단지, 매물 마커, 이와 관련된 로직을 수행하는 훅
 */
export default function useMapMarkers() {
  const [filter, setFilter] = useStateSyncedWithURL<Filter>('filter', getDefaultFilterAptOftl());

  const handleChangeFilter = useCallback(
    (value: Partial<Filter>) => {
      setFilter((prev) => ({ ...prev, ...value }));
    },
    [setFilter],
  );

  return {
    filter,
    handleChangeFilter,
  };
}
