import useAPI_MapSearchList from '@/apis/map/mapSearchList';
import { Filter } from '@/components/organisms/MapFilter/types';
import { MapBounds } from '@/layouts/MapLayout/useMapLayout';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

export default function useMapListingList() {
  const router = useRouter();

  const filter = useMemo(() => {
    if (!router.query.filter) {
      return null;
    }

    return JSON.parse(router.query.filter as string) as Filter;
  }, [router.query.filter]);

  const bounds = useMemo(() => {
    if (!router.query.bounds) {
      return null;
    }

    return JSON.parse(router.query.bounds as string) as MapBounds;
  }, [router.query.bounds]);

  const mapToggleValue = Number(router.query.mapToggleValue) ?? 0;

  const { data, isLoading } = useAPI_MapSearchList(mapToggleValue, bounds, filter);

  return {
    data,
    isLoading,
  };
}
