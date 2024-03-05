import { useCallback } from 'react';

import { useRouter } from 'next/router';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import Routes from '@/router/routes';

export default function useListItemHandler() {
  const router = useRouter();

  const { platform } = useCheckPlatform();

  const handleClickListItem = useCallback(
    (id: number) => {
      if (platform === 'pc') {
        const depth1 = router?.query?.depth1 ?? '';
        const depth2 = router?.query?.depth2 ?? '';

        const query = router.query;

        delete query.depth1;
        delete query.depth2;

        if (depth1 && depth2) {
          router.push({ pathname: `/${depth1}/${Routes.NoticeDetail}`, query: { ...query, noticeID: `${id}` } });
        } else if (depth1 && !depth2) {
          router.push({ pathname: `/${depth1}/${Routes.NoticeDetail}`, query: { ...query, noticeID: `${id}` } });
        }
      }

      if (platform === 'mobile') {
        router.push(`/${Routes.EntryMobile}/${Routes.NoticeDetail}?noticeID=${id}`);
      }
    },
    [router, platform],
  );
  return { handleClickListItem };
}
