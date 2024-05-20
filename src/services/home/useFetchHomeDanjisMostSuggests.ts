import useSWR from 'swr';

import { HomeDanjisMostSuggestsResponse } from './types';

export default function useFetchHomeDanjisMostSuggests() {
  const { data, isLoading, mutate } = useSWR<HomeDanjisMostSuggestsResponse>('/home/danjis/mostsuggests');

  return {
    data,
    isLoading,
    mutate,
  };
}
