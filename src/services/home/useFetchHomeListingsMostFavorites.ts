import useSWR from 'swr';

import { HomeListingsMostFavoritesResponse } from './types';

export default function useFetchHomeListingsMostFavorites() {
  const { data, isLoading, mutate } = useSWR<HomeListingsMostFavoritesResponse>('/home/listings/mostfavorites');

  return {
    data,
    isLoading,
    mutate,
  };
}
