import { ChangeEventHandler, useCallback, useEffect, useMemo, useState } from 'react';

import { useRouter } from 'next/router';

import { toast } from 'react-toastify';

import useVerifyCiPopup from '@/states/hooks/useVerifyCiPopup';

import useAuth from '@/hooks/services/useAuth';

import { apiService } from '@/services';

import { loginWithApple } from '@/lib/apple';

import { SocialLoginType } from '@/constants/enums';

import Events from '@/constants/events';

import Routes from '@/router/routes';

type UpdateEmailPopupType = 'none' | 'duplicated_ci' | 'duplicated_email' | 'success';

export default function useMyDetail() {
  const router = useRouter();

  const { openVerifyCiPopup, handleVerifyPhone } = useVerifyCiPopup();

  const { user, logout, mutate: mutateUser, isLoading: isUserLoading } = useAuth();

  const [nicknamePopup, setNicknamePopup] = useState(false);

  const [emailPopup, setEmailPopup] = useState(false);

  const [updateEmailPopup, setUpdateEmailPopup] = useState<UpdateEmailPopupType>('none');

  const [nickname, setNickname] = useState('');

  const [profileImageUrl, setProfileImageUrl] = useState('');

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
    router.push(`/${Routes.EntryMobile}/${Routes.Deregister}`);
  }, [router]);

  const handleLogout = useCallback(async () => {
    router.push(`/${Routes.EntryMobile}/${Routes.My}`);

    setTimeout(() => {
      logout();
    }, 200);
  }, [logout, router]);

  const handleUpdatePhone = useCallback(() => {
    router.push(`/${Routes.EntryMobile}/${Routes.UpdatePhone}`);
  }, [router]);

  const handleClickUpdateNickname = useCallback(() => {
    setNicknamePopup(true);
  }, []);

  const handleClickUpdateEmail = useCallback(() => {
    setEmailPopup(true);
  }, []);

  const handleUploadProfileImage = useCallback(
    async (file: File) => {
      await apiService.uploadProfileImage(user?.id as number, file);
      await mutateUser(false);
    },
    [user?.id, mutateUser],
  );

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
    window.open(`${window.location.origin}/auth/kakao?type=update`, '_blank');
    setEmailPopup(false);
  }, []);

  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent).detail as ErrorResponse | null;
      handleUpdateEmailResponse(detail);
    };

    window.addEventListener(Events.NEGOCIO_UPDATE_EMAIL_RESPONSE_EVENT, handler);

    return () => {
      window.removeEventListener(Events.NEGOCIO_UPDATE_EMAIL_RESPONSE_EVENT, handler);
    };
  }, [handleUpdateEmailResponse]);

  const handleClickUpdateToApple = useCallback(async () => {
    const res = await loginWithApple();
    if (res && !res.error) {
      const idToken = res.authorization.id_token;
      const updateEmailRes = await apiService.updateEmail(idToken, SocialLoginType.Apple);
      handleUpdateEmailResponse(updateEmailRes);
    }

    setEmailPopup(false);
  }, [handleUpdateEmailResponse]);

  const updateNickname = useCallback(async () => {
    setNicknamePopup(false);

    const checkNicknameRes = await apiService.checkNickname(nickname);
    if (checkNicknameRes?.error_code) {
      toast.error('중복된 닉네임 입니다.');
      return;
    }

    const res = await apiService.updateNickname(nickname);
    if (res?.error_code) {
      toast.error('닉네임을 변경할 수 없습니다.');
    } else {
      toast.success('닉네임이 변경되었습니다.');
    }
    mutateUser(false);
  }, [nickname, mutateUser]);

  const handleUpdateVerify = useCallback(async () => {
    await openVerifyCiPopup();
    await handleVerifyPhone();
  }, [handleVerifyPhone, openVerifyCiPopup]);

  const cancelUpdateNickname = useCallback(() => {
    setNicknamePopup(false);
  }, []);

  useEffect(() => {
    if (user?.nickname) {
      setNickname(user?.nickname);
    }
  }, [user?.nickname]);

  useEffect(() => {
    if (user?.profileImageUrl) {
      setProfileImageUrl(user?.profileImageUrl);
    }
  }, [user?.profileImageUrl]);

  return useMemo(
    () => ({
      ...user,
      isLoading: isUserLoading,
      profileImageUrl,
      updateNicknameButtonDisabled,
      nickname,
      nicknamePopup,
      emailPopup,
      updateEmailPopup,
      handleClickDeregister,
      handleLogout,
      handleUpdatePhone,
      handleClickUpdateNickname,
      updateNickname,
      cancelUpdateNickname,
      handleChangeNickname,
      handleClickUpdateEmail,
      handleUploadProfileImage,
      handleClickCancelUpdateEmail,
      handleClickUpdateToKakao,
      handleClickUpdateToApple,
      handleCloseEmailUpdatePopup,
      handleUpdateVerify,
    }),
    [
      updateNicknameButtonDisabled,
      nickname,
      nicknamePopup,
      emailPopup,
      user,
      profileImageUrl,
      isUserLoading,
      updateEmailPopup,
      handleClickDeregister,
      handleLogout,
      handleUpdatePhone,
      handleClickUpdateNickname,
      updateNickname,
      cancelUpdateNickname,
      handleChangeNickname,
      handleClickUpdateEmail,
      handleUploadProfileImage,
      handleClickCancelUpdateEmail,
      handleClickUpdateToKakao,
      handleClickUpdateToApple,
      handleCloseEmailUpdatePopup,
      handleUpdateVerify,
    ],
  );
}
