/* eslint-disable react-hooks/exhaustive-deps */

import { useRef, useState, MouseEvent, useMemo, useEffect } from 'react';

import cloneDeep from 'lodash/cloneDeep';

import useMobileDanjiInteraction from '@/states/hooks/useMobileDanjiInteraction';

import { convertedArr, convertedArrForMarker } from '@/utils/danjiAroundInfo';

import { KakaoMapCategoryCode } from '@/lib/kakao/kakao_map_category';

import { searchCategoryGroup, SearchCategoryResponse } from '@/lib/kakao/search_category';

import { DanjiDetailResponse } from '@/services/danji/types';

import { BtnState } from '../types';

export default function useAroundInfoMobileHandler({ danji }: { danji?: DanjiDetailResponse }) {
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

  const [activeIndex, setActiveIndex] = useState<number>(0);

  const [isDrag, setIsDrag] = useState<boolean>(false);

  const [startX, setStartX] = useState<number>();

  const {
    makeTrueAround,
    makeBindDanji,
    makeDanjiAroundDetailDefault,
    makeDanjiAroundAddress,
    makeDanjiAroundLatLng,
    makeDanjiAroundPlace,
  } = useMobileDanjiInteraction();

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

  const handleClickListItem = (addressName: string, placeName: string, x: string | string[], y: string | string[]) => {
    if (typeof x === 'string' && typeof y === 'string') {
      handleClickBtn(addressName, placeName, x, y);
    } else {
      handleClickBtn(addressName, placeName, x[0], y[0]);
    }
  };

  const handleClickMoreButton = () => {
    if (isMoreClick) {
      setIsMoreClick(false);
      setSliceNum(3);
    } else {
      setIsMoreClick(true);
      setSliceNum(convertedCategory.length);
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

  return {
    scrollRef,
    refs,

    onDragStart,
    onDragMove,
    onDragEnd,

    activeCategory,
    catergoryList,
    onClickCategory,

    handleClickBtn,

    nodata,

    convertedMarker,
    convertedCategory,

    handleClickListItem,
    handleClickMoreButton,

    isMoreClick,
    sliceNum,
  };
}
