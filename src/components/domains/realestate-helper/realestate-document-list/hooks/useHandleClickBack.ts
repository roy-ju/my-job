import { useCallback } from 'react';

import { useRouter } from 'next/router';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import Routes from '@/router/routes';

export default function useHandleClickBack() {
  const router = useRouter();

  const { platform } = useCheckPlatform();

  const handleClickBack = useCallback(() => {
    const canGoBack = window.history.length > 1;

    if (canGoBack) {
      // 추후 서브홈으로 강제 url 고정해야함.
      router.back();
    } else {
      router.replace(platform === 'pc' ? '/' : `/${Routes.EntryMobile}`);
    }
  }, [platform, router]);

  return { handleClickBack };
}
