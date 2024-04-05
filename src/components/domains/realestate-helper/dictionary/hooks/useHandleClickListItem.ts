import { useCallback } from 'react';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import Routes from '@/router/routes';

import { useRouter } from 'next/router';

export default function useHandleClickListItem({ id }: { id: number }) {
  const router = useRouter();

  const { platform } = useCheckPlatform();

  const handleClickListItem = useCallback(() => {
    const url =
      platform === 'pc'
        ? `/${Routes.SubHome}/${Routes.DictionaryDetail}?dictID=${id}`
        : `/${Routes.EntryMobile}/${Routes.DictionaryDetail}?dictID=${id}`;

    if (platform === 'pc') {
      const depth1 = router?.query?.depth1 ?? '';
      const depth2 = router?.query?.depth2 ?? '';

      const query = router.query;

      delete query.depth1;
      delete query.depth2;

      if (depth1 && depth2) {
        if (depth1 === Routes.DictionaryDetail) {
          router.replace({ pathname: `/${Routes.DictionaryDetail}/${depth2}`, query: { ...query, dictID: `${id}` } });
        } else {
          router.replace({ pathname: `/${depth1}/${Routes.DictionaryDetail}`, query: { ...query, dictID: `${id}` } });
        }
      } else if (depth1 && !depth2) {
        router.replace({ pathname: `/${Routes.DictionaryDetail}`, query: { ...query, dictID: `${id}` } });
      }
    } else if (platform === 'mobile') {
      router.replace(url);
    }
  }, [platform, id, router]);

  return { handleClickListItem };
}
