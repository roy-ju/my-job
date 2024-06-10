/* eslint-disable react-hooks/exhaustive-deps */

import { useRef, useState, MouseEvent, useMemo, useEffect } from 'react';

import { useRecoilValue } from 'recoil';

import cloneDeep from 'lodash/cloneDeep';

import { convertedArr, convertedArrForMarker } from '@/utils/danjiAroundInfo';

import { KakaoMapCategoryCode } from '@/lib/kakao/kakao_map_category';

import { searchCategoryGroup, SearchCategoryResponse } from '@/lib/kakao/search_category';

import { DanjiDetailResponse } from '@/services/danji/types';

import useDanjiInteraction from '@/states/hooks/useDanjiInteraction';

import danjiInteractionAtom from '@/states/atom/danjiInteraction';

import { BtnState } from '../types';

export default function useAroundInfoPcHandler({ danji }: { danji?: DanjiDetailResponse }) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const refs = useRef<any>([]);

  const listRefs = useRef<any>([]);

  const interactionState = useRecoilValue(danjiInteractionAtom);

  const interactionStore = useDanjiInteraction({ danjiData: danji });

  const [catergoryList, setCategoryList] = useState<SearchCategoryResponse['documents']>([]);

  const [markers, setMarkers] = useState<SearchCategoryResponse['documents']>([]);

  const [isMoreClick, setIsMoreClick] = useState(false);

  const [sliceNum, setSliceNum] = useState(3);

  const [update, setUpdate] = useState(false);

  const [nodata, setNodata] = useState<boolean>();

  const [activeCategory, setActiveCategory] = useState<BtnState>({
    HP8: true,
  });

  const [selectedIndex, setSelctedIndex] = useState<number>();

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

  const handleClickBtn = () => {
    if (interactionState.around) {
      interactionStore.makeAroundOff();
      interactionStore.makeDanjiAroundPlaceName('');
    } else {
      interactionStore.makeSchoolOff();
      interactionStore.makeSelectedSchoolMarkerDefault();

      interactionStore.makeAroundOn();
      interactionStore.makeAroundMarker(convertedMarker);
    }
  };

  const onClickCategory = async (id: keyof BtnState, index: number) => {
    setActiveIndex(index);
    setSliceNum(3);
    setIsMoreClick(false);
    setSelctedIndex(undefined);

    interactionStore.makeCategory(id as string);
    interactionStore.makeSelectedAroundMarkerDefault();
    interactionStore.makeSelectedAroundDefault();

    if (id === Object.keys(activeCategory)[0]) return;

    setActiveCategory(() => ({ [id]: true }));
    setCategoryList([]);
    setMarkers([]);
  };

  const handleClickListItem = (id: string, placeName: string, address: string) => {
    if (!interactionState.around) {
      interactionStore.makeAroundOn();
      interactionStore.makeAroundMarker(convertedMarker);
      interactionStore.makeSchoolOff();
      interactionStore.makeSelectedSchoolMarkerDefault();
    }

    interactionStore.makeDanjiAroundPlaceName(placeName);

    setTimeout(() => {
      interactionStore.makeSelectedAround(`aroundMarker:${id}`, address);
    }, 200);
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
    if (convertedMarker) {
      interactionStore.makeAroundMarker(convertedMarker);
    }
  }, [activeCategory, update]);

  useEffect(() => {
    const scrollContainer = document.getElementById('scroll-container');

    if (listRefs?.current && typeof selectedIndex === 'number' && scrollContainer) {
      // listRefs?.current[selectedIndex]?.scrollIntoView({ behavior: 'smooth', block: 'middle', inline: 'nearest' });
      const height = listRefs?.current[selectedIndex]?.getBoundingClientRect().top ?? 0;

      scrollContainer.scrollBy({
        top: height - 450,
        behavior: 'smooth',
      });
    }
  }, [selectedIndex, convertedCategory, listRefs?.current]);

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

  const convertPlaceName = ({ category, name }: { category?: string; name?: string }) => {
    if (!name) return '';

    if (category === KakaoMapCategoryCode.SUBWAY) {
      const index = name.indexOf('역');
      return name.slice(0, index + 1);
    }

    return name;
  };

  useEffect(() => {
    if (convertedCategory && convertedCategory.length > 0 && interactionState.selectedAroundMarker) {
      const index = convertedCategory.findIndex(
        (item) =>
          item.address_name === interactionState?.selectedAroundMarker?.addressName ||
          `aroundMarker:${item.id}` === interactionState?.selectedAroundMarker?.id,
      );

      if (index === -1) {
        const anotherIndex = convertedCategory.findIndex(
          (item) =>
            convertPlaceName({ category: item.category_group_code, name: item.place_name }) ===
            convertPlaceName({
              category: interactionState.selectedAroundMarker?.type,
              name:
                typeof interactionState.selectedAroundMarker?.place === 'string'
                  ? interactionState.selectedAroundMarker?.place
                  : interactionState?.selectedAroundMarker?.place
                  ? interactionState?.selectedAroundMarker?.place[0]
                  : '',
            }),
        );

        setSelctedIndex(anotherIndex);
        if (anotherIndex > 2) {
          setSliceNum(convertedCategory.length);
        }
      } else {
        setSelctedIndex(index);
        if (index > 2) {
          setSliceNum(convertedCategory.length);
        }
      }
    }
  }, [interactionState.selectedAroundMarker, convertedCategory]);

  useEffect(() => {
    if (typeof selectedIndex === 'number' && selectedIndex > 2) {
      setIsMoreClick(true);
    }
  }, [selectedIndex]);

  return {
    interactionState,

    scrollRef,
    listRefs,
    refs,

    onDragStart,
    onDragMove,
    onDragEnd,

    activeCategory,
    catergoryList,
    onClickCategory,

    handleClickBtn,

    nodata,

    convertedCategory,
    convertPlaceName,

    handleClickListItem,
    handleClickMoreButton,

    isMoreClick,
    sliceNum,
  };
}
