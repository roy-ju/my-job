import useAuth from '@/hooks/services/useAuth';

import useSWR from 'swr';

import { MyAddressListRequest, MyAddressListResponse } from './types';

export default function useFetchMyAddressList({
  activeOnly = false,
  danjiID = null,
  isFetch,
  exclude_duplicated_listing = false,
}: MyAddressListRequest) {
  const { user } = useAuth();

  const { data, isLoading, mutate } = useSWR<MyAddressListResponse>(
    (user?.hasAddress || user?.hasNotVerifiedAddress) && isFetch
      ? [
          `/my/address/list`,
          { active_only: activeOnly || undefined, danji_id: danjiID || undefined, exclude_duplicated_listing },
        ]
      : null,
  );

  return { list: data?.list, isLoading, mutate };
}
