import { useCallback } from 'react';

import { useRouter } from 'next/router';

import useAuth from '@/hooks/services/useAuth';

import useAuthPopup from '@/states/hooks/useAuhPopup';

import useReturnUrl from '@/states/hooks/useReturnUrl';

import useInAppBroswerHandler from '@/hooks/useInAppBroswerHandler';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import Routes from '@/router/routes';

export default function useHandleClickBack() {
  const { user } = useAuth();

  const { openAuthPopup } = useAuthPopup();

  const { handleUpdateReturnUrl } = useReturnUrl();

  const { inAppInfo, handleOpenAppInstallPopup } = useInAppBroswerHandler();

  const { platform } = useCheckPlatform();

  const router = useRouter();

  const handleClickBack = useCallback(() => {
    if (!user && inAppInfo.isInAppBrowser) {
      handleOpenAppInstallPopup();
      return;
    }

    if (!user && !inAppInfo.isInAppBrowser) {
      handleUpdateReturnUrl();
      openAuthPopup('onlyLogin');
      return;
    }

    if (typeof window !== 'undefined') {
      const canGoBack = window.history.length > 1;

      if (canGoBack) {
        router.back();
      } else {
        router.replace(platform === 'pc' ? `/${Routes.Dictionary}` : `/${Routes.EntryMobile}/${Routes.Dictionary}`);
      }
    }
  }, [
    user,
    inAppInfo.isInAppBrowser,
    platform,
    router,
    handleOpenAppInstallPopup,
    handleUpdateReturnUrl,
    openAuthPopup,
  ]);

  return { handleClickBack };
}
