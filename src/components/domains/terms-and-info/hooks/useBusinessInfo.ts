import { useCallback } from 'react';

import { useRouter } from 'next/router';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import Routes from '@/router/routes';

export default function useBusinessInfo() {
  const router = useRouter();

  const { platform } = useCheckPlatform();

  const handleClickBack = useCallback(() => {
    if (platform === 'pc') {
      const depth1 = router?.query?.depth1;
      const depth2 = router?.query?.depth2;

      const query = router.query;

      delete query.depth1;
      delete query.depth2;

      if (depth1 && depth2) {
        if (depth1 === Routes.BusinessInfo) {
          router.replace(`/${Routes.ServiceInfo}/${depth2}`);
        } else {
          router.replace(`/${depth1}/${Routes.ServiceInfo}`);
        }
      } else if (depth1 && !depth2) {
        router.replace(`/${Routes.ServiceInfo}`);
      }
    }

    if (platform === 'mobile') {
      router.back();
    }
  }, [router, platform]);
  return { handleClickBack };
}
