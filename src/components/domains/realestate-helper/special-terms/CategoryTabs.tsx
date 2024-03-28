import { useRef, MouseEvent, useState, memo, useEffect, RefObject } from 'react';

import tw from 'twin.macro';

import BoxTab from '@/components/molecules/Tabs/BoxTabs';

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

// import useStickyState from '@/hooks/useStickyState';

import { ScrollContainer, TabsContainer } from './widget/SpecialTermsWidget';

import { MiddleCategory, SmallCategory, TermsElementListItem } from './types';

import useCategoryTabs from './hooks/useCategoryTabs';

import { PrefixListElementItemId } from './constants/element_id';

type CategoryTabsProps = {
  buyOrRent: number;
  categoryTablist: {
    title: MiddleCategory;
    subTitle: SmallCategory;
  }[];
  list: string[];
  containerRef: RefObject<HTMLDivElement>;
};

function CategoryTabs({ buyOrRent, categoryTablist, list, containerRef }: CategoryTabsProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const refs = useRef<any>([]);

  const [isDrag, setIsDrag] = useState<boolean>(false);

  const [startX, setStartX] = useState<number>();

  const [elementsList, setElementsList] = useState<TermsElementListItem[]>([]);

  const { tab, tabIndex, handleChangeTab } = useCategoryTabs({
    elementsList,
    containerRef,
    buyOrRent,
  });

  // const [ref, isSticky] = useStickyState({ containerRef, stickyThreshold: 113 });

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
    setElementsList([]);

    categoryTablist?.forEach((i, idx) => {
      const item = document.getElementById(`${PrefixListElementItemId}-${i.title}`);

      if (item) {
        setElementsList((prevList) => [...prevList, { name: i.title, element: item, priority: idx + 1 }]);
      }
    });
  }, [buyOrRent, categoryTablist]);

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

  return (
    <TabsContainer css={[tw`py-4`]} id="negocio-special-terms-tabs-container">
      <ScrollContainer
        ref={scrollRef}
        className="scrollbar-hide"
        role="presentation"
        onMouseDown={onDragStart}
        onMouseMove={onDragMove}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
      >
        {list?.map((item, idx) => (
          <BoxTab
            key={item}
            selected={tab === item}
            value={item}
            tw="text-center"
            ref={(el) => {
              refs.current[idx] = el;
              return null;
            }}
            onClick={(e) => handleChangeTab(e, idx)}
          >
            {item}
          </BoxTab>
        ))}
      </ScrollContainer>
    </TabsContainer>
  );
}

export default memo(CategoryTabs);
