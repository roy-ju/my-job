import { useAuth } from '@/hooks/services';
import useSWR from 'swr';

export type MyAddressListListItem = {
  id: number;
  status: number;
  road_name_address: string;
  danji_name: string;
  dong: string;
  ho: string;
};

export interface GetMyAddressListResponse {
  list: MyAddressListListItem[] | null;
}

export default function useAPI_GetMyAddressList() {
  const { user } = useAuth();

  const { data, isLoading, mutate } = useSWR<GetMyAddressListResponse>(
    (user?.hasAddress || user?.hasNotVerifiedAddress) ? [`/my/address/list`] : null,
  );

  return { list: data?.list, isLoading, mutate };
}
