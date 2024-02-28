import { useCallback, useMemo } from 'react';

import { useRouter } from 'next/router';

import useCheckPlatform from '@/hooks/useCheckPlatform';

export default function useHandleClickBack() {
  const router = useRouter();

  const { platform } = useCheckPlatform();

  const renderBackButtonUi = useMemo(() => {
    if (platform === 'pc') {
      return false;
    }

    if (platform === 'mobile') {
      return true;
    }
  }, [platform]);

  const handleClickBack = useCallback(() => {
    if (typeof window !== 'undefined') {
      const canGoBack = window.history.length > 1;

      if (canGoBack) {
        router.back();
      } else {
        router.replace('/');
      }
    }
  }, [router]);

  return { renderBackButtonUi, handleClickBack };
}
