import { useRef, MouseEvent, useState, memo } from 'react';

import BoxTab from '@/components/molecules/Tabs/BoxTabs';

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

import { GuideListItem } from '@/services/sub-home/types';

import { ScrollContainer, TabsContainer } from './widget/CategoryTabsWidget';

type CategoryTabsProps = {
  tab: string;
  tabIndex: number;
  list: GuideListItem[];
  handleChangeTab: (e: NegocioMouseEvent<HTMLButtonElement>, idx: number) => void;
};

function CategoryTabs({ tab, tabIndex, list, handleChangeTab }: CategoryTabsProps) {
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

  return (
    <TabsContainer>
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
