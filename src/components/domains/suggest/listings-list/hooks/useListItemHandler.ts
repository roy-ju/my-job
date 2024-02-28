import { useCallback } from 'react';

import { useRouter } from 'next/router';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import Routes from '@/router/routes';

export default function useListItemHandler({ danjiID }: { danjiID?: number }) {
  const router = useRouter();

  const { platform } = useCheckPlatform();

  const handleClickItem = useCallback(
    (id: number, mySuggest: boolean) => {
      if (platform === 'pc') {
        const depth1 = router?.query?.depth1 ?? '';

        const depth2 = router?.query?.depth2 ?? '';

        const query = router.query;

        delete query.depth1;
        delete query.depth2;

        if (mySuggest) {
          if (!depth1 && !depth2) {
            router.push({
              pathname: `/${Routes.MySuggestDetail}`,
              query: { ...query, suggestID: `${id}`, ...(danjiID ? { danjiID: `${danjiID}` } : {}) },
            });
          } else if (depth1 && !depth2) {
            router.push({
              pathname: `/${depth1}/${Routes.MySuggestDetail}`,
              query: { ...query, suggestID: `${id}`, ...(danjiID ? { danjiID: `${danjiID}` } : {}) },
            });
          } else {
            router.push({
              pathname: `/${depth1}/${Routes.MySuggestDetail}`,
              query: { ...query, suggestID: `${id}`, ...(danjiID ? { danjiID: `${danjiID}` } : {}) },
            });
          }

          return;
        }

        if (!depth1 && !depth2) {
          router.push({
            pathname: `/${Routes.SuggestDetail}`,
            query: { ...query, suggestID: `${id}`, ...(danjiID ? { danjiID: `${danjiID}` } : {}) },
          });
        } else if (depth1 && !depth2) {
          router.push({
            pathname: `/${depth1}/${Routes.SuggestDetail}`,
            query: { ...query, suggestID: `${id}`, ...(danjiID ? { danjiID: `${danjiID}` } : {}) },
          });
        } else {
          router.push({
            pathname: `/${depth1}/${Routes.SuggestDetail}`,
            query: { ...query, suggestID: `${id}`, ...(danjiID ? { danjiID: `${danjiID}` } : {}) },
          });
        }
      }

      if (platform === 'mobile') {
        if (mySuggest) {
          router.push(`/${Routes.EntryMobile}/${Routes.MySuggestDetail}?danjiID=${danjiID}&suggestID=${id}`);
          return;
        }

        router.push(`/${Routes.EntryMobile}/${Routes.SuggestDetail}?danjiID=${danjiID}&suggestID=${id}`);
      }
    },
    [danjiID, router, platform],
  );

  return { handleClickItem };
}
