/* eslint-disable react-hooks/exhaustive-deps */

import { useRef, useState, MouseEvent, useEffect } from 'react';

import { ConvertedCategoryType } from '../types';

export default function useScrollTabs({
  isClick,

  activeIndex,
  tableIndex,

  addressName,
  placeName,

  convertedCategory,
}: {
  isClick: boolean;

  activeIndex: any;
  tableIndex?: number;

  addressName: string;
  placeName: string;

  convertedCategory: ConvertedCategoryType;
}) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const refs = useRef<any>([]);

  const listRefs = useRef<any>([]);

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

  useEffect(() => {
    if (activeIndex) {
      const selectedElement = refs.current[activeIndex];

      if (scrollRef.current && selectedElement) {
        const { offsetLeft } = scrollRef.current;
        const { offsetLeft: childOffsetLeft, offsetWidth } = selectedElement;
        scrollRef.current.scrollLeft =
          childOffsetLeft - offsetLeft - scrollRef.current.offsetWidth / 2 + offsetWidth / 2;
      }
    }
  }, [activeIndex]);

  useEffect(() => {
    if (listRefs?.current && typeof tableIndex === 'number') {
      if (tableIndex >= 0) {
        listRefs.current[tableIndex].scrollIntoView(true);
      }
    }
  }, [isClick, listRefs?.current, addressName, tableIndex]);

  useEffect(() => {
    if (placeName && listRefs?.current) {
      const firstIndex = convertedCategory.findIndex((item) => item.place_name === placeName);
      if (firstIndex >= 0) {
        listRefs.current[firstIndex].scrollIntoView(true);
        return;
      }
    }

    if (addressName && listRefs?.current) {
      const firstIndex = convertedCategory.findIndex((item) => item.address_name === addressName);
      if (firstIndex >= 0) {
        listRefs.current[firstIndex].scrollIntoView(true);
      }
    }
  }, [addressName, placeName, listRefs?.current, convertedCategory]);

  return { scrollRef, refs, listRefs, isDrag, startX, onDragStart, onDragEnd, onDragMove };
}
