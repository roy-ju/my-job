/* eslint-disable react-hooks/exhaustive-deps */
import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';
import { useAPI_DanjiRealPricesPyoungList } from '@/apis/danji/danjiRealPricesPyoungList';
import { Separator } from '@/components/atoms';
import { DanjiDetailSection } from '@/components/organisms';
import DanjiChartNodata from '@/components/organisms/DanjiDetail/DanjiChartNodata';
import useDanjiRealPricesChart from '@/components/pages/pc/DanjiDetail/useDanjiRealPricesChart';
import useDanjiStatusChart from '@/components/pages/pc/DanjiDetail/useDanjiStatusChart';
import useDanjiStatusChartJeonsae from '@/components/pages/pc/DanjiDetail/useDanjiStatusChartJeonsae';
import { BuyOrRent, describeJeonsaeWolsaeSame, Year } from '@/constants/enums';
import { ParentSize } from '@visx/responsive';
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { DanjiRealPriceChart } from '../DanjiRealPriceChart';
import DanjiStatusChartWrraper from '../DanjiStatusChartWrraper';
import DanjiStatusJeonsaeChartWrraper from '../DanjiStatusJeonsaeChartWrraper';
import DanjiStatusTradeChartWrraper from '../DanjiStatusTradeChartWrraper';

type Props = {
  depth: number;
  danji?: GetDanjiDetailResponse;
  isShowRpTab: boolean;
  isShowlistingsSection: boolean;
  setLoadingRp: Dispatch<SetStateAction<boolean>>;
  setIsShowRpTab: Dispatch<SetStateAction<boolean>>;
};

const DanjiRealpriceContainer = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { depth, danji, isShowRpTab, isShowlistingsSection, setLoadingRp, setIsShowRpTab } = props;
  const [isMutate, setIsMutate] = useState(false);

  const [buyOrRent, setBuyOrRent] = useState<number>();
  const [selectedYear, setSelectedYear] = useState<number>(Year.Three);
  const [selectedArea, setSelectedArea] = useState<string>();
  const [selectedJeonyongArea, setSelectedJeonyongArea] = useState<string>();
  const [selectedJeonyongAreaMax, setSelectedJeonyongAreaMax] = useState<string>();
  const [selectedIndex, setSelectedIndex] = useState<number>();
  const [checked, setChecked] = useState<boolean>(false);

  const {
    data: danjiRealPricesData,
    list: danjiRealPricesPyoungList,
    isLoading: danjiRealPricesPyoungListLoading,
  } = useAPI_DanjiRealPricesPyoungList({
    pnu: danji?.pnu,
    realestateType: danji?.type,
    buyOrRent: isMutate ? buyOrRent : null,
  });

  const onChangeBuyOrRent = useCallback((value: number) => {
    setBuyOrRent(value);
    setIsMutate(true);
  }, []);

  const onChangeChecked = useCallback(() => {
    setChecked((prev) => !prev);
  }, []);

  const onChangeSelectedYear = useCallback((value: number) => {
    setSelectedYear(value);
  }, []);

  const onChangeSelectedArea = useCallback((val: string) => {
    setSelectedArea(val);
  }, []);

  const onChangeSelectedJeonyongArea = useCallback((val: string) => {
    setSelectedJeonyongArea(val);
  }, []);

  const onChangeSelectedJeonyongAreaMax = useCallback((val: string) => {
    setSelectedJeonyongAreaMax(val);
  }, []);

  const onChangeSelectedIndex = useCallback((val: number) => {
    setSelectedIndex(val);
  }, []);

  const { listDanji, danjiChartData, sigunguChartData, sidoChartData, xAxis } = useDanjiStatusChart({
    danji,
    buyOrRent,
    selectedYear,
  });

  const {
    listDanji: jeonsaeListDanji,
    danjiChartData: jeonsaeDanjiChartData,
    sigunguChartData: jeonsaeSigunguChartData,
    sidoChartData: jeonsaeSidoChartData,
  } = useDanjiStatusChartJeonsae({
    danji,
    buyOrRent: buyOrRent === BuyOrRent.Jeonsae ? buyOrRent : undefined,
    selectedYear,
  });

  const { realpricesChartData, realData } = useDanjiRealPricesChart({
    danji,
    buyOrRent,
    selectedYear,
    selectedIndex,
    directDealExcluded: checked || false,
    list: danjiRealPricesPyoungList,
  });

  useEffect(() => {
    if (danjiRealPricesPyoungListLoading === false) {
      setLoadingRp(false);
    }
  }, [danjiRealPricesPyoungListLoading]);

  useEffect(() => {
    if (danjiRealPricesPyoungList && danjiRealPricesPyoungList.length > 0) {
      setIsShowRpTab(true);

      const index = danjiRealPricesPyoungList.findIndex((ele) => ele.default === true);

      setSelectedArea(danjiRealPricesPyoungList[index]?.gonggeup_pyoung.toString());

      setSelectedJeonyongArea(danjiRealPricesPyoungList[index]?.min_jeonyong.toString());

      setSelectedJeonyongAreaMax(danjiRealPricesPyoungList[index]?.max_jeonyong.toString());

      setSelectedIndex(index);

      setBuyOrRent(danjiRealPricesData?.buy_or_rent);
    }
  }, [danjiRealPricesData?.buy_or_rent, danjiRealPricesPyoungList, danjiRealPricesPyoungListLoading, setIsShowRpTab]);

  if (!danji) return null;

  if (!buyOrRent) return null;

  if (!isShowRpTab) return null;

  return (
    <div id="negocio-danjidetail-rp" ref={ref}>
      {isShowlistingsSection && <Separator tw="w-full [min-height: 8px]" />}
      <div tw="pt-10">
        <DanjiDetailSection.RealPriceInfo
          depth={depth}
          danji={danji}
          buyOrRent={buyOrRent}
          selectedYear={selectedYear}
          onChangeBuyOrRent={onChangeBuyOrRent}
          onChangeSelectedYear={onChangeSelectedYear}
        />
      </div>
      <div tw="px-5 mt-10">
        <div tw="mb-3">
          <span tw="text-b2 [line-height: 1.0625rem] [letter-spacing: -0.4px]">
            면적당 거래가 ({describeJeonsaeWolsaeSame(buyOrRent)} / ㎡)
          </span>
        </div>
        {((listDanji && listDanji.length === 0) || !listDanji) && <DanjiChartNodata />}

        {listDanji && listDanji.length > 0 && (
          <ParentSize>
            {({ width }) => (
              <DanjiStatusChartWrraper
                width={width}
                xAxis={xAxis}
                listDanji={listDanji}
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

          {((jeonsaeListDanji && jeonsaeListDanji.length === 0) || !jeonsaeListDanji) && <DanjiChartNodata />}

          {jeonsaeListDanji && jeonsaeListDanji.length > 0 && (
            <ParentSize>
              {({ width }) => (
                <DanjiStatusJeonsaeChartWrraper
                  width={width}
                  xAxis={xAxis}
                  listDanji={jeonsaeListDanji}
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
            총 거래량 ({describeJeonsaeWolsaeSame(buyOrRent)})
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
          <DanjiDetailSection.RealPricesPyoungList
            buyOrRent={buyOrRent}
            danjiRealPricesPyoungList={danjiRealPricesPyoungList}
            selectedArea={selectedArea}
            selectedIndex={selectedIndex}
            checked={checked}
            onChangeChecked={onChangeChecked}
            onChangeSelectedIndex={onChangeSelectedIndex}
            onChangeSelectedArea={onChangeSelectedArea}
            onChangeSelectedJeonyongArea={onChangeSelectedJeonyongArea}
            onChangeSelectedJeonyongAreaMax={onChangeSelectedJeonyongAreaMax}
          />

          {realData && realData.length > 0 ? (
            <div tw="px-5">
              <ParentSize>
                {({ width }) => (
                  <DanjiRealPriceChart
                    width={width}
                    xAxis={xAxis}
                    buyOrRent={buyOrRent}
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

          <DanjiDetailSection.RealPricesList
            depth={depth}
            danji={danji}
            isMorePage={false}
            buyOrRent={buyOrRent}
            selectedGonggeup={selectedArea}
            selectedYear={selectedYear}
            selectedArea={selectedJeonyongArea}
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

export default DanjiRealpriceContainer;
