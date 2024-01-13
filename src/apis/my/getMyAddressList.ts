import useAuth from '@/hooks/services/useAuth';
import useSWR from 'swr';

export type MyAddressListListItem = {
  id: number;
  status: number;
  road_name_address: string;
  danji_name: string;
  dong: string;
  ho: string;
  floor?: string | null;
};

export interface GetMyAddressListResponse {
  list: MyAddressListListItem[] | null;
}

export type Req = {
  activeOnly?: boolean;
  danjiID?: number | null;
  isFetch?: boolean;
  exclude_duplicated_listing?: boolean;
};

export default function useAPI_GetMyAddressList({
  activeOnly = false,
  danjiID = null,
  isFetch,
  exclude_duplicated_listing = false,
}: Req) {
  const { user } = useAuth();

  const { data, isLoading, mutate } = useSWR<GetMyAddressListResponse>(
    (user?.hasAddress || user?.hasNotVerifiedAddress) && isFetch
      ? [
          `/my/address/list`,
          { active_only: activeOnly || undefined, danji_id: danjiID || undefined, exclude_duplicated_listing },
        ]
      : null,
  );

  return { list: data?.list, isLoading, mutate };
}
