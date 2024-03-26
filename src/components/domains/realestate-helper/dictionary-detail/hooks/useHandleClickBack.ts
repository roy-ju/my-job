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
      if (typeof window !== 'undefined') {
        if (platform === 'pc') {
          const depth1 = router?.query?.depth1 ?? '';
          const depth2 = router?.query?.depth2 ?? '';

          if (depth1 && depth2) {
            router.replace(`/${Routes.SubHome}/${Routes.Dictionary}`);
          } else if (depth1 && !depth2) {
            router.replace(`/${Routes.Dictionary}`);
          }
        }

        if (platform === 'mobile') {
          router.replace(`/${Routes.EntryMobile}/${Routes.Dictionary}`);
        }
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
