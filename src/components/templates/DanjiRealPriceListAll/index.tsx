/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';

import { ParentSize } from '@visx/responsive';

import { NavigationHeader } from '@/components/molecules';

import { DanjiDetailSection } from '@/components/organisms';

import DanjiChartNodata from '@/components/organisms/DanjiDetail/DanjiChartNodata';

import RealPriceInfoHeader from '@/components/organisms/DanjiDetail/RealPriceInfoHeader';

import useDanjiRealPricesChart from '@/components/pages/pc/DanjiDetail/useDanjiRealPricesChart';

import useSessionStorage from '@/hooks/useSessionStorage';

import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';

import { useAPI_DanjiRealPricesPyoungList } from '@/apis/danji/danjiRealPricesPyoungList';

import { BuyOrRent, Year } from '@/constants/enums';

import { DanjiRealPriceChart } from '../DanjiDetail/DanjiRealPriceChart';

export default function DanjiRealPriceListAll({
  depth,
  danji,
  onClickBackButton,
}: {
  depth: number;
  danji?: GetDanjiDetailResponse;
  onClickBackButton?: () => void;
}) {
  const [checked, setChecked] = useSessionStorage('d-ch', sessionStorage.getItem('d-ch') || '1');

  const [buyOrRent, setBuyOrRent] = useSessionStorage('d-br', Number(sessionStorage.getItem('d-br')) || BuyOrRent.Buy);

  const [selectedYear, setSelectedYear] = useSessionStorage(
    'd-yr',
    Number(sessionStorage.getItem('d-yr')) || Year.Three,
  );

  const [checkedBoolean, setCheckedBoolean] = useState<boolean>(false);

  const [selectedArea, setSelectedArea] = useSessionStorage('d-gr', sessionStorage.getItem('d-gr')?.toString() || '');

  const [selectedJeonyongAreaMin, setSelectedJeonyongAreaMin] = useSessionStorage(
    'd-jr-min',
    sessionStorage.getItem('d-jr-min')?.toString() || '',
  );

  const [selectedJeonyongAreaMax, setSelectedJeonyongAreaMax] = useSessionStorage(
    'd-jr-max',
    sessionStorage.getItem('d-jr-max')?.toString() || '',
  );

  const [selectedJeonyongArea, setSelectedJeonyongArea] = useSessionStorage(
    'd-jr-s',
    sessionStorage.getItem('d-jr-s')?.toString() || '',
  );

  const [selectedIndex, setSelectedIndex] = useSessionStorage(
    'd-sl-i',
    sessionStorage.getItem('d-sl-i') ? Number(sessionStorage.getItem('d-sl-i')) : 1,
  );

  const onChangeChecked = () => {
    setCheckedBoolean((prev) => !prev);
  };

  const onChangeSelectedArea = useCallback(
    (val: string) => {
      setSelectedArea(val);
    },
    [setSelectedArea],
  );

  const onChangeBuyOrRent = useCallback(
    (val: number) => {
      setBuyOrRent(val);
    },
    [setBuyOrRent],
  );

  const onChangeSelectedYear = useCallback(
    (val: number) => {
      setSelectedYear(val);
    },
    [setSelectedYear],
  );

  const onChangeSelectedJeonyongArea = useCallback(
    (val: string) => {
      setSelectedJeonyongArea(val);
    },
    [setSelectedJeonyongArea],
  );

  const onChangeSelectedJeonyongAreaMin = useCallback(
    (val: string) => {
      setSelectedJeonyongAreaMin(val);
    },
    [setSelectedJeonyongAreaMin],
  );

  const onChangeSelectedJeonyongAreaMax = useCallback(
    (val: string) => {
      setSelectedJeonyongAreaMax(val);
    },
    [setSelectedJeonyongAreaMax],
  );

  const onChangeSelectedIndex = useCallback(
    (val: number) => {
      setSelectedIndex(val);
    },
    [setSelectedIndex],
  );

  const {
    data,
    hasJyb,
    list: realPricesPyoungList,
    isLoading: realPricesPyoungListLoading,
  } = useAPI_DanjiRealPricesPyoungList({
    danjiId: danji?.danji_id,
    realestateType: danji?.type,
    buyOrRent: null,
  });

  const { realpricesChartData, xAxis, realData } = useDanjiRealPricesChart({
    danji,
    buyOrRent,
    selectedYear,
    selectedIndex,
    list: realPricesPyoungList,
    directDealExcluded: checkedBoolean,
  });

  useEffect(() => {
    if (checked.toString() === '1') {
      setCheckedBoolean(true);
    }
    if (checked.toString() === '2') {
      setCheckedBoolean(false);
    }
  }, []);

  useEffect(() => {
    if (checkedBoolean) {
      setChecked('1');
    }

    if (!checkedBoolean) {
      setChecked('2');
    }
  }, [checkedBoolean]);

  useEffect(() => {
    if (selectedArea && selectedJeonyongAreaMax && selectedJeonyongArea) return;

    if (realPricesPyoungList && realPricesPyoungList.length > 0) {
      const index = realPricesPyoungList.findIndex((ele) => ele.default === true);
      if (realPricesPyoungList[index]?.gonggeup_pyoung) {
        setSelectedArea(realPricesPyoungList[index].gonggeup_pyoung.toString());
      }

      if (realPricesPyoungList[index]?.avg_jeonyong) {
        setSelectedJeonyongArea(realPricesPyoungList[index].avg_jeonyong.toString());
      }

      if (realPricesPyoungList[index]?.min_jeonyong) {
        setSelectedJeonyongAreaMin(realPricesPyoungList[index].min_jeonyong.toString());
      }

      if (realPricesPyoungList[index]?.max_jeonyong) {
        setSelectedJeonyongAreaMax(realPricesPyoungList[index].max_jeonyong.toString());
      }

      setSelectedIndex(index);

      setBuyOrRent(data?.buy_or_rent || BuyOrRent.Buy);
    }
  }, [realPricesPyoungListLoading]);

  useEffect(
    () => () => {
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('d-ch');
        sessionStorage.removeItem('d-sl-i');
        sessionStorage.removeItem('d-gr');
        sessionStorage.removeItem('d-br');
        sessionStorage.removeItem('d-yr');
        sessionStorage.removeItem('d-py-l');
        sessionStorage.removeItem('d-jr-m');
        sessionStorage.removeItem('d-jr-min');
        sessionStorage.removeItem('d-jr-max');
        sessionStorage.removeItem('d-jr-s');
      }
    },
    [],
  );

  if (!danji) return null;

  if (selectedIndex === null || !data?.buy_or_rent) return null;

  return (
    <div tw="relative flex flex-col h-full">
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={onClickBackButton} />
        <NavigationHeader.Title>평형별 실거래 내역</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="px-5">
        <RealPriceInfoHeader
          danjiId={danji.danji_id}
          depth={depth}
          buyOrRent={buyOrRent}
          selectedYear={selectedYear}
          onChangeBuyOrRent={onChangeBuyOrRent}
          onChangeSelectedYear={onChangeSelectedYear}
          isMoreButton={false}
        />
      </div>
      <div tw="overflow-auto">
        <DanjiDetailSection.RealPricesPyoungList
          buyOrRent={buyOrRent}
          danjiRealPricesPyoungList={realPricesPyoungList}
          selectedArea={selectedArea}
          selectedJeonyongArea={selectedJeonyongArea}
          selectedIndex={selectedIndex}
          checked={checkedBoolean}
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
                  buyOrRent={buyOrRent}
                  selectedYear={selectedYear}
                  selectedIndex={selectedIndex}
                  realpricesChartData={realpricesChartData}
                  checked={checkedBoolean}
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
          isMorePage
          buyOrRent={buyOrRent}
          selectedGonggeup={selectedArea}
          selectedYear={selectedYear}
          selectedArea={selectedJeonyongArea}
          selectedAreaMin={selectedJeonyongAreaMin}
          selectedAreaMax={selectedJeonyongAreaMax}
          checked={checkedBoolean}
          selectedIndex={selectedIndex}
          danjiRealPricesPyoungList={realPricesPyoungList}
        />
      </div>
    </div>
  );
}
