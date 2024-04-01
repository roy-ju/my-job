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
        ? `/${Routes.SubHome}/${Routes.DictionaryDetail}?dictID=${id}`
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

    if (platform === 'pc') {
      const depth1 = router?.query?.depth1 ?? '';
      const depth2 = router?.query?.depth2 ?? '';

      const query = router.query;

      delete query.depth1;
      delete query.depth2;

      if (depth1 && depth2) {
        if (depth1 === Routes.DictionaryDetail) {
          router.replace({ pathname: `/${Routes.DictionaryDetail}/${depth2}`, query: { ...query, dictID: `${id}` } });
        } else {
          router.replace({ pathname: `/${depth1}/${Routes.DictionaryDetail}`, query: { ...query, dictID: `${id}` } });
        }
      } else if (depth1 && !depth2) {
        router.replace({ pathname: `/${Routes.DictionaryDetail}`, query: { ...query, dictID: `${id}` } });
      }
    } else if (platform === 'mobile') {
      router.replace(url);
    }
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
