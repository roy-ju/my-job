import { useRef, MouseEvent, useState } from 'react';

import tw, { styled } from 'twin.macro';

import BoxTab from '@/components/molecules/Tabs/BoxTabs';

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

import { GuideListItem } from '@/services/sub-home/types';

import ScrollContainer from './widget/ScrollContainer';

const Container = styled.div`
  ${tw`relative flex w-full my-5`}
`;

type FilterTabsProps = {
  tab: string;
  tabIndex: number;
  list: GuideListItem[];
  handleChangeTab: (e: NegocioMouseEvent<HTMLButtonElement>, idx: number) => void;
};

export default function FilterTabs({ tab, tabIndex, list, handleChangeTab }: FilterTabsProps) {
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

        scrollRef.current.scrollLeft =
          childOffsetLeft - offsetLeft - scrollRef.current.offsetWidth / 2 + offsetWidth / 2;
      }
    }
  }, [tab, tabIndex]);

  return (
    <Container>
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
    </Container>
  );
}
