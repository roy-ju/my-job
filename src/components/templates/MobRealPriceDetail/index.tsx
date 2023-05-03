import { useAPI_GetDanjiDetail } from '@/apis/danji/danjiDetail';
import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import RealPriceDetailContent from '../RealPriceDetail/RealPriceDetailContent';
import ReapPriceDetailHeader from '../RealPriceDetail/ReapPriceDetailHeader';

export default function MobRealPriceDetail() {
  const router = useRouter();
  const [buyOrRent, setBuyOrRent] = useState<number>();
  const [selectedYear, setSelectedYear] = useState<number>();

  const { danji } = useAPI_GetDanjiDetail({
    pnu: router.query.p ? (router.query.p as string) : undefined,
    realestateType: router.query.rt ? Number(router.query.rt) : undefined,
  });

  const onChangeBuyOrRent = useCallback((value: number) => {
    setBuyOrRent(value);
  }, []);

  const onChangeSelectedYear = useCallback((value: number) => {
    setSelectedYear(value);
  }, []);

  const onClickSelectPage = () => {
    router.push(
      {
        pathname: `/${Routes.EntryMobile}/${Routes.DanjiDetail}/${Routes.DanjiSelect}`,
        query: {
          p: `${router.query.p}`,
          rt: router.query.rt as string,
          bor: buyOrRent?.toString() || '',
          sl: selectedYear?.toString() || '',
        },
      },
      `/${Routes.EntryMobile}/${Routes.DanjiDetail}/${Routes.DanjiSelect}?p=${router.query.p}&rt=${router.query.rt}`,
    );
  };

  const onClickBack = () => {
    router.back();
  };

  useEffect(() => {
    if (router?.query?.bor) {
      setBuyOrRent(Number(router.query.bor));
    }

    if (router?.query?.sl) {
      setSelectedYear(Number(router.query.sl));
    }
  }, [router.query]);

  return (
    <div tw="w-full max-w-mobile relative flex flex-col h-full">
      <ReapPriceDetailHeader
        danji={danji}
        buyOrRent={buyOrRent || 1}
        selectedYear={selectedYear || 3}
        onChangeBuyOrRent={onChangeBuyOrRent}
        onChangeSelectedYear={onChangeSelectedYear}
        onClickSelectPage={onClickSelectPage}
        onClickBack={onClickBack}
      />
      <div tw="overflow-y-auto">
        <RealPriceDetailContent danji={danji} buyOrRent={buyOrRent || 1} selectedYear={selectedYear || 3} />
      </div>
    </div>
  );
}
