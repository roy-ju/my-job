import { useEffect, useMemo, useState, useCallback } from 'react';

import { User } from '@/hooks/services/useAuth';

import { SocialLoginType } from '@/constants/enums';

import { apiService } from '@/services';

import { loginWithApple } from '@/lib/apple';

import Events from '@/constants/events';

type UseUserEasyLoginFieldUpdateProps = {
  user: Nullable<User>;
};

type UpdateEmailPopupType = 'none' | 'duplicated_ci' | 'duplicated_email' | 'success';

export default function useUserEasyLoginFieldUpdate({ user }: UseUserEasyLoginFieldUpdateProps) {
  const [email, setEmail] = useState('');

  const [socialLoginPopup, setSocialLoginPopup] = useState(false);

  const [updateEmailPopup, setUpdateEmailPopup] = useState<UpdateEmailPopupType>('none');

  const easyLoginFieldLabel = useMemo(() => '간편 로그인', []);

  const handleOpenSocialLoginPopup = useCallback(() => {
    setSocialLoginPopup(true);
  }, []);

  const handleCloseSocialLoginPopup = useCallback(() => {
    setSocialLoginPopup(false);
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
    const width = 375;

    const height = document.documentElement.scrollHeight;

    const top = (window.innerHeight - height) / 2;

    const left = (window.innerWidth - width) / 2;

    window.open(
      `${window.location.origin}/auth/kakao?type=update`,
      '_blank',
      `width=${width}, height=${height}, top=${top}, left=${left}`,
    );

    setSocialLoginPopup(false);
  }, []);

  const handleClickUpdateToApple = useCallback(async () => {
    const res = await loginWithApple();
    if (res && !res.error) {
      const idToken = res.authorization.id_token;
      const updateEmailRes = await apiService.updateEmail(idToken, SocialLoginType.Apple);
      handleUpdateEmailResponse(updateEmailRes);
    }

    setSocialLoginPopup(false);
  }, [handleUpdateEmailResponse]);

  useEffect(() => {
    if (user?.email) {
      setEmail(user.email);
    }
  }, [user?.email]);

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

  return {
    email,
    easyLoginFieldLabel,
    updateEmailPopup,
    socialLoginPopup,
    handleClickUpdateToKakao,
    handleClickUpdateToApple,
    handleOpenSocialLoginPopup,
    handleCloseSocialLoginPopup,
    handleCloseEmailUpdatePopup,
  };
}
