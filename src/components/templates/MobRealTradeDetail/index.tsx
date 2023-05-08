import { useAPI_GetDanjiDetail } from '@/apis/danji/danjiDetail';
import Routes from '@/router/routes';
import { prefixComparison } from '@/utils/prefix';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { SelectedDanjiListItem } from '../DanjiSelect/SelectedDanjiListItem';
import ReapTradeDetailHeader from '../RealTradeDetail/ReapTradeDetailHeader';

const RealTradeDetailContent = dynamic(() => import('../RealTradeDetail/RealTradeDetailContent'), { ssr: false });

type ComparisonList = {
  colorCode: string;
  name: string;
  pnu: string;
  rt: number;
}[];

type ListItemDanji = { name: string; pnu: string; rt: number };

export default function MobRealTradeDetail() {
  const router = useRouter();
  const [buyOrRent, setBuyOrRent] = useState<number>();
  const [selectedYear, setSelectedYear] = useState<number>();

  const [comparisonList, setComparisonList] = useState<ComparisonList>([]);

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

  const handleClickBackButton = () => {
    router.back();
  };

  const removeDanji = (item: ListItemDanji) => {
    if (comparisonList && comparisonList.length > 0) {
      setComparisonList((prev) => {
        if (prev.length === 0) {
          localStorage.removeItem(prefixComparison);

          router.replace(
            {
              pathname: `/${Routes.EntryMobile}/${Routes.DanjiRealPriceDetail}`,
              query: {
                p: `${router.query.p}`,
                rt: router.query.rt as string,
                bor: buyOrRent?.toString() || '',
                sl: selectedYear?.toString() || '',
              },
            },
            `/${Routes.EntryMobile}/${Routes.DanjiRealPriceDetail}?p=${router.query.p}&rt=${router.query.rt}`,
          );

          return [];
        }

        localStorage.setItem(
          prefixComparison,
          JSON.stringify([...prev].filter((ele: ListItemDanji) => ele.pnu !== item.pnu)),
        );

        return [...prev].filter((ele: ListItemDanji) => ele.pnu !== item.pnu);
      });
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (localStorage.getItem(prefixComparison)) {
        const parseTarget = localStorage.getItem(prefixComparison);

        if (parseTarget !== null) {
          setComparisonList(JSON.parse(parseTarget));
        }
      }
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (router?.query?.bor) {
      setBuyOrRent(Number(router.query.bor));
    }

    if (router?.query?.sl) {
      setSelectedYear(Number(router.query.sl));
    }
  }, [router.query]);

  if (!danji) return null;

  return (
    <div tw="relative flex flex-col h-full">
      <ReapTradeDetailHeader
        danji={danji}
        buyOrRent={buyOrRent || 1}
        selectedYear={selectedYear || 3}
        onChangeBuyOrRent={onChangeBuyOrRent}
        onChangeSelectedYear={onChangeSelectedYear}
        onClickBackButton={handleClickBackButton}
      />
      <div tw="overflow-y-auto">
        <div tw="w-full relative bg-white py-3 pb-0 px-5 gap-1">
          <SelectedDanjiListItem
            listLength={comparisonList?.length || 0}
            title={danji.name || ''}
            index="#FF542D"
            isDefaultDanji
          />
          {comparisonList &&
            comparisonList.length > 0 &&
            comparisonList.map((item) => (
              <SelectedDanjiListItem
                item={item}
                title={item.name}
                index={item.colorCode}
                key={item.pnu}
                removeDanji={removeDanji}
                listLength={comparisonList?.length || 0}
              />
            ))}
        </div>
        {comparisonList && comparisonList.length > 0 && (
          <RealTradeDetailContent
            danji={danji}
            buyOrRent={buyOrRent || 1}
            selectedYear={selectedYear || 3}
            comparisonList={comparisonList}
          />
        )}
      </div>
    </div>
  );
}
