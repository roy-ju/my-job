import { useCallback } from 'react';

import { useRouter } from 'next/router';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import Routes from '@/router/routes';

export default function useListItemHandler() {
  const { platform } = useCheckPlatform();

  const router = useRouter();

  const handleClickItem = useCallback(
    (id: number, buyOrRent: number) => {
      if (platform === 'pc') {
        const query = router.query;

        delete query.depth1;
        delete query.depth2;

        router.push({
          pathname: `/${Routes.DanjiListings}/${Routes.ListingDetail}`,
          query: { ...query, listingID: `${id}`, bor: `${buyOrRent}` },
        });
      }

      if (platform === 'mobile') {
        router.push({
          pathname: `/${Routes.EntryMobile}/${Routes.ListingDetail}`,
          query: { listingID: `${id}`, bor: `${buyOrRent}` },
        });
      }
    },
    [platform, router],
  );

  return { handleClickItem };
}
