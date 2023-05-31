import useSWR from 'swr';

export interface GetDashboardInfoResponse {
  suggest_assigned_agent_count: number
  active_listing_count: number
}

export default function useAPI_GetHomeDashboardInfo() {
  const { data, isLoading, mutate } = useSWR<GetDashboardInfoResponse>('/home/dashboard/info');

  return {
    data,
    isLoading,
    mutate,
  };
}
