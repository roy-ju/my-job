import { useMemo } from 'react';

import { FilterType } from '../mobile-map-filter/types';

export default function useFilterType(filterType: FilterType, filters: FilterType[], filterTypes: FilterType[]) {
  return useMemo(
    () => filters.includes(filterType) && filterTypes.includes(filterType),
    [filters, filterType, filterTypes],
  );
}
