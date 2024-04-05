import { useCallback } from 'react';

import { useRouter } from 'next/router';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import Routes from '@/router/routes';

export default function useListItemHandler({ danjiID, buyOrRent }: { danjiID: number; buyOrRent: number }) {
  const router = useRouter();

  const { platform } = useCheckPlatform();

  const handleClickListItem = useCallback(() => {
    if (platform === 'pc') {
      // const depth1 = router?.query?.depth1 ?? '';
      // const depth2 = router?.query?.depth2 ?? '';
      // const query = router.query;

      // delete query.depth1;
      // delete query.depth2;

      // if (depth1 === Routes.MyRealPriceList) {

      //   router.push({
      //     pathname: `/${Routes.MyRealPriceList}/${Routes.DanjiDetail}`,
      //     query: { ...query, danjiID: `${danjiID}`, bor: `${buyOrRent}` },
      //   });
      // } else if (depth2 === Routes.MyRealPriceList) {
      //   router.push({
      //     pathname: `/${Routes.MyRealPriceList}/${Routes.DanjiDetail}`,
      //     query: { ...query, danjiID: `${danjiID}`, bor: `${buyOrRent}` },
      //   });
      // }

      router.push(`/${Routes.DanjiDetail}/${danjiID}?bor=${buyOrRent}`);
    }

    if (platform === 'mobile') {
      router.push(`/${Routes.EntryMobile}/${Routes.DanjiDetail}?danjiID=${danjiID}&bor=${buyOrRent}`);
    }
  }, [buyOrRent, danjiID, platform, router]);

  return { handleClickListItem };
}
