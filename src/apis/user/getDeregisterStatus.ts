import useSWR from 'swr';

type Response = {
  can_deregister: boolean;
  has_bidding: boolean;
  has_deposit_or_nego_money: boolean;
  has_listing: boolean;
} & ErrorResponse;

export function useAPI_GetDeregisterStatus() {
  const { data, error, isLoading } = useSWR<Response | null>('/my/user/deregister/status');
  return { data, error, isLoading };
}
