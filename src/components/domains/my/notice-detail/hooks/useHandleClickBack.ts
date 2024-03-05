import { useCallback, useMemo } from 'react';

import { useRouter } from 'next/router';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import Routes from '@/router/routes';

export default function useHandleClickBack() {
  const router = useRouter();

  const { platform } = useCheckPlatform();

  const renderBackButtonUI = useMemo(() => {
    if (platform === 'mobile') {
      return true;
    }

    return false;
  }, [platform]);

  const handleClickBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleGoToList = useCallback(() => {
    if (platform === 'pc') {
      const depth1 = router?.query?.depth1 ?? '';
      const depth2 = router?.query?.depth2 ?? '';

      const query = router.query;

      delete query.depth1;
      delete query.depth2;
      delete query.noticeID;

      if (depth1 && depth2) {
        router.replace({ pathname: `/${depth1}/${Routes.NoticeList}`, query: { ...query } });
      } else if (depth1 && !depth2) {
        router.replace({ pathname: `/${Routes.NoticeList}`, query: { ...query } });
      }
    }

    if (platform === 'mobile') {
      router.replace(`/${Routes.EntryMobile}/${Routes.NoticeList}`);
    }
  }, [platform, router]);

  return { renderBackButtonUI, handleClickBack, handleGoToList };
}
