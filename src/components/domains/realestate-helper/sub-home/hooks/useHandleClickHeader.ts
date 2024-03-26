import { useCallback } from 'react';

import { useRouter } from 'next/router';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import Routes from '@/router/routes';

import useAuth from '@/hooks/services/useAuth';

export default function useHandleClickHeader() {
  const { platform } = useCheckPlatform();

  const router = useRouter();

  const { user } = useAuth();

  const handleClickBack = useCallback(() => {
    if (typeof window !== 'undefined') {
      const canGoBack = window.history.length > 1;

      if (canGoBack) {
        router.back();
      } else {
        router.replace(platform === 'pc' ? '/' : `/${Routes.EntryMobile}`);
      }
    }
  }, [platform, router]);

  const handleGoNotificationList = useCallback(() => {
    if (platform === 'pc') {
      router.push(`/${Routes.SubHome}/${Routes.NotificationList}`);

      return;
    }

    if (platform === 'mobile') {
      router.push(`/${Routes.EntryMobile}/${Routes.NotificationList}`);
    }
  }, [platform, router]);

  return {
    loggedIn: !!user,
    renderBackButton: platform === 'mobile' ? false : !router?.query?.depth2,
    handleClickBack,
    handleGoNotificationList,
  };
}
