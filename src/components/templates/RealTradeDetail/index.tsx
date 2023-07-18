import { useAPI_GetDanjiDetail } from '@/apis/danji/danjiDetail';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { prefixComparison } from '@/utils/prefix';
import { useCallback, useEffect, useState } from 'react';
import { SelectedDanjiListItem } from '../DanjiSelect/SelectedDanjiListItem';
import RealTradeDetailContent from './RealTradeDetailContent';
import ReapTradeDetailHeader from './ReapTradeDetailHeader';

type ComparisonList = {
  colorCode: string;
  name: string;
  danjiID: number;
  rt: number;
}[];

type ListItemDanji = { name: string; danjiID: number; rt: number };

export default function RealTradeDetail({ depth }: { depth: number }) {
  const router = useRouter(depth);
  const [buyOrRent, setBuyOrRent] = useState<number>();
  const [selectedYear, setSelectedYear] = useState<number>();

  const [comparisonList, setComparisonList] = useState<ComparisonList>([]);

  const { danji } = useAPI_GetDanjiDetail({
    danjiId: router.query.danjiID ? Number(router.query.danjiID) : undefined,
  });

  const onChangeBuyOrRent = useCallback((value: number) => {
    setBuyOrRent(value);
  }, []);

  const onChangeSelectedYear = useCallback((value: number) => {
    setSelectedYear(value);
  }, []);

  const handleClickBackButton = () => {
    if (router.query.listingID) {
      router.replace(Routes.DanjiRealPriceDetail, {
        searchParams: {
          listingID: router.query.listingID as string,
          danjiID: `${router.query.danjiID}`,
        },
        state: { bor: buyOrRent?.toString() || '', sl: selectedYear?.toString() || '' },
      });
    } else {
      router.replace(Routes.DanjiRealPriceDetail, {
        searchParams: { danjiID: `${router.query.danjiID}` },
        state: { bor: buyOrRent?.toString() || '', sl: selectedYear?.toString() || '' },
      });
    }
  };

  const removeDanji = (item: ListItemDanji) => {
    if (comparisonList && comparisonList.length > 0) {
      setComparisonList((prev) => {
        if (prev.length === 0) {
          localStorage.removeItem(prefixComparison);

          if (router.query.listingID) {
            router.replace(Routes.DanjiRealPriceDetail, {
              searchParams: {
                listingID: router.query.listingID as string,
                danjiID: `${router.query.danjiID}`,
              },
              state: { bor: buyOrRent?.toString() || '', sl: selectedYear?.toString() || '' },
            });
          } else {
            router.replace(Routes.DanjiRealPriceDetail, {
              searchParams: { danjiID: `${router.query.danjiID}` },
              state: { bor: buyOrRent?.toString() || '', sl: selectedYear?.toString() || '' },
            });
          }

          return [];
        }

        localStorage.setItem(
          prefixComparison,
          JSON.stringify([...prev].filter((ele: ListItemDanji) => ele.danjiID !== item.danjiID)),
        );

        return [...prev].filter((ele: ListItemDanji) => ele.danjiID !== item.danjiID);
      });
    }
  };

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
        onClickSelectPage={onClickSelectPage}
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
                key={item.danjiID}
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
