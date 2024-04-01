import { MouseEvent, useCallback } from 'react';

import { useRouter } from 'next/router';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import useAuth from '@/hooks/services/useAuth';

import useAuthPopup from '@/states/hooks/useAuhPopup';

import useReturnUrl from '@/states/hooks/useReturnUrl';

import useInAppBroswerHandler from '@/hooks/useInAppBroswerHandler';

import Routes from '@/router/routes';

export default function useHandleDetailRouter() {
  const { user } = useAuth();

  const { openAuthPopup } = useAuthPopup();

  const { handleUpdateReturnUrl } = useReturnUrl();

  const { inAppInfo, handleOpenAppInstallPopup } = useInAppBroswerHandler();

  const { platform } = useCheckPlatform();

  const router = useRouter();

  const handleGoDictList = useCallback(() => {
    const url = platform === 'pc' ? `/${Routes.Dictionary}` : `/${Routes.EntryMobile}/${Routes.Dictionary}`;

    if (!user && inAppInfo.isInAppBrowser) {
      handleOpenAppInstallPopup();
      return;
    }

    if (!user) {
      handleUpdateReturnUrl(url);
      openAuthPopup('onlyLogin');
      return;
    }

    if (typeof window !== 'undefined') {
      const canGoBack = window.history.length > 1;

      if (canGoBack) {
        router.back();
      } else {
        router.replace(url);
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

  const handleGoDictDetail = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      const { value } = e.currentTarget;

      const depth1 = router?.query?.depth1 ?? '';
      const depth2 = router?.query?.depth2 ?? '';

      const url =
        platform === 'pc'
          ? depth2
            ? `/${depth1}/${Routes.DictionaryDetail}?dictID=${value}`
            : `/${depth1}?dictID=${value}`
          : `/${Routes.EntryMobile}/${Routes.DictionaryDetail}?dictID=${value}`;

      if (!user && inAppInfo.isInAppBrowser) {
        handleOpenAppInstallPopup();
        return;
      }

      if (!user) {
        handleUpdateReturnUrl(url);
        openAuthPopup('onlyLogin');
        return;
      }

      if (platform === 'pc') {
        const query = router.query;

        delete query.depth1;
        delete query.depth2;

        router.replace(url);
      }

      if (platform === 'mobile') {
        router.replace(url);
      }
    },
    [user, inAppInfo.isInAppBrowser, platform, router, handleOpenAppInstallPopup, handleUpdateReturnUrl, openAuthPopup],
  );

  return { handleGoDictList, handleGoDictDetail };
}
