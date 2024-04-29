import { useCallback } from 'react';

import { useRouter } from 'next/router';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import Routes from '@/router/routes';

export default function useListItemHandler({ danjiID, buyOrRent }: { danjiID: number; buyOrRent: number }) {
  const router = useRouter();

  const { platform } = useCheckPlatform();

  const handleClickListItem = useCallback(() => {
    if (platform === 'pc') {
      const query = router.query;

      delete query.depth1;
      delete query.depth2;

      router.push({
        pathname: `/${Routes.MyRealPriceList}/${Routes.DanjiDetail}`,
        query: { ...query, danjiID: `${danjiID}`, bor: `${buyOrRent}` },
      });
      return;
    }

    if (platform === 'mobile') {
      router.push(`/${Routes.EntryMobile}/${Routes.DanjiDetail}?danjiID=${danjiID}&bor=${buyOrRent}`);
    }
  }, [buyOrRent, danjiID, platform, router]);

  return { handleClickListItem };
}
