import { useAuth } from '@/hooks/services';
import { authFetcher } from '@/lib/swr';
import useSWR from 'swr';

export interface GetDashboardInfoResponse {
  suggest_sent_count: number;
  suggest_recommend_count: number;
  bidding_submitted_count: number;
  bidding_accepted_count: number;
  bidding_pre_contract_complete_count: number;
  bidding_past_count: number;
  my_registering_listing_count: number;
  my_active_listing_count: number;
  my_contract_complete_listing_count: number;
  my_cancelled_listing_count: number;
}

export default function useAPI_GetDashboardInfo() {
  const { user } = useAuth();
  const { data, isLoading, mutate } = useSWR<GetDashboardInfoResponse>(user ? '/my/dashboard/info' : null, authFetcher);
  return {
    data,
    isLoading,
    mutate,
  };
}
