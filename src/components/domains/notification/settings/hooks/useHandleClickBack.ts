import { useCallback } from 'react';

import { useRouter } from 'next/router';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import Routes from '@/router/routes';

export default function useHandleClickBack() {
  const router = useRouter();

  const { platform } = useCheckPlatform();

  const handleClickBack = useCallback(() => {
    if (platform === 'pc') {
      const depth1 = router?.query?.depth1 ?? '';
      const depth2 = router?.query?.depth2 ?? '';
      const query = router.query;

      delete query.depth1;
      delete query.depth2;

      if (depth1 && depth2) {
        if (depth1 === Routes.NotificationSettings) {
          router.replace({ pathname: `/${Routes.NotificationList}/${depth2}`, query: { ...query } });
        } else {
          router.replace({ pathname: `/${depth1}/${Routes.NotificationList}`, query: { ...query } });
        }
      } else if (depth1 && !depth2) {
        router.replace({ pathname: `/${Routes.NotificationList}`, query: { ...query } });
      }
    }

    if (platform === 'mobile') {
      router.replace(`/${Routes.EntryMobile}/${Routes.NotificationList}`);
    }
  }, [platform, router]);

  return { handleClickBack };
}
