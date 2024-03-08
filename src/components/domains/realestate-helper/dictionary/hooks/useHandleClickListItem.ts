import { useCallback } from 'react';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import Routes from '@/router/routes';

import { useRouter } from 'next/router';

import useAuthPopup from '@/states/hooks/useAuhPopup';

import useAuth from '@/hooks/services/useAuth';

import useInAppBroswerHandler from '@/hooks/useInAppBroswerHandler';

import useReturnUrl from '@/states/hooks/useReturnUrl';

export default function useHandleClickListItem({ id }: { id: number }) {
  const { user } = useAuth();

  const { openAuthPopup } = useAuthPopup();

  const { handleUpdateReturnUrl } = useReturnUrl();

  const { inAppInfo, handleOpenAppInstallPopup } = useInAppBroswerHandler();

  const router = useRouter();

  const { platform } = useCheckPlatform();

  const handleClickListItem = useCallback(() => {
    const url =
      platform === 'pc'
        ? `/${Routes.My}/${Routes.DictionaryDetail}?dictID=${id}`
        : `/${Routes.EntryMobile}/${Routes.DictionaryDetail}?dictID=${id}`;

    if (!user && inAppInfo.isInAppBrowser) {
      handleOpenAppInstallPopup();
      return;
    }

    if (!user) {
      handleUpdateReturnUrl(url);
      openAuthPopup('onlyLogin');
      return;
    }

    router.push(url);
  }, [
    platform,
    id,
    user,
    inAppInfo.isInAppBrowser,
    router,
    handleOpenAppInstallPopup,
    handleUpdateReturnUrl,
    openAuthPopup,
  ]);

  return { handleClickListItem };
}
