/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, memo, SetStateAction, useEffect, useState } from 'react';

import dynamic from 'next/dynamic';

import { useRouter } from 'next/router';

import { ParentSize } from '@visx/responsive';

import { Separator } from '@/components/atoms';

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

import { useFetchDanjiRealPricesPyongList } from '@/services/danji/useFetchDanjiRealPricesPyongList';

import { BuyOrRent } from '@/constants/enums';

import useConvertedRealPriceChartData from './hooks/useConvertedRealPriceChartData';

import useRealPriceUiHandler from './hooks/useRealPriceUiHandler';

import useConvertedStatusGraph from './hooks/useConvertedStatusGraph';

import useConvertedStatusJeonsaeGraph from './hooks/useConvertedStatusJeonsaeGraph';

import { CommonDanjiDetailProps } from '../types';

const Nodata = dynamic(() => import('./RealPriceChartNodata'), {
  ssr: false,
});

const Info = dynamic(() => import('./Info'), { ssr: false });

const PyoungList = dynamic(() => import('./PyoungList'), { ssr: false });

const TransactionPerArea = dynamic(() => import('./TransactionPerArea'), { ssr: false });

const TotalTrade = dynamic(() => import('./TotalTrade'), {
  ssr: false,
});

const RealPriceChart = dynamic(() => import('./RealPriceChart'), { ssr: false });

const RealPriceList = dynamic(() => import('./RealPriceList'), { ssr: false });

interface RealpriceProps extends CommonDanjiDetailProps {
  isSeo?: boolean;
  isShowRpTab: boolean;
  setLoadingRp?: Dispatch<SetStateAction<boolean>>;
  setIsShowRpTab: Dispatch<SetStateAction<boolean>>;
}

function Realprice({ isSeo, danji, isShowRpTab, setLoadingRp, setIsShowRpTab }: RealpriceProps) {
  const [isMutate, setIsMutate] = useState<boolean>();

  const router = useRouter();

  const {
    buyOrRent,
    selectedYear,
    selectedArea,
    selectedJeonyongArea,
    selectedJeonyongAreaMax,
    selectedJeonyongAreaMin,
    selectedIndex,
    checked,
    onChangeBuyOrRent,
    onChangeChecked,
    onChangeSelectedYear,
    onChangeSelectedArea,
    onChangeSelectedJeonyongArea,
    onChangeSelectedJeonyongAreaMin,
    onChangeSelectedJeonyongAreaMax,
    onChangeSelectedIndex,
  } = useRealPriceUiHandler();

  const { data, isLoading } = useFetchDanjiRealPricesPyongList({
    danjiId: danji.danji_id,
    realestateType: danji.type,
    buyOrRent: isMutate ? buyOrRent || null : undefined,
  });

  const { listDanji, listSido, listSigungu, danjiChartData, sigunguChartData, sidoChartData, xAxis } =
    useConvertedStatusGraph({
      danji,
      buyOrRent: buyOrRent || data?.buy_or_rent,
      selectedYear,
    });

  const {
    listDanji: jeonsaeListDanji,
    listSido: jeonsaeListSido,
    listSigungu: jeonsaeListSigungu,
    danjiChartData: jeonsaeDanjiChartData,
    sigunguChartData: jeonsaeSigunguChartData,
    sidoChartData: jeonsaeSidoChartData,
  } = useConvertedStatusJeonsaeGraph({
    danji,
    buyOrRent:
      data?.buy_or_rent === BuyOrRent.Jeonsae
        ? BuyOrRent.Jeonsae
        : buyOrRent === BuyOrRent.Jeonsae
        ? BuyOrRent.Jeonsae
        : undefined,
    selectedYear,
  });

  const { realpricesChartData, realData } = useConvertedRealPriceChartData({
    danji,
    buyOrRent: buyOrRent || data?.buy_or_rent,
    selectedYear,
    selectedIndex,
    directDealExcluded: checked || false,
    list: data?.list ?? [],
  });

  useEffect(() => {
    if (isLoading === false) {
      setLoadingRp?.(false);
    }
  }, [isLoading]);

  useEffect(() => {
    if (data?.list && data.list.length > 0) {
      setIsShowRpTab(true);

      const index = data.list.findIndex((ele) => ele.default === true);
      onChangeSelectedArea(data.list[index]?.gonggeup_pyoung.toString());
      onChangeSelectedJeonyongArea(data.list[index]?.avg_jeonyong.toString());
      onChangeSelectedJeonyongAreaMin(data.list[index]?.min_jeonyong.toString());
      onChangeSelectedJeonyongAreaMax(data.list[index]?.max_jeonyong.toString());
      onChangeSelectedIndex(index);
    }
  }, [
    data,
    onChangeSelectedArea,
    onChangeSelectedIndex,
    onChangeSelectedJeonyongArea,
    onChangeSelectedJeonyongAreaMax,
    onChangeSelectedJeonyongAreaMin,
    setIsShowRpTab,
  ]);

  useIsomorphicLayoutEffect(() => {
    if (router?.query?.bor === BuyOrRent.Buy.toString()) {
      onChangeBuyOrRent(1);
      setIsMutate(true);
      return;
    }

    if (router?.query?.bor === '2,3') {
      onChangeBuyOrRent(2);
      setIsMutate(true);
      return;
    }

    if (router?.query?.bor === BuyOrRent.Jeonsae.toString()) {
      onChangeBuyOrRent(2);
      setIsMutate(true);
      return;
    }

    if (router?.query?.bor === BuyOrRent.Wolsae.toString()) {
      onChangeBuyOrRent(2);
      setIsMutate(true);
      return;
    }

    if (!router?.query?.bor) {
      setIsMutate(true);
    }
  }, [router.query, danji]);

  if (!isShowRpTab) return null;

  return (
    <div>
      <Separator tw="w-full [min-height: 8px]" />
      <div tw="pt-10">
        <Info
          isSeo={isSeo}
          danji={danji}
          buyOrRent={buyOrRent || data?.buy_or_rent}
          selectedYear={selectedYear}
          onChangeBuyOrRent={onChangeBuyOrRent}
          onChangeSelectedYear={onChangeSelectedYear}
        />
      </div>
      <TransactionPerArea
        xAxis={xAxis}
        buyOrRent={buyOrRent || data?.buy_or_rent}
        selectedYear={selectedYear}
        listDanji={listDanji}
        listSigungu={listSigungu}
        listSido={listSido}
        danjiChartData={danjiChartData}
        sigunguChartData={sigunguChartData}
        sidoChartData={sidoChartData}
        jeonsaeListDanji={jeonsaeListDanji}
        jeonsaeListSigungu={jeonsaeListSigungu}
        jeonsaeListSido={jeonsaeListSido}
        jeonsaeDanjiChartData={jeonsaeDanjiChartData}
        jeonsaeSigunguChartData={jeonsaeSigunguChartData}
        jeonsaeSidoChartData={jeonsaeSidoChartData}
      />
      <TotalTrade
        listDanji={listDanji}
        danjiChartData={danjiChartData}
        buyOrRent={buyOrRent || data?.buy_or_rent}
        selectedYear={selectedYear}
        xAxis={xAxis}
      />

      {data?.list && data.list.length > 0 && (
        <>
          <PyoungList
            buyOrRent={buyOrRent || data?.buy_or_rent}
            pyoungList={data.list}
            hasJyb={data?.has_jyb}
            checked={checked}
            selectedArea={selectedArea}
            selectedJeonyongArea={selectedJeonyongArea}
            selectedIndex={selectedIndex}
            onChangeChecked={onChangeChecked}
            onChangeSelectedArea={onChangeSelectedArea}
            onChangeSelectedJeonyongArea={onChangeSelectedJeonyongArea}
            onChangeSelectedJeonyongAreaMin={onChangeSelectedJeonyongAreaMin}
            onChangeSelectedJeonyongAreaMax={onChangeSelectedJeonyongAreaMax}
            onChangeSelectedIndex={onChangeSelectedIndex}
          />

          {realData && realData.length > 0 ? (
            <div tw="px-5">
              <ParentSize>
                {({ width }) => (
                  <RealPriceChart
                    width={width}
                    xAxis={xAxis}
                    buyOrRent={buyOrRent || data?.buy_or_rent}
                    selectedYear={selectedYear}
                    selectedIndex={selectedIndex}
                    realpricesChartData={realpricesChartData}
                    checked={checked}
                  />
                )}
              </ParentSize>
            </div>
          ) : (
            <div tw="px-5 py-5">
              <Nodata />
            </div>
          )}

          <RealPriceList
            isSeo={isSeo}
            danji={danji}
            isMorePage={false}
            buyOrRent={buyOrRent || data?.buy_or_rent}
            selectedGonggeup={selectedArea}
            selectedYear={selectedYear}
            selectedArea={selectedJeonyongArea}
            selectedAreaMin={selectedJeonyongAreaMin}
            selectedAreaMax={selectedJeonyongAreaMax}
            checked={checked}
            selectedIndex={selectedIndex}
            danjiRealPricesPyoungList={data?.list}
          />
        </>
      )}
    </div>
  );
}

export default memo(Realprice);
