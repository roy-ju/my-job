import { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { useAPI_GetDanjiDetail } from '@/apis/danji/danjiDetail';

import Routes from '@/router/routes';

import RealPriceDetailContent from '../RealPriceDetail/RealPriceDetailContent';

import ReapPriceDetailHeader from '../RealPriceDetail/ReapPriceDetailHeader';

export default function MobRealPriceDetail() {
  const router = useRouter();
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
    router.push(
      {
        pathname: `/${Routes.EntryMobile}/${Routes.DanjiSelect}`,
        query: {
          danjiID: `${router.query.danjiID}`,
          bor: buyOrRent?.toString() || '',
          sl: selectedYear?.toString() || '',
        },
      },
      `/${Routes.EntryMobile}/${Routes.DanjiSelect}?danjiID=${router.query.danjiID}`,
    );
  };

  const handleClickBack = useCallback(() => {
    const canGoBack = window.history.length > 1;

    if (canGoBack) {
      router.back();
    } else {
      router.replace(`/${Routes.EntryMobile}/${Routes.DanjiDetail}/${router.query.danjiID}`);

      // router.replace(`/${Routes.EntryMobile}/${Routes.DanjiDetail}?danjiID=${router.query.danjiID}`);
    }
  }, [router]);

  const handleClickTitle = useCallback(() => {
    router.replace(`/${Routes.EntryMobile}/${Routes.DanjiDetail}/${router.query.danjiID}`);

    // router.replace(`/${Routes.EntryMobile}/${Routes.DanjiDetail}?danjiID=${router.query.danjiID}`);
  }, [router]);

  useEffect(() => {
    if (router?.query?.bor) {
      setBuyOrRent(Number(router.query.bor));
    }

    if (router?.query?.sl) {
      setSelectedYear(Number(router.query.sl));
    }
  }, [router.query]);

  return (
    <div tw="w-full relative flex flex-col h-full">
      <ReapPriceDetailHeader
        danji={danji}
        buyOrRent={buyOrRent || 1}
        selectedYear={selectedYear || 3}
        onChangeBuyOrRent={onChangeBuyOrRent}
        onChangeSelectedYear={onChangeSelectedYear}
        onClickSelectPage={onClickSelectPage}
        onClickBack={handleClickBack}
        onClickTitle={handleClickTitle}
      />
      <div tw="overflow-y-auto">
        <RealPriceDetailContent danji={danji} buyOrRent={buyOrRent || 1} selectedYear={selectedYear || 3} />
      </div>
    </div>
  );
}
