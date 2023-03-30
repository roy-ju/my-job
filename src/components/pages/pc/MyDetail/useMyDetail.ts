import useAPI_GetUserAddress from '@/apis/user/getUserAddress';
import { useAuth } from '@/hooks/services';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { useCallback, useMemo } from 'react';

export default function useMyDetail(depth: number) {
  const router = useRouter(depth);

  const { user, logout } = useAuth();
  const { data: userAddressData, isLoading: isUserAddressLoading } = useAPI_GetUserAddress();

  const handleClickDeregister = useCallback(() => {
    router.replace(Routes.Deregister);
  }, [router]);

  const handleLogout = useCallback(() => {
    router.pop();
    logout();
  }, [logout, router]);

  return useMemo(
    () => ({
      ...user,
      addressDetail: userAddressData?.address_detail,
      roadNameAddress: userAddressData?.road_name_address,
      ownershipVerified: userAddressData?.ownership_verified,
      isUserAddressLoading,
      handleClickDeregister,
      handleLogout,
    }),
    [user, userAddressData, isUserAddressLoading, handleClickDeregister, handleLogout],
  );
}
