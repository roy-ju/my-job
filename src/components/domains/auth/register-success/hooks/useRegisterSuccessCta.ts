import { useCallback } from 'react';

import { useRouter } from 'next/router';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import useAuthPopup from '@/states/hooks/useAuhPopup';

import Routes from '@/router/routes';

import useReturnUrl from '@/states/hooks/useReturnUrl';

import useVerifyCiPopup from '@/states/hooks/useVerifyCiPopup';

export default function useRegisterSuccessCta() {
  const router = useRouter();

  const { platform } = useCheckPlatform();

  const { resetAuthPopup } = useAuthPopup();

  const { returnUrl } = useReturnUrl();

  const { openVerifyCiPopup, handleVerifyPhone } = useVerifyCiPopup();

  const handleOnlyLoginCta = useCallback(() => {
    if (returnUrl) {
      router.replace(returnUrl);
      resetAuthPopup();
      return;
    }

    if (platform === 'pc') {
      router.replace('/');
      resetAuthPopup();
      return;
    }

    if (platform === 'mobile') {
      router.replace(`/${Routes.EntryMobile}`);
      resetAuthPopup();
    }
  }, [returnUrl, platform, router, resetAuthPopup]);

  const handleDirectVerifyCta = useCallback(async () => {
    if (returnUrl) {
      await router.replace(returnUrl);

      await openVerifyCiPopup();

      await handleVerifyPhone();
      return;
    }

    if (platform === 'pc') {
      router.replace('/');
    }

    if (platform === 'mobile') {
      router.replace(`/${Routes.EntryMobile}`);
    }
  }, [openVerifyCiPopup, handleVerifyPhone, platform, returnUrl, router]);

  const handleAfterNeedVerifyCta = useCallback(() => {
    if (returnUrl) {
      router.replace(returnUrl);
      return;
    }

    if (platform === 'pc') {
      router.replace('/');
      resetAuthPopup();
      return;
    }
    if (platform === 'mobile') {
      router.replace(`/${Routes.EntryMobile}`);
      resetAuthPopup();
    }
  }, [platform, returnUrl, router, resetAuthPopup]);

  return {
    handleOnlyLoginCta,
    handleDirectVerifyCta,
    handleAfterNeedVerifyCta,
  };
}
