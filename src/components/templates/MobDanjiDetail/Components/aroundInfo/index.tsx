/* eslint-disable react-hooks/exhaustive-deps */

// import { DanjiAroundMapCard } from '@/components/templates/MobDanjiDetail/Components/DanjiAroundMapCard';

import { useRef, useState, MouseEvent, useMemo, useEffect } from 'react';

import dynamic from 'next/dynamic';

import tw, { styled } from 'twin.macro';

import { v4 as uuid4 } from 'uuid';

import cloneDeep from 'lodash/cloneDeep';

import { Button } from '@/components/atoms';

import NoDataTypeOne from '@/components/organisms/MobDanjiDetail/NoData';

import ConvertArrayToSubwayComponent from '@/components/organisms/MobDanjiDetail/SubwayFormatComponent';

import useMobileDanjiInteraction from '@/states/hooks/useMobileDanjiInteraction';

import { convertedArr, convertedArrForMarker, getAverageDistance } from '@/utils/danjiAroundInfo';

import { KakaoMapCategoryCode } from '@/lib/kakao/kakao_map_category';

import { searchCategoryGroup, SearchCategoryResponse } from '@/lib/kakao/search_category';

import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';

const DanjiAroundMapCard = dynamic(
  () => import('@/components/templates/MobDanjiDetail/Components/DanjiAroundMapCard'),
  { ssr: false },
);

type BtnState = {
  SW8?: boolean;
  HP8?: boolean;
  MT1?: boolean;
  CS2?: boolean;
  BK9?: boolean;
  PO3?: boolean;
};

const buttonList: { id: keyof BtnState; korTitle: string }[] = [
  { id: 'SW8', korTitle: '지하철' },
  { id: 'HP8', korTitle: '병원' },
  { id: 'MT1', korTitle: '마트' },
  { id: 'CS2', korTitle: '편의점' },
  { id: 'BK9', korTitle: '은행' },
  { id: 'PO3', korTitle: '관공서' },
];

const Div = styled.div``;

export default function AroundInfo({ danji }: { danji?: GetDanjiDetailResponse }) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const refs = useRef<any>([]);
  const [catergoryList, setCategoryList] = useState<SearchCategoryResponse['documents']>([]);
  const [markers, setMarkers] = useState<SearchCategoryResponse['documents']>([]);
  const [isMoreClick, setIsMoreClick] = useState(false);
  const [sliceNum, setSliceNum] = useState(3);
  const [update, setUpdate] = useState(false);
  const [nodata, setNodata] = useState<boolean>();
  const [activeCategory, setActiveCategory] = useState<BtnState>({
    HP8: true,
  });
  const {
    makeTrueAround,
    makeBindDanji,
    makeDanjiAroundDetailDefault,
    makeDanjiAroundAddress,
    makeDanjiAroundLatLng,
    makeDanjiAroundPlace,
  } = useMobileDanjiInteraction();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isDrag, setIsDrag] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>();

  const onDragStart = (e: MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;

    e.preventDefault();
    setIsDrag(true);
    setStartX(e.pageX + scrollRef.current.scrollLeft);
  };

  const onDragEnd = () => {
    setIsDrag(false);
  };

  const onDragMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDrag) return;

    if (isDrag && scrollRef.current && startX) {
      const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;

      scrollRef.current.scrollLeft = startX - e.pageX;

      if (scrollLeft === 0) {
        setStartX(e.pageX);
      } else if (scrollWidth <= clientWidth + scrollLeft) {
        setStartX(e.pageX + scrollLeft);
      }
    }
  };

  const convertedCategory = useMemo(() => {
    if (activeCategory.SW8)
      return convertedArr([...catergoryList].sort((a, b) => Number(a.distance) - Number(b.distance)));

    return [...catergoryList].sort((a, b) => Number(a.distance) - Number(b.distance));
  }, [activeCategory, update]);

  const convertedMarker = useMemo(() => {
    if (activeCategory.SW8) {
      return markers;
    }
    return convertedArrForMarker([...markers]);
  }, [update, activeCategory]);

  const onClickCategory = async (id: keyof BtnState, index: number) => {
    setActiveIndex(index);
    setSliceNum(3);
    setIsMoreClick(false);

    if (id === Object.keys(activeCategory)[0]) return;

    setActiveCategory(() => ({ [id]: true }));
    setCategoryList([]);
    setMarkers([]);
  };

  const handleClickBtn = async (address?: string, placeName?: string, lat?: string, lng?: string) => {
    await makeTrueAround();
    makeBindDanji(danji);
    makeDanjiAroundDetailDefault(Object.keys(activeCategory)[0] as keyof BtnState);

    if (address) {
      makeDanjiAroundAddress(address);
    }

    if (placeName) {
      makeDanjiAroundPlace(placeName);
    }

    if (lat && lng) {
      makeDanjiAroundLatLng(lat, lng);
    }
  };

  useEffect(() => {
    const selectedElement = refs.current[activeIndex];

    if (scrollRef.current && selectedElement) {
      const { offsetLeft } = scrollRef.current;
      const { offsetLeft: childOffsetLeft, offsetWidth } = selectedElement;
      scrollRef.current.scrollLeft = childOffsetLeft - offsetLeft - scrollRef.current.offsetWidth / 2 + offsetWidth / 2;
    }
  }, [activeIndex]);

  useEffect(() => {
    let page = 1;

    async function getPlaceData({ x, y, p }: { x?: string; y?: string; p: number }) {
      const response = await searchCategoryGroup({
        category_group_code: Object.keys(activeCategory)[0],
        x,
        y,
        radius: 1000,
        size: 15,
        page: p,
      });

      if (!danji?.lat || !danji?.long) return;

      if (response && response.documents.length === 0) {
        setCategoryList([]);
        setMarkers([]);
        setNodata(true);
        return;
      }

      if (response && response?.documents) {
        setNodata(false);
        const copiedResData = cloneDeep(response.documents);
        const copiedResMarkerData = cloneDeep(response.documents);

        const convertedResData = copiedResData.map((item) => {
          if (item.category_group_code === KakaoMapCategoryCode.SUBWAY) {
            return {
              ...item,
              category_name: item.category_name
                ? item.category_name
                    .replaceAll(/\s/gi, '')
                    .slice(item.category_name.replaceAll(/\s/gi, '').lastIndexOf('>') + 1)
                : item.category_name,
              place_name: item.place_name.indexOf(' ')
                ? item.place_name.slice(0, item.place_name.indexOf(' '))
                : item.place_name,
            };
          }
          return item;
        });

        setCategoryList((prev) => [...prev, ...convertedResData]);
        setMarkers((prev) => [...prev, ...copiedResMarkerData]);
      }

      if (response && !response?.meta.is_end) {
        getPlaceData({
          x: danji.long?.toString(),
          y: danji.lat?.toString(),
          p: (page += 1),
        });
      }

      if (response && response?.meta.is_end) {
        getPlaceData({
          x: danji.long?.toString(),
          y: danji.lat?.toString(),
          p: 0,
        });

        setUpdate(true);
      }
    }

    getPlaceData({
      x: danji?.long?.toString(),
      y: danji?.lat?.toString(),
      p: 1,
    });

    return () => {
      setUpdate(false);
    };
  }, [activeCategory]);

  if (!danji) {
    return null;
  }

  return (
    <div tw="w-full pt-10 pb-10 px-5 [min-height: 590px]">
      <div tw="flex w-full justify-between items-center">
        <span tw="font-bold text-b1 [line-height: 1]">교통 및 주변정보</span>
        <Button size="small" variant="outlined" onClick={() => handleClickBtn()}>
          지도에서 보기
        </Button>
      </div>

      <div
        role="presentation"
        ref={scrollRef}
        onMouseDown={onDragStart}
        onMouseMove={onDragMove}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
        tw="flex items-center [column-gap: 4px] pt-4 pb-4 overflow-x-scroll overflow-y-hidden [-webkit-overflow-scrolling: touch] [padding-right: 1px]"
      >
        {buttonList.map((item, index) => (
          <Button
            variant="outlined"
            size="medium"
            key={item.id}
            id={item.id}
            ref={(element) => {
              refs.current[index] = element;
            }}
            tw="[border-radius: 22px] [scroll-snap-align: center] whitespace-nowrap"
            onClick={() => onClickCategory(item.id, index)}
            selected={activeCategory[item.id]}
          >
            {item.korTitle}
          </Button>
        ))}
      </div>

      <div tw="relative [margin-top: 16px] [margin-bottom: 16px]">
        <DanjiAroundMapCard aroundList={convertedMarker} danji={danji} addressName="" />
      </div>

      {catergoryList.length === 0 &&
        (nodata ? (
          <div tw="mt-11" style={{ minHeight: '9.5125rem' }}>
            <NoDataTypeOne message="다른 주변 정보를 확인해 보세요." />
          </div>
        ) : (
          <div style={{ minWidth: '100%', minHeight: '9.5125rem' }} />
        ))}

      {catergoryList && catergoryList.length > 0 && (
        <div tw="mt-4">
          {convertedCategory.slice(0, sliceNum).map((item, index) => (
            <Div
              tw="flex items-center"
              css={[
                index === 0
                  ? tw`[border-top: 1px solid #F4F6FA] [border-bottom: 1px solid #F4F6FA] px-4 py-[8px]`
                  : tw`[border-bottom: 1px solid #F4F6FA] px-4 py-[8.5px]`,
              ]}
              id={item.id}
              key={`${item.id}-${uuid4()}`}
              onClick={() => {
                if (typeof item.x === 'string' && typeof item.x === 'string') {
                  handleClickBtn(item.address_name, item.place_name, item.x, item.y);
                } else {
                  handleClickBtn(item.address_name, item.place_name, item.x[0], item.y[0]);
                }
              }}
            >
              {activeCategory.SW8 && (
                <ConvertArrayToSubwayComponent
                  categoryGroupName={item.category_name}
                  categoryGroupCode={item.category_group_code}
                />
              )}
              <span tw="ml-2 text-b2">{item.place_name}</span>
              <span tw="text-b2 ml-auto text-gray-1000">{getAverageDistance(item.distance)}m</span>
            </Div>
          ))}
          {convertedCategory.length > 3 &&
            (!isMoreClick ? (
              <Button
                size="medium"
                variant="outlined"
                tw="w-full mt-5"
                onClick={() => {
                  setIsMoreClick(true);
                  setSliceNum(convertedCategory.length);
                }}
              >
                더보기
              </Button>
            ) : (
              <Button
                size="medium"
                variant="outlined"
                tw="w-full mt-5"
                onClick={() => {
                  setIsMoreClick(false);
                  setSliceNum(3);
                }}
              >
                접기
              </Button>
            ))}
        </div>
      )}
    </div>
  );
}
