import { useMemo } from 'react';

import { useRouter } from 'next/router';

import { MapBounds } from '@/hooks/useMapLayout';

import useFetchMapSearchList from '@/services/map/useFetchMapSearchList';

import { Filter } from '../../mobile-map-filter/types';

export default function useMapListingListMobile() {
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

  const listingIds = useMemo(() => {
    if (!router.query.listingIDs) {
      return undefined;
    }

    return router.query.listingIDs as string;
  }, [router.query.listingIDs]);

  const mapToggleValue = Number(router.query.mapToggleValue) ?? 0;

  const { data, isLoading, increamentPageNumber, mutate } = useFetchMapSearchList(
    mapToggleValue,
    bounds,
    filter,
    listingIds,
  );

  return {
    data,
    isLoading,
    increamentPageNumber,
    mutate,
  };
}
