import { useCallback, useEffect, useState } from 'react';

import dynamic from 'next/dynamic';

import { useRouter as useNextRouter } from 'next/router';

import { useRouter } from '@/hooks/utils';

import { useAPI_GetDanjiDetail } from '@/apis/danji/danjiDetail';

import Routes from '@/router/routes';

import ReapPriceDetailHeader from './ReapPriceDetailHeader';

const RealPriceDetailContent = dynamic(() => import('./RealPriceDetailContent'), { ssr: false });

export default function RealPriceDetail({ depth }: { depth: number }) {
  const router = useRouter(depth);

  const nextRouter = useNextRouter();

  const [buyOrRent, setBuyOrRent] = useState<number>();

  const [selectedYear, setSelectedYear] = useState<number>();

  const { danji } = useAPI_GetDanjiDetail({
    danjiId: router?.query?.danjiID ? Number(router.query.danjiID) : undefined,
  });

  const onChangeBuyOrRent = useCallback((value: number) => {
    setBuyOrRent(value);
  }, []);

  const onChangeSelectedYear = useCallback((value: number) => {
    setSelectedYear(value);
  }, []);

  const onClickSelectPage = () => {
    if (router.query.listingID) {
      router.replace(Routes.DanjiSelect, {
        searchParams: {
          listingID: router.query.listingID as string,
          danjiID: `${router.query.danjiID}`,
        },
        state: { bor: buyOrRent?.toString() || '', sl: selectedYear?.toString() || '' },
      });
    } else {
      router.replace(Routes.DanjiSelect, {
        searchParams: { danjiID: `${router.query.danjiID}` },
        state: { bor: buyOrRent?.toString() || '', sl: selectedYear?.toString() || '' },
      });
    }
  };

  useEffect(() => {
    if (router?.query?.bor) {
      setBuyOrRent(Number(router.query.bor));
    }

    if (router?.query?.sl) {
      setSelectedYear(Number(router.query.sl));
    }
  }, [router.query]);

  const onCliCkTitle = useCallback(() => {
    nextRouter.replace(`/${Routes.DanjiDetail}?danjiID=${nextRouter?.query?.danjiID}`);
  }, [nextRouter]);

  return (
    <div tw="relative flex flex-col h-full">
      <ReapPriceDetailHeader
        danji={danji}
        buyOrRent={buyOrRent || 1}
        selectedYear={selectedYear || 3}
        onChangeBuyOrRent={onChangeBuyOrRent}
        onChangeSelectedYear={onChangeSelectedYear}
        onClickSelectPage={onClickSelectPage}
        onClickTitle={onCliCkTitle}
      />
      <div tw="overflow-y-auto">
        <RealPriceDetailContent danji={danji} buyOrRent={buyOrRent || 1} selectedYear={selectedYear || 3} />
      </div>
    </div>
  );
}
