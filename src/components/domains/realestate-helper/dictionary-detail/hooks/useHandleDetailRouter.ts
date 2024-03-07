import { MouseEvent, useCallback } from 'react';

import { useRouter } from 'next/router';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import Routes from '@/router/routes';

export default function useHandleDetailRouter() {
  const { platform } = useCheckPlatform();

  const router = useRouter();

  const handleGoDictList = useCallback(() => {
    if (typeof window !== 'undefined') {
      const canGoBack = window.history.length > 1;

      if (canGoBack) {
        router.back();
      } else {
        router.replace(platform === 'pc' ? `/${Routes.Dictionary}` : `/${Routes.EntryMobile}/${Routes.Dictionary}`);
      }
    }
  }, [platform, router]);

  const handleGoDictDetail = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      const { value } = e.currentTarget;

      if (platform === 'pc') {
        const depth1 = router?.query?.depth1 ?? '';
        const depth2 = router?.query?.depth2 ?? '';
        const query = router.query;

        delete query.depth1;
        delete query.depth2;

        if (depth1 && depth2) {
          router.replace({ pathname: `/${depth1}/${Routes.DictionaryDetail}`, query: { dictID: value } });
        } else if (depth1 && !depth2) {
          router.replace({ pathname: `/${depth1}`, query: { dictID: value } });
        }
      }

      if (platform === 'mobile') {
        router.replace({ pathname: `/${Routes.DictionaryDetail}`, query: { dictID: value } });
      }
    },
    [platform, router],
  );

  return { handleGoDictList, handleGoDictDetail };
}
