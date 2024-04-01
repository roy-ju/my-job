import { useRef, MouseEvent, useState, memo, useEffect } from 'react';

import BoxTab from '@/components/molecules/Tabs/BoxTabs';

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

import { GuideListItem } from '@/services/sub-home/types';

import { ScrollContainer, TabsContainer } from './widget/CategoryTabsWidget';

import useCategoryTabs from './hooks/useCategoryTabs';

import { DictElementListItem } from './types';

import { PrefixListElementItemId } from './constants/element_id';

type CategoryTabsProps = {
  list: GuideListItem[];
  middleCategoryList: GuideListItem[];
};

function CategoryTabs({ list, middleCategoryList }: CategoryTabsProps) {
  const [elementsList, setElementsList] = useState<DictElementListItem[]>([]);

  const { tab, tabIndex, handleChangeTab } = useCategoryTabs({ elementsList });

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const refs = useRef<any>([]);

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

  useIsomorphicLayoutEffect(() => {
    if (typeof tab === 'string' && typeof tabIndex === 'number') {
      const selectedElement = refs.current[tabIndex];

      if (scrollRef.current && selectedElement) {
        const { offsetLeft } = scrollRef.current;
        const { offsetLeft: childOffsetLeft, offsetWidth } = selectedElement;

        scrollRef.current.style.scrollBehavior = 'smooth';

        scrollRef.current.scrollLeft =
          childOffsetLeft - offsetLeft - scrollRef.current.offsetWidth / 2 + offsetWidth / 2;

        if (scrollRef?.current) {
          scrollRef.current.style.scrollBehavior = 'auto';
        }
      }
    }
  }, [tab, tabIndex]);

  useEffect(() => {
    list?.forEach((i, idx) => {
      const item = document.getElementById(`${PrefixListElementItemId}-${i.name}`);

      if (item) {
        setElementsList((prev) => [...prev, { name: i.name, element: item, priority: idx + 1 }]);
      }
    });
  }, [list]);

  return (
    <TabsContainer tw="mb-4">
      <ScrollContainer
        ref={scrollRef}
        className="scrollbar-hide"
        role="presentation"
        onMouseDown={onDragStart}
        onMouseMove={onDragMove}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
      >
        {middleCategoryList?.map((item, idx) => (
          <BoxTab
            id={`negocio-middle-category-list-${item.name}`}
            key={item.name}
            selected={tab === item.name}
            value={item.name}
            tw="[min-width: 45px] text-center"
            ref={(el) => {
              refs.current[idx] = el;
              return null;
            }}
            onClick={(e) => handleChangeTab(e, idx)}
          >
            {item.name}
          </BoxTab>
        ))}
      </ScrollContainer>
    </TabsContainer>
  );
}

export default memo(CategoryTabs);
