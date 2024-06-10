/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';

import { customAlphabet } from 'nanoid';

import { toast } from 'react-toastify';

import { useAPI_DanjiListbySigungu, useAPI_DanjiListbySigunguFirst } from '@/apis/danji/danjiListBySigungu,';

import { useAPI_SidoList, useAPI_SigunguList } from '@/apis/danji/sidoSigunguCode';

import { Button, InfiniteScroll, PersistentBottomBar, Separator } from '@/components/atoms';

import { Dropdown, NavigationHeader } from '@/components/molecules';

import { describeRealestateType, RealestateType } from '@/constants/enums';

import { convertSidoName, convertSigunguName } from '@/utils/fotmat';

import { prefixComparison } from '@/utils/prefix';

import { DanjiDetailResponse } from '@/services/danji/types';

import SelectedItem from './danji-select/SelectedItem';

import ComparisonItem from './danji-select/ComparisonItem';

type ComparisonList = {
  colorCode: string;
  name: string;
  danjiID: number;
  rt: number;
}[];

type ListItemDanji = { name: string; danjiID: number; rt: number };

function convertValueToString(val: string) {
  if (val === '최근 거래일순') {
    return 'date';
  }
  if (val === '평당 거래가순') {
    return 'price';
  }

  if (val === '세대 많은 순') {
    return 'count';
  }

  if (val === '거리순') {
    return 'distance';
  }

  return '';
}

function getInitialColorWidthIndex(index: number) {
  if (index === 0) return '#20C764';
  if (index === 1) return '#EA2323';
  if (index === 2) return '#FFCD4E';
  if (index === 3) return '#4C6EF5';
  return '#7048E8';
}

export default function DanjiSelect({
  danji,
  handleClickBackButton,
  handleClickTradePage,
}: {
  danji?: DanjiDetailResponse;
  depth: number;
  handleClickBackButton: () => void;
  handleClickTradePage: () => void;
}) {
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedSigungu, setSelectedSigungu] = useState('');
  const [selectedRealestateType, setSelectedRealestateType] = useState('');
  const [selectedFilterValue, setSelctedFilterValue] = useState('최근 거래일순');

  const [isfirstIndex, setIsFirstIndex] = useState(false);

  const [selectedSidoCode, setSelectedSidoCode] = useState('');
  const [selectedSigunguCode, setSelectedSigunguCode] = useState('');
  const [selectedRealestateTypeCode, setSelectedRealestateTypeCode] = useState<number>();
  const [comparisonList, setComparisonList] = useState<ComparisonList>([]);
  const [isLastClick, setIsLastClick] = useState(false);
  const [render, setRender] = useState(false);

  const nanoid = customAlphabet('1234567890abcdef', 10);

  const { data: sidoData } = useAPI_SidoList();

  const { data: sigunguData } = useAPI_SigunguList({
    sidoCode: selectedSidoCode,
  });

  const { list, setSize } = useAPI_DanjiListbySigungu({
    danjiId: danji?.danji_id,
    realestateType: danji?.type ? Number(danji.type) : null,
    realestateType2: selectedRealestateTypeCode || null,
    sigunguCode: selectedSigunguCode,
    filter: convertValueToString(selectedFilterValue),
  });

  const { list: danjiList, isLoading: danjiListFirstLoading } = useAPI_DanjiListbySigunguFirst({
    isNotFetch: isLastClick,
    danjiId: danji?.danji_id,
    realestateType: danji?.type ? Number(danji.type) : null,
    realestateType2: selectedRealestateTypeCode || null,
    sigunguCode: selectedSigunguCode,
  });

  const onClickCTA = () => {
    if ((comparisonList && comparisonList.length === 0) || !comparisonList) {
      localStorage.removeItem(prefixComparison);

      setTimeout(() => {
        handleClickBackButton();
      }, 100);
      return;
    }

    if (comparisonList && comparisonList.length > 0) {
      localStorage.setItem(prefixComparison, JSON.stringify(comparisonList));

      setTimeout(() => {
        handleClickTradePage();
      }, 100);
    }
  };

  const onClickDanjiItem = (item: ListItemDanji) => {
    if (comparisonList.length >= 5) {
      toast.error('최대 5개까지 비교할 수 있습니다.', { toastId: 'toastErrorMaximum5' });
      return;
    }

    if (comparisonList.findIndex((ele) => ele.danjiID === item.danjiID) >= 0) {
      toast.error('이미 선택된 항목입니다.', { toastId: 'toastErrorAlreadySelected5' });
      return;
    }

    setComparisonList((prev) => {
      const alreadyIndexArr: string[] = [];

      prev.forEach((ele) => {
        alreadyIndexArr.push(ele.colorCode);
      });

      const filteredArr = ['#20C764', '#EA2323', '#FFCD4E', '#4C6EF5', '#7048E8'].filter(
        (ele) => !alreadyIndexArr.includes(ele),
      );

      return [
        ...prev,
        {
          colorCode: filteredArr[0],
          name: item.name,
          danjiID: item.danjiID,
          rt: item.rt,
        },
      ];
    });
  };

  const removeAllDanji = () => {
    if (comparisonList && comparisonList.length > 0) {
      setIsLastClick(true);
      setComparisonList([]);
      localStorage.removeItem(prefixComparison);
    }
  };

  const removeDanji = (item: ListItemDanji) => {
    if (comparisonList && comparisonList.length > 0) {
      setComparisonList((prev) => {
        if (prev.length === 0) {
          setIsLastClick(true);
          localStorage.removeItem(prefixComparison);
          return [];
        }

        if (localStorage.getItem(prefixComparison)) {
          localStorage.setItem(
            prefixComparison,
            JSON.stringify([...prev].filter((ele: ListItemDanji) => ele.danjiID !== item.danjiID)),
          );
        }

        return [...prev].filter((ele: ListItemDanji) => ele.danjiID !== item.danjiID);
      });
    }
  };

  const onIntersect = useCallback(() => {
    setSize((prev) => prev + 1);
  }, [setSize]);

  useEffect(() => {
    if (danji?.sido_name && danji?.sido_code) {
      setSelectedSidoCode(danji.sido_code);
      setSelectedValue(convertSidoName(danji.sido_name));
    }
  }, [danji?.sido_code, danji?.sido_name]);

  useEffect(() => {
    if (danji?.sigungu_code && danji?.sigungu_name) {
      setSelectedSigunguCode(danji.sigungu_code);
      setSelectedSigungu(convertSigunguName(danji.sigungu_name));
    }
  }, [danji?.sigungu_code, danji?.sigungu_name]);

  useEffect(() => {
    if (danji?.type) {
      const name = describeRealestateType(danji.type);
      setSelectedRealestateType(name);

      if (danji.type === RealestateType.Apartment) {
        setSelectedRealestateTypeCode(RealestateType.Apartment);
      }
      if (danji.type === RealestateType.Officetel) {
        setSelectedRealestateTypeCode(RealestateType.Officetel);
      }
    }
  }, [danji?.type]);

  useEffect(() => {
    if (isfirstIndex && sigunguData?.list) {
      setSelectedSigunguCode(sigunguData?.list[0]?.code);
      setSelectedSigungu(convertSigunguName(sigunguData?.list[0]?.name));
    }
  }, [isfirstIndex, sigunguData?.list]);

  useEffect(() => {
    if (danjiList && danjiList.length > 0 && !isLastClick) {
      const danjiListWithColorCode = danjiList.map((item, index) => ({
        colorCode: getInitialColorWidthIndex(index),
        ...item,
      }));
      setComparisonList(danjiListWithColorCode);
    }
  }, [danjiListFirstLoading, isLastClick, render]);

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
    setRender(true);
  }, []);

  if (!danji || !selectedValue) return null;

  return (
    <div tw="relative flex flex-col h-full">
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={handleClickBackButton} />
        <NavigationHeader.Title>{danji?.name} 비교하기</NavigationHeader.Title>
        {comparisonList && comparisonList.length > 0 && (
          <div>
            <Button
              variant="ghost"
              tw="[text-decoration: underline] text-info [line-height: 16px] pr-0"
              onClick={removeAllDanji}
            >
              초기화
            </Button>
          </div>
        )}
      </NavigationHeader>
      <div tw="pt-6">
        <div tw="flex px-5 gap-2">
          {sidoData?.list && (
            <Dropdown
              tw="min-w-0 h-8 w-[73px]"
              size="small"
              variant="outlined"
              value={selectedValue}
              onChange={(e) => {
                const selectedCode = sidoData.list?.filter((item) => item.name === e)[0]?.code || '';
                setSelectedValue(e);
                setSelectedSidoCode(selectedCode);
                setIsFirstIndex(true);
              }}
            >
              {sidoData.list.map((item) => (
                <Dropdown.OptionSmall tw="min-w-0" key={item.name} value={item.name}>
                  {convertSidoName(item.name)}
                </Dropdown.OptionSmall>
              ))}
            </Dropdown>
          )}
          {sigunguData?.list && (
            <Dropdown
              tw="min-w-0 h-8 w-[126px]"
              size="small"
              variant="outlined"
              value={selectedSigungu}
              onChange={(e) => {
                const selectedCode = sigunguData.list?.filter((item) => item.name === e)[0]?.code || '';
                setSelectedSigungu(e);
                setSelectedSigunguCode(selectedCode);
              }}
            >
              {sigunguData.list.map((item) => (
                <Dropdown.OptionSmall key={item.name} value={item.name} tw="min-w-0">
                  {convertSigunguName(item.name)}
                </Dropdown.OptionSmall>
              ))}
            </Dropdown>
          )}
          <Dropdown
            tw="min-w-0 h-8 w-[100px]"
            size="small"
            variant="outlined"
            value={selectedRealestateType}
            onChange={(e) => {
              setSelectedRealestateType(e);
              if (e === '아파트') {
                setSelectedRealestateTypeCode(RealestateType.Apartment);
              } else if (e === '오피스텔') {
                setSelectedRealestateTypeCode(RealestateType.Officetel);
              }
            }}
          >
            <Dropdown.OptionSmall tw="min-w-0" key="apt" value="아파트">
              아파트
            </Dropdown.OptionSmall>
            <Dropdown.OptionSmall tw="min-w-0" key="officetel" value="오피스텔">
              오피스텔
            </Dropdown.OptionSmall>
          </Dropdown>
        </div>
        <div tw="w-full relative bg-white py-3 pb-7 px-5 gap-1">
          <SelectedItem
            listLength={comparisonList?.length || 0}
            title={danji.name || ''}
            index="#FF542D"
            isDefaultDanji
          />
          {comparisonList &&
            comparisonList.length > 0 &&
            comparisonList.map((item) => (
              <SelectedItem
                item={item}
                title={item.name}
                index={item.colorCode}
                key={item.danjiID}
                removeDanji={removeDanji}
                listLength={comparisonList?.length || 0}
              />
            ))}
          {!comparisonList ||
            (comparisonList.length === 0 && (
              <div tw="[text-align: center]">
                <span tw="text-b2 text-gray-700">비교할 단지를 선택해 주세요.</span>
              </div>
            ))}
        </div>
      </div>

      <Separator tw="min-h-[8px] min-w-[1px] bg-gray-300" />

      <div tw="pt-10 px-5 flex-1 min-h-0 overflow-auto">
        <div tw="flex items-center justify-between">
          <span tw="text-b1 [line-height: 19px] font-bold">단지 선택</span>
          <Dropdown
            tw="min-w-0 h-8 w-[120px]"
            size="small"
            variant="outlined"
            value={selectedFilterValue}
            onChange={(e) => setSelctedFilterValue(e)}
          >
            <Dropdown.OptionSmall tw="min-w-0 w-[120px]" key="recently" value="최근 거래일순">
              최근 거래일 순
            </Dropdown.OptionSmall>
            <Dropdown.OptionSmall tw="min-w-0 w-[120px]" key="pyoung" value="평당 거래가순">
              평당 거래가순
            </Dropdown.OptionSmall>
            <Dropdown.OptionSmall tw="min-w-0 w-[120px]" key="saedae" value="세대 많은 순">
              세대많은 순
            </Dropdown.OptionSmall>
            <Dropdown.OptionSmall tw="min-w-0 w-[120px]" key="distance" value="거리순">
              거리순
            </Dropdown.OptionSmall>
          </Dropdown>
        </div>
        <InfiniteScroll tw="pt-1 flex-1 min-h-0 overflow-auto" onNext={onIntersect}>
          {list &&
            list.length > 0 &&
            list.map((item) => (
              <ComparisonItem
                item={item}
                key={`${item.danji_id}${item.realestate_type}${item.name}${nanoid()}`}
                onClickDanjiItem={onClickDanjiItem}
                selectedBtn={selectedFilterValue}
              />
            ))}
        </InfiniteScroll>
      </div>

      <PersistentBottomBar>
        <Button tw="w-full" size="bigger" onClick={onClickCTA}>
          선택완료
        </Button>
      </PersistentBottomBar>
    </div>
  );
}
