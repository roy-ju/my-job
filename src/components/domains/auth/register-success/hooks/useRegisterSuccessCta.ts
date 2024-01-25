/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback } from 'react';

import { useRouter } from 'next/router';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import Routes from '@/router/routes';

import useReturnUrl from '@/states/hooks/useReturnUrl';

import useVerifyCiPopup from '@/states/hooks/useVerifyCiPopup';

export default function useRegisterSuccessCta() {
  const router = useRouter();

  const { platform } = useCheckPlatform();

  const { returnUrl, handleUpdateReturnUrl } = useReturnUrl();

  const { openVerifyCiPopup, handleVerifyPhone } = useVerifyCiPopup();

  const handleOnlyLoginCta = useCallback(async () => {
    if (returnUrl) {
      await router.replace(returnUrl);
      handleUpdateReturnUrl('');
      return;
    }

    if (platform === 'pc') {
      router.replace('/');
      handleUpdateReturnUrl('');
      return;
    }

    if (platform === 'mobile') {
      router.replace(`/${Routes.EntryMobile}`);
      handleUpdateReturnUrl('');
    }
  }, [returnUrl, platform, router, handleUpdateReturnUrl]);

  const handleDirectVerifyCta = useCallback(async () => {
    handleVerifyPhone();
  }, [handleVerifyPhone]);

  const handleAfterNeedVerifyCta = useCallback(() => {
    if (returnUrl) {
      router.replace(returnUrl);
      return;
    }

    if (platform === 'pc') {
      router.replace('/');
      return;
    }

    if (platform === 'mobile') {
      router.replace(`/${Routes.EntryMobile}`);
    }
  }, [platform, returnUrl, router]);

  return {
    handleOnlyLoginCta,
    handleDirectVerifyCta,
    handleAfterNeedVerifyCta,
  };
}
