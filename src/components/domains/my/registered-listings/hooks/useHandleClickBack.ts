import { useCallback } from 'react';

import { useRouter } from 'next/router';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import Routes from '@/router/routes';

export default function useHandleClickBack() {
  const router = useRouter();

  const { platform } = useCheckPlatform();

  const handleClickBack = useCallback(() => {
    if (platform === 'pc') {
      router.replace(`/${Routes.My}?default=2`);
    }

    if (platform === 'mobile') {
      if (typeof window !== 'undefined') {
        const canGoBack = window.history.length > 1;

        if (canGoBack) {
          router.replace(`/${Routes.EntryMobile}/${Routes.My}?default=2`);
        } else {
          router.replace(`/${Routes.EntryMobile}/${Routes.My}?default=2`);
        }
      }
    }
  }, [platform, router]);

  return { handleClickBack };
}
