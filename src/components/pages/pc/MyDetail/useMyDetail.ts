import useAPI_GetUserAddress from '@/apis/user/getUserAddress';
import { useAuth } from '@/hooks/services';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { ChangeEventHandler, useCallback, useEffect, useMemo, useState } from 'react';
import updateNicknameApi from '@/apis/user/updateNickname';
import { toast } from 'react-toastify';

export default function useMyDetail(depth: number) {
  const router = useRouter(depth);

  const { user, logout, mutate: mutateUser, isLoading: isUserLoading } = useAuth();
  const { data: userAddressData, isLoading: isUserAddressLoading } = useAPI_GetUserAddress();

  const [nicknamePopup, setNicknamePopup] = useState(false);

  const [nickname, setNickname] = useState('');

  const updateNicknameButtonDisabled = useMemo(() => user?.nickname === nickname, [user?.nickname, nickname]);

  const handleChangeNickname = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setNickname(e.target.value);
  }, []);

  const handleClickDeregister = useCallback(() => {
    router.replace(Routes.Deregister);
  }, [router]);

  const handleLogout = useCallback(() => {
    router.pop();
    logout();
  }, [logout, router]);

  const handleUpdateAddress = useCallback(() => {
    router.replace(Routes.MyAddress);
  }, [router]);

  const handleUpdatePhone = useCallback(() => {
    router.replace(Routes.UpdatePhone);
  }, [router]);

  const handleClickUpdateNickname = useCallback(() => {
    setNicknamePopup(true);
  }, []);

  const updateNickname = useCallback(async () => {
    setNicknamePopup(false);
    const res = await updateNicknameApi(nickname);
    if (res?.error_code) {
      toast.error('닉네임을 변경할 수 없습니다.');
    } else {
      toast.success('닉네임이 변경되었습니다.');
    }
    mutateUser(false);
  }, [nickname, mutateUser]);

  const cancelUpdateNickname = useCallback(() => {
    setNicknamePopup(false);
  }, []);

  useEffect(() => {
    if (user?.nickname) {
      setNickname(user?.nickname);
    }
  }, [user?.nickname]);

  return useMemo(
    () => ({
      ...user,
      isLoading: isUserLoading || isUserAddressLoading,
      updateNicknameButtonDisabled,
      nickname,
      nicknamePopup,
      addressDetail: userAddressData?.address_detail,
      roadNameAddress: userAddressData?.road_name_address,
      ownershipVerified: userAddressData?.ownership_verified,
      isUserAddressLoading,
      handleClickDeregister,
      handleLogout,
      handleUpdateAddress,
      handleUpdatePhone,
      handleClickUpdateNickname,
      updateNickname,
      cancelUpdateNickname,
      handleChangeNickname,
    }),
    [
      updateNicknameButtonDisabled,
      nickname,
      nicknamePopup,
      user,
      userAddressData,
      isUserAddressLoading,
      isUserLoading,
      handleClickDeregister,
      handleLogout,
      handleUpdateAddress,
      handleUpdatePhone,
      handleClickUpdateNickname,
      updateNickname,
      cancelUpdateNickname,
      handleChangeNickname,
    ],
  );
}
