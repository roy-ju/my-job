import useAPI_GetUserAddress from '@/apis/user/getUserAddress';
import { useAuth } from '@/hooks/services';
import Routes from '@/router/routes';
import { ChangeEventHandler, useCallback, useEffect, useMemo, useState } from 'react';
import updateNicknameApi from '@/apis/user/updateNickname';
import { toast } from 'react-toastify';
import { loginWithApple } from '@/lib/apple';
import updateEmail from '@/apis/user/updateEmail';
import { SocialLoginType } from '@/constants/enums';
import checkNickname from '@/apis/user/checkNickname';
import { useRouter } from 'next/router';

type UpdateEmailPopupType = 'none' | 'duplicated_ci' | 'duplicated_email' | 'success';

export default function useMyDetail() {
  const router = useRouter();

  const { user, logout, mutate: mutateUser, isLoading: isUserLoading } = useAuth();
  const { data: userAddressData, isLoading: isUserAddressLoading } = useAPI_GetUserAddress();

  const [nicknamePopup, setNicknamePopup] = useState(false);
  const [emailPopup, setEmailPopup] = useState(false);
  const [updateEmailPopup, setUpdateEmailPopup] = useState<UpdateEmailPopupType>('none');

  const [nickname, setNickname] = useState('');

  const updateNicknameButtonDisabled = useMemo(() => {
    if (nickname.length === 0) {
      return true;
    }
    return user?.nickname === nickname;
  }, [user?.nickname, nickname]);

  const handleChangeNickname = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setNickname(e.target.value);
  }, []);

  const handleClickDeregister = useCallback(() => {
    router.replace(`/${Routes.EntryMobile}/${Routes.My}/${Routes.Deregister}`);
  }, [router]);

  const handleLogout = useCallback(async () => {
    router.replace(`/${Routes.EntryMobile}/${Routes.My}`);

    setTimeout(() => {
      logout();
    }, 200);
  }, [logout, router]);

  const handleUpdateAddress = useCallback(() => {
    router.replace(`/${Routes.EntryMobile}/${Routes.My}/${Routes.MyAddressMobile}`);
  }, [router]);

  const handleUpdatePhone = useCallback(() => {
    router.replace(`/${Routes.EntryMobile}/${Routes.My}/${Routes.UpdatePhone}`);
  }, [router]);

  const handleClickUpdateNickname = useCallback(() => {
    setNicknamePopup(true);
  }, []);

  const handleClickUpdateEmail = useCallback(() => {
    setEmailPopup(true);
  }, []);

  const handleClickCancelUpdateEmail = useCallback(() => {
    setEmailPopup(false);
  }, []);

  const handleCloseEmailUpdatePopup = useCallback(() => {
    setUpdateEmailPopup('none');
  }, []);

  const handleUpdateEmailResponse = useCallback((response: ErrorResponse | null) => {
    if (response === null) {
      setUpdateEmailPopup('success');
    }
    if (response?.error_code === 1022) {
      setUpdateEmailPopup('duplicated_ci');
    }
    if (response?.error_code === 1023) {
      setUpdateEmailPopup('duplicated_email');
    }
  }, []);

  const handleClickUpdateToKakao = useCallback(() => {
    window.Negocio.callbacks.updateToKakao = (response: ErrorResponse | null) => {
      handleUpdateEmailResponse(response);
    };

    window.open(`${window.location.origin}/auth/kakao?type=update`, '_blank');
    setEmailPopup(false);
  }, [handleUpdateEmailResponse]);

  const handleClickUpdateToApple = useCallback(async () => {
    const res = await loginWithApple();
    if (res && !res.error) {
      const idToken = res.authorization.id_token;
      const updateEmailRes = await updateEmail(idToken, SocialLoginType.Apple);
      handleUpdateEmailResponse(updateEmailRes);
    }

    setEmailPopup(false);
  }, [handleUpdateEmailResponse]);

  const updateNickname = useCallback(async () => {
    setNicknamePopup(false);

    const checkNicknameRes = await checkNickname(nickname);
    if (checkNicknameRes?.error_code) {
      toast.error('중복된 닉네임 입니다.');
      return;
    }

    const res = await updateNicknameApi(nickname);
    if (res?.error_code) {
      toast.error('닉네임을 변경할 수 없습니다.');
    } else {
      toast.success('닉네임이 변경되었습니다.');
    }
    mutateUser(false);
  }, [nickname, mutateUser]);

  const handleNavigateToVerifyCi = useCallback(() => {
    router.replace(Routes.VerifyCi);
  }, [router]);

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
      emailPopup,
      addressDetail: userAddressData?.address_detail,
      roadNameAddress: userAddressData?.road_name_address,
      ownershipVerified: userAddressData?.ownership_verified,
      isUserAddressLoading,
      updateEmailPopup,
      handleClickDeregister,
      handleLogout,
      handleUpdateAddress,
      handleUpdatePhone,
      handleClickUpdateNickname,
      updateNickname,
      cancelUpdateNickname,
      handleChangeNickname,
      handleClickUpdateEmail,
      handleClickCancelUpdateEmail,
      handleClickUpdateToKakao,
      handleClickUpdateToApple,
      handleCloseEmailUpdatePopup,
      handleNavigateToVerifyCi,
    }),
    [
      updateNicknameButtonDisabled,
      nickname,
      nicknamePopup,
      emailPopup,
      user,
      userAddressData,
      isUserAddressLoading,
      isUserLoading,
      updateEmailPopup,
      handleClickDeregister,
      handleLogout,
      handleUpdateAddress,
      handleUpdatePhone,
      handleClickUpdateNickname,
      updateNickname,
      cancelUpdateNickname,
      handleChangeNickname,
      handleClickUpdateEmail,
      handleClickCancelUpdateEmail,
      handleClickUpdateToKakao,
      handleClickUpdateToApple,
      handleCloseEmailUpdatePopup,
      handleNavigateToVerifyCi,
    ],
  );
}
