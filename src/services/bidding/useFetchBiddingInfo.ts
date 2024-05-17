import useSWR from 'swr';
import { BiddingInfoResponse } from './types';

export default function useFethcBiddingInfo(id: number) {
  const { data, isLoading, mutate } = useSWR<BiddingInfoResponse & ErrorResponse>([
    '/bidding/info/get',
    { bidding_id: id },
  ]);

  return { data, isLoading, mutate };
}
