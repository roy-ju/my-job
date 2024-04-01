import { useCallback } from 'react';

import { useRouter } from 'next/router';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import Routes from '@/router/routes';

export default function useHandleClickBack() {
  const router = useRouter();

  const { platform } = useCheckPlatform();

  const handleBackPc = useCallback(() => {
    if (typeof window !== 'undefined') {
      const canGoBack = window.history.length > 1;

      if (canGoBack) {
        router.back();
      } else {
        router.replace(`/${Routes.My}?default=2`);
      }
    }
  }, [router]);

  const handleBackMobile = useCallback(() => {
    if (router?.query?.origin) {
      router.replace(router.query.origin as string);
      return;
    }

    router.replace(`/${Routes.EntryMobile}/${Routes.My}?default=2`);
  }, [router]);

  const handleClickBack = useCallback(() => {
    if (platform === 'pc') {
      handleBackPc();
      return;
    }

    if (platform === 'mobile') {
      handleBackMobile();
    }
  }, [handleBackMobile, handleBackPc, platform]);

  return { handleClickBack };
}
