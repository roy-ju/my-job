import useAPI_GetUserAddress from '@/apis/user/getUserAddress';
import { useAuth } from '@/hooks/services';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { ChangeEventHandler, useCallback, useEffect, useMemo, useState } from 'react';
import updateNicknameApi from '@/apis/user/updateNickname';
import { updatePrivacyRetention as updatePrivacyRetentionApi } from '@/apis/my/updatePrivacyRetention';
import { toast } from 'react-toastify';
import { loginWithApple } from '@/lib/apple';
import updateEmail from '@/apis/user/updateEmail';
import { SocialLoginType, PrivacyRetentionType } from '@/constants/enums';
import checkNickname from '@/apis/user/checkNickname';
import { PrivacyRetentionTypeString } from '@/constants/strings';

type UpdateEmailPopupType = 'none' | 'duplicated_ci' | 'duplicated_email' | 'success';

export default function useMyDetail(depth: number) {
  const router = useRouter(depth);

  const { user, logout, mutate: mutateUser, isLoading: isUserLoading } = useAuth();
  const { data: userAddressData, isLoading: isUserAddressLoading } = useAPI_GetUserAddress();

  const [nicknamePopup, setNicknamePopup] = useState(false);
  const [emailPopup, setEmailPopup] = useState(false);
  const [updateEmailPopup, setUpdateEmailPopup] = useState<UpdateEmailPopupType>('none');

  const [nickname, setNickname] = useState('');
  const [privacyRetentionValue, setPrivacyRetentionValue] = useState('');

  useEffect(() => {
    if (user) {
      setPrivacyRetentionValue(PrivacyRetentionTypeString[user?.privacyRetentionType]);
    }
  }, [user]);

  const updateNicknameButtonDisabled = useMemo(() => user?.nickname === nickname, [user?.nickname, nickname]);

  const handleChangeNickname = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setNickname(e.target.value);
  }, []);

  const handleClickDeregister = useCallback(() => {
    router.replace(Routes.Deregister);
  }, [router]);

  const handleLogout = useCallback(async () => {
    await router.pop();
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

  const handleChangeUpdatePrivacyRetentionType = useCallback((newValue: string) => {
    setPrivacyRetentionValue(newValue);
    let privacyRetentionType;

    switch (newValue) {
      case '1년':
        privacyRetentionType = PrivacyRetentionType.OneYear;
        break;
      case '3년':
        privacyRetentionType = PrivacyRetentionType.ThreeYear;
        break;
      case '5년':
        privacyRetentionType = PrivacyRetentionType.FiveYear;
        break;
      case '탈퇴시까지':
        privacyRetentionType = PrivacyRetentionType.Deregister;
        break;
      default:
        throw new Error('해당하는 개인정보 보관 기간 값을 찾을 수 없습니다.');
    }

    updatePrivacyRetentionApi({ privacy_retention_type: privacyRetentionType });
  }, []);

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
      privacyRetentionValue,
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
      handleChangeUpdatePrivacyRetentionType,
    }),
    [
      updateNicknameButtonDisabled,
      nickname,
      nicknamePopup,
      emailPopup,
      user,
      privacyRetentionValue,
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
      handleChangeUpdatePrivacyRetentionType,
    ],
  );
}
