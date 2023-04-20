/* eslint-disable react-hooks/exhaustive-deps */
import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';

import { useAPI_DanjiRealPricesList } from '@/apis/danji/danjiRealPricesList';
import { useAPI_DanjiRealPricesPyoungList } from '@/apis/danji/danjiRealPricesPyoungList';
import { NavigationHeader } from '@/components/molecules';
import { DanjiDetailSection } from '@/components/organisms';

import RealPriceInfoHeader from '@/components/organisms/DanjiDetail/RealPriceInfoHeader';
import useDanjiRealPricesChart from '@/components/pages/pc/DanjiDetail/useDanjiRealPricesChart';
import { BuyOrRent, Year } from '@/constants/enums';
import { useSessionStorage } from '@/hooks/utils';
import { ParentSize } from '@visx/responsive';
import { useCallback, useEffect, useState } from 'react';
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

  const [selectedJeonyongAreaMax, setSelectedJeonyongAreaMax] = useSessionStorage(
    'd-jr-m',
    sessionStorage.getItem('d-jr-m')?.toString() || '',
  );

  const [selectedJeonyongArea, setSelectedJeonyongArea] = useSessionStorage(
    'd-jr-s',
    sessionStorage.getItem('d-jr-s')?.toString() || '',
  );

  console.log(selectedArea);
  console.log(selectedJeonyongArea);
  console.log(selectedJeonyongAreaMax);

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
    list: realPricesPyoungList,
    isLoading: realPricesPyoungListLoading,
    data,
  } = useAPI_DanjiRealPricesPyoungList({
    pnu: danji?.pnu,
    realestateType: danji?.type,
  });

  const {
    data: realpricesData,
    list: realPricesList,
    setSize,
  } = useAPI_DanjiRealPricesList({
    pnu: danji?.pnu,
    realestateType: danji?.type || null,
    buyOrRent,
    year: selectedYear,
    ps: 10,
    directDealExcluded: checkedBoolean,
    selectedIndex,
    list: realPricesPyoungList,
  });

  const { realpricesChartData, xAxis } = useDanjiRealPricesChart({
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
      if (realPricesPyoungList[index]?.min_jeonyong) {
        setSelectedJeonyongArea(realPricesPyoungList[index].min_jeonyong.toString());
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
        sessionStorage.removeItem('d-jr-m');
        sessionStorage.removeItem('d-jr-s');
        sessionStorage.removeItem('d-sl-i');
        sessionStorage.removeItem('d-gr');
        sessionStorage.removeItem('d-br');
        sessionStorage.removeItem('d-yr');
        sessionStorage.removeItem('d-py-l');
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
          selectedIndex={selectedIndex}
          checked={checkedBoolean}
          onChangeChecked={onChangeChecked}
          onChangeSelectedIndex={onChangeSelectedIndex}
          onChangeSelectedArea={onChangeSelectedArea}
          onChangeSelectedJeonyongArea={onChangeSelectedJeonyongArea}
          onChangeSelectedJeonyongAreaMax={onChangeSelectedJeonyongAreaMax}
        />

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
        <DanjiDetailSection.RealPricesList
          danjiRealPricesListData={realpricesData}
          danjiRealPricesList={realPricesList}
          danjiRealPriesListSetSize={setSize}
          isMorePage
        />
      </div>
    </div>
  );
}
