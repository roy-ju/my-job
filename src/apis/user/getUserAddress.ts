import useSWR from 'swr';

import useAuth from '@/hooks/services/useAuth';

import authFetcher from '@/lib/swr/authFetcher';

export interface GetUserAddressResponse {
  road_name_address: string;
  address_detail: string;

  building_name: string | null;
  dong: string | null;
  floor: string | null;

  ownership_verified: boolean;
  ownership_verification_count: number;
  ownership_marketing_agreement_time: string;
}

export default function useAPI_GetUserAddress() {
  const { user } = useAuth();
  const { data, isLoading } = useSWR<GetUserAddressResponse>(user ? '/user/address/get' : null, authFetcher);
  return {
    data,
    isLoading,
  };
}
