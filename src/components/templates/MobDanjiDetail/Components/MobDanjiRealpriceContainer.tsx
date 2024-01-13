/* eslint-disable react-hooks/exhaustive-deps */
import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';
import { useAPI_DanjiRealPricesPyoungList } from '@/apis/danji/danjiRealPricesPyoungList';
import { Separator } from '@/components/atoms';
import { MobDanjiDetailSection } from '@/components/organisms';
import DanjiChartNodata from '@/components/organisms/DanjiDetail/DanjiChartNodata';
import useDanjiRealPricesChart from '@/components/pages/pc/DanjiDetail/useDanjiRealPricesChart';
import useDanjiStatusChart from '@/components/pages/pc/DanjiDetail/useDanjiStatusChart';
import useDanjiStatusChartJeonsae from '@/components/pages/pc/DanjiDetail/useDanjiStatusChartJeonsae';
import { BuyOrRent, describeJeonsaeWolsaeSame, Year } from '@/constants/enums';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import { ParentSize } from '@visx/responsive';
import { useRouter } from 'next/router';
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { DanjiRealPriceChart } from '../../DanjiDetail/DanjiRealPriceChart';
import DanjiStatusChartWrraper from '../../DanjiDetail/DanjiStatusChartWrraper';
import DanjiStatusJeonsaeChartWrraper from '../../DanjiDetail/DanjiStatusJeonsaeChartWrraper';
import DanjiStatusTradeChartWrraper from '../../DanjiDetail/DanjiStatusTradeChartWrraper';

type Props = {
  danji?: GetDanjiDetailResponse;
  isShowRpTab: boolean;
  setLoadingRp?: Dispatch<SetStateAction<boolean>>;
  setIsShowRpTab: Dispatch<SetStateAction<boolean>>;
};

const MobDanjiRealpriceContainer = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { danji, isShowRpTab, setLoadingRp, setIsShowRpTab } = props;
  const [isMutate, setIsMutate] = useState<boolean>();

  const router = useRouter();

  const [buyOrRent, setBuyOrRent] = useState<number>();
  const [selectedYear, setSelectedYear] = useState<number>(Year.Three);
  const [selectedArea, setSelectedArea] = useState<string>();
  const [selectedJeonyongArea, setSelectedJeonyongArea] = useState<string>();
  const [selectedJeonyongAreaMin, setSelectedJeonyongAreaMin] = useState<string>();
  const [selectedJeonyongAreaMax, setSelectedJeonyongAreaMax] = useState<string>();
  const [selectedIndex, setSelectedIndex] = useState<number>();
  const [checked, setChecked] = useState<boolean>(false);

  const {
    hasJyb,
    data: danjiRealPricesData,
    list: danjiRealPricesPyoungList,
    isLoading: danjiRealPricesPyoungListLoading,
  } = useAPI_DanjiRealPricesPyoungList({
    danjiId: danji?.danji_id,
    realestateType: danji?.type,
    buyOrRent: isMutate ? buyOrRent || null : undefined,
  });

  const onChangeBuyOrRent = useCallback((value: number) => {
    setBuyOrRent(value);
  }, []);

  const onChangeChecked = useCallback(() => {
    setChecked((prev) => !prev);
  }, []);

  const onChangeSelectedYear = useCallback((val: number) => {
    setSelectedYear(val);
  }, []);

  const onChangeSelectedArea = useCallback((val: string) => {
    setSelectedArea(val);
  }, []);

  const onChangeSelectedJeonyongArea = useCallback((val: string) => {
    setSelectedJeonyongArea(val);
  }, []);

  const onChangeSelectedJeonyongAreaMin = useCallback((val: string) => {
    setSelectedJeonyongAreaMin(val);
  }, []);

  const onChangeSelectedJeonyongAreaMax = useCallback((val: string) => {
    setSelectedJeonyongAreaMax(val);
  }, []);

  const onChangeSelectedIndex = useCallback((val: number) => {
    setSelectedIndex(val);
  }, []);

  const { listDanji, listSido, listSigungu, danjiChartData, sigunguChartData, sidoChartData, xAxis } =
    useDanjiStatusChart({
      danji,
      buyOrRent: buyOrRent || danjiRealPricesData?.buy_or_rent,
      selectedYear,
    });

  const {
    listDanji: jeonsaeListDanji,
    listSido: jeonsaeListSido,
    listSigungu: jeonsaeListSigungu,
    danjiChartData: jeonsaeDanjiChartData,
    sigunguChartData: jeonsaeSigunguChartData,
    sidoChartData: jeonsaeSidoChartData,
  } = useDanjiStatusChartJeonsae({
    danji,
    buyOrRent:
      danjiRealPricesData?.buy_or_rent === BuyOrRent.Jeonsae
        ? BuyOrRent.Jeonsae
        : buyOrRent === BuyOrRent.Jeonsae
        ? BuyOrRent.Jeonsae
        : undefined,
    selectedYear,
  });

  const { realpricesChartData, realData } = useDanjiRealPricesChart({
    danji,
    buyOrRent: buyOrRent || danjiRealPricesData?.buy_or_rent,
    selectedYear,
    selectedIndex,
    directDealExcluded: checked || false,
    list: danjiRealPricesPyoungList,
  });

  useEffect(() => {
    if (danjiRealPricesPyoungListLoading === false) {
      setLoadingRp?.(false);
    }
  }, [danjiRealPricesPyoungListLoading]);

  useEffect(() => {
    if (danjiRealPricesPyoungList && danjiRealPricesPyoungList.length > 0) {
      setIsShowRpTab(true);

      const index = danjiRealPricesPyoungList.findIndex((ele) => ele.default === true);

      setSelectedArea(danjiRealPricesPyoungList[index]?.gonggeup_pyoung.toString());

      setSelectedJeonyongArea(danjiRealPricesPyoungList[index]?.avg_jeonyong.toString());

      setSelectedJeonyongAreaMin(danjiRealPricesPyoungList[index]?.min_jeonyong.toString());

      setSelectedJeonyongAreaMax(danjiRealPricesPyoungList[index]?.max_jeonyong.toString());

      setSelectedIndex(index);
    }
  }, [danjiRealPricesData?.buy_or_rent, danjiRealPricesPyoungList, danjiRealPricesPyoungListLoading, setIsShowRpTab]);

  useIsomorphicLayoutEffect(() => {
    if (router?.query?.bor === BuyOrRent.Buy.toString()) {
      setBuyOrRent(1);
      setIsMutate(true);
      return;
    }

    if (router?.query?.bor === '2,3') {
      setBuyOrRent(2);
      setIsMutate(true);
      return;
    }

    if (router?.query?.bor === BuyOrRent.Jeonsae.toString()) {
      setBuyOrRent(2);
      setIsMutate(true);
      return;
    }

    if (router?.query?.bor === BuyOrRent.Wolsae.toString()) {
      setBuyOrRent(2);
      setIsMutate(true);
      return;
    }

    if (!router?.query?.bor) {
      setIsMutate(true);
    }
  }, [router.query, danji]);

  if (!danji) return null;

  if (!isShowRpTab) return null;

  return (
    <div id="negocio-danjidetail-rp" ref={ref}>
      <Separator tw="w-full [min-height: 8px]" />
      <div tw="pt-10">
        <MobDanjiDetailSection.RealPriceInfo
          danji={danji}
          buyOrRent={buyOrRent || danjiRealPricesData?.buy_or_rent}
          selectedYear={selectedYear}
          onChangeBuyOrRent={onChangeBuyOrRent}
          onChangeSelectedYear={onChangeSelectedYear}
        />
      </div>
      <div tw="px-5 mt-10">
        <div tw="mb-3">
          <span tw="text-b2 [line-height: 1.0625rem] [letter-spacing: -0.4px]">
            면적당 거래가 ({describeJeonsaeWolsaeSame(buyOrRent || danjiRealPricesData?.buy_or_rent)} / ㎡)
          </span>
        </div>
        {((listDanji && listDanji.length === 0) || !listDanji) &&
          ((listSido && listSido.length === 0) || !listSido) &&
          ((listSigungu && listSigungu.length === 0) || !listSigungu) && <DanjiChartNodata />}

        {((listDanji && listDanji.length > 0) ||
          (listSido && listSido.length > 0) ||
          (listSigungu && listSigungu.length > 0)) && (
          <ParentSize>
            {({ width }) => (
              <DanjiStatusChartWrraper
                width={width}
                xAxis={xAxis}
                danjiChartData={danjiChartData}
                sigunguChartData={sigunguChartData}
                sidoChartData={sidoChartData}
                selectedYear={selectedYear}
              />
            )}
          </ParentSize>
        )}
      </div>
      {buyOrRent === BuyOrRent.Jeonsae && (
        <div tw="px-5 mt-10">
          <div tw="mb-3">
            <span tw="text-b2 [line-height: 1.0625rem] [letter-spacing: -0.4px]">평균 전세가율</span>
          </div>

          {((jeonsaeListDanji && jeonsaeListDanji.length === 0) || !jeonsaeListDanji) &&
            ((jeonsaeListSido && jeonsaeListSido.length === 0) || !jeonsaeListSido) &&
            ((jeonsaeListSigungu && jeonsaeListSigungu.length === 0) || !jeonsaeListSigungu) && <DanjiChartNodata />}

          {((jeonsaeListDanji && jeonsaeListDanji.length > 0) ||
            (jeonsaeListSido && jeonsaeListSido.length > 0) ||
            (jeonsaeListSigungu && jeonsaeListSigungu.length > 0)) && (
            <ParentSize>
              {({ width }) => (
                <DanjiStatusJeonsaeChartWrraper
                  width={width}
                  xAxis={xAxis}
                  danjiChartData={jeonsaeDanjiChartData}
                  sigunguChartData={jeonsaeSigunguChartData}
                  sidoChartData={jeonsaeSidoChartData}
                  selectedYear={selectedYear}
                />
              )}
            </ParentSize>
          )}
        </div>
      )}
      <div tw="px-5 mt-10">
        <div tw="mb-3">
          <span tw="text-b2 [line-height: 1.0625rem] [letter-spacing: -0.4px]">
            총 거래량 ({describeJeonsaeWolsaeSame(buyOrRent || danjiRealPricesData?.buy_or_rent)})
          </span>
        </div>

        {((listDanji && listDanji.length === 0) || !listDanji) && <DanjiChartNodata />}

        {listDanji && listDanji.length > 0 && (
          <ParentSize>
            {({ width }) => (
              <DanjiStatusTradeChartWrraper
                width={width}
                xAxis={xAxis}
                listDanji={listDanji}
                danjiChartData={danjiChartData}
                selectedYear={selectedYear}
              />
            )}
          </ParentSize>
        )}
      </div>

      {danjiRealPricesPyoungList && danjiRealPricesPyoungList.length > 0 && (
        <>
          <MobDanjiDetailSection.RealPricesPyoungList
            buyOrRent={buyOrRent || danjiRealPricesData?.buy_or_rent}
            danjiRealPricesPyoungList={danjiRealPricesPyoungList}
            selectedArea={selectedArea}
            selectedJeonyongArea={selectedJeonyongArea}
            selectedIndex={selectedIndex}
            checked={checked}
            hasJyb={hasJyb}
            onChangeChecked={onChangeChecked}
            onChangeSelectedIndex={onChangeSelectedIndex}
            onChangeSelectedArea={onChangeSelectedArea}
            onChangeSelectedJeonyongArea={onChangeSelectedJeonyongArea}
            onChangeSelectedJeonyongAreaMin={onChangeSelectedJeonyongAreaMin}
            onChangeSelectedJeonyongAreaMax={onChangeSelectedJeonyongAreaMax}
          />

          {realData && realData.length > 0 ? (
            <div tw="px-5">
              <ParentSize>
                {({ width }) => (
                  <DanjiRealPriceChart
                    width={width}
                    xAxis={xAxis}
                    buyOrRent={buyOrRent || danjiRealPricesData?.buy_or_rent}
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
              <DanjiChartNodata />
            </div>
          )}

          <MobDanjiDetailSection.RealPricesList
            danji={danji}
            isMorePage={false}
            buyOrRent={buyOrRent || danjiRealPricesData?.buy_or_rent}
            selectedGonggeup={selectedArea}
            selectedYear={selectedYear}
            selectedArea={selectedJeonyongArea}
            selectedAreaMin={selectedJeonyongAreaMin}
            selectedAreaMax={selectedJeonyongAreaMax}
            checked={checked}
            selectedIndex={selectedIndex}
            danjiRealPricesPyoungList={danjiRealPricesPyoungList}
          />
        </>
      )}
    </div>
  );
});

export default MobDanjiRealpriceContainer;
