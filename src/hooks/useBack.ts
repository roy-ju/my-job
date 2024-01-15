import { useCallback } from 'react';

import { useRouter } from 'next/router';

import Routes from '@/router/routes';

import useCheckPlatform from './useCheckPlatform';

export default function useBack() {
  const router = useRouter();

  const { platform } = useCheckPlatform();

  const back = useCallback(() => {
    if (typeof window !== 'undefined') {
      const canGoBack = window.history.length > 1;

      if (canGoBack) {
        router.back();
      } else if (platform === 'pc') {
        router.replace('/');
      } else {
        router.replace(`/${Routes.EntryMobile}`);
      }
    }
  }, [platform, router]);

  return { back };
}
