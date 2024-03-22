import { useCallback } from 'react';

import { useRouter } from 'next/router';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import Routes from '@/router/routes';

export default function useHandleClickBack() {
  const { platform } = useCheckPlatform();

  const router = useRouter();

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

  return { renderBackButton: platform === 'mobile' ? false : !router?.query?.depth2, handleClickBack };
}
