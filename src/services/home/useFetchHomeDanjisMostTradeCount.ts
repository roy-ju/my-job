import useSWR from 'swr';

import { HomeDanjisMostTradeCountResponse } from './types';

export default function useFetchHomeDanjisMostTradeCount() {
  const { data, isLoading, mutate } = useSWR<HomeDanjisMostTradeCountResponse>('/home/danjis/mosttradecount');

  return {
    data,
    isLoading,
    mutate,
  };
}
