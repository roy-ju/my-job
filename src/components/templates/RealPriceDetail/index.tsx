import { useAPI_GetDanjiDetail } from '@/apis/danji/danjiDetail';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { useCallback, useEffect, useState } from 'react';
import RealPriceDetailContent from './RealPriceDetailContent';
import ReapPriceDetailHeader from './ReapPriceDetailHeader';

export default function RealPriceDetail({ depth }: { depth: number }) {
  const router = useRouter(depth);
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
    router.replace(Routes.DanjiSelect, {
      searchParams: { p: `${router.query.p}`, rt: router.query.rt as string },
      state: { bor: buyOrRent?.toString() || '', sl: selectedYear?.toString() || '' },
    });
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
    <div tw="relative flex flex-col h-full">
      <ReapPriceDetailHeader
        danji={danji}
        buyOrRent={buyOrRent || 1}
        selectedYear={selectedYear || 3}
        onChangeBuyOrRent={onChangeBuyOrRent}
        onChangeSelectedYear={onChangeSelectedYear}
        onClickSelectPage={onClickSelectPage}
      />
      <div tw="overflow-y-auto">
        <RealPriceDetailContent danji={danji} buyOrRent={buyOrRent || 1} selectedYear={selectedYear || 3} />
      </div>
    </div>
  );
}
