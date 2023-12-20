import { memo, useEffect } from 'react';

import tw, { styled } from 'twin.macro';

import { motion } from 'framer-motion';

import useDanjiTabs from '../../hooks/useDanjiTabs';

import { TabIndex } from '../../types';

type DanjiTabProps = { tabIndex: TabIndex; handleTabIndex: (e: React.MouseEvent<HTMLButtonElement>) => void };

const Tab = styled.button`
  ${tw`relative px-5 pt-2.5 pb-3 whitespace-nowrap cursor-pointer flex-1`}
`;

const TabIndicator = styled(motion.div)`
  ${tw`absolute bottom-0 left-[-0px] w-full h-full border-b-2 border-b-gray-1000`}
`;

const Text = styled.p<{ selected: boolean }>`
  ${tw`[text-align: center] w-full text-b2 [line-height: 17px]`}
  ${({ selected }) => (selected ? tw`font-bold text-gray-1000` : tw`font-normal text-gray-600`)}
`;

function DanjiTabs({ tabIndex, handleTabIndex }: DanjiTabProps) {
  const { scrollRef, refs, onDragStart, onDragEnd, onDragMove } = useDanjiTabs();

  useEffect(() => {
    if (refs?.current && scrollRef?.current) {
      const selectedElement = refs.current[tabIndex];

      if (scrollRef.current && selectedElement) {
        const { offsetLeft } = scrollRef.current;
        const { offsetLeft: childOffsetLeft, offsetWidth } = selectedElement;

        scrollRef.current.scrollLeft =
          childOffsetLeft - offsetLeft - scrollRef.current.offsetWidth / 2 + offsetWidth / 2;
      }
    }
  }, [refs, scrollRef, tabIndex]);

  console.log('render');

  return (
    <div id="mob-negocio-danjidetail-tabs" tw="px-3 pt-2 pb-0 sticky bg-white [top: 56px] [z-index: 300]">
      <div
        className="scrollbar-hide"
        tw="flex flex-row items-center overflow-x-auto"
        role="presentation"
        ref={scrollRef}
        onMouseDown={onDragStart}
        onMouseMove={onDragMove}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
      >
        <Tab
          value={0}
          onClick={handleTabIndex}
          ref={(el) => {
            refs.current[0] = el;
            return null;
          }}
        >
          <Text selected={tabIndex === 0}>단지 거래</Text>
          {tabIndex === 0 && <TabIndicator layoutId="danji-tab-indicator" />}
        </Tab>

        <Tab
          value={1}
          onClick={handleTabIndex}
          ref={(el) => {
            refs.current[1] = el;
            return null;
          }}
        >
          <Text selected={tabIndex === 1}>단지 실거래 분석</Text>
          {tabIndex === 1 && <TabIndicator layoutId="danji-tab-indicator" />}
        </Tab>

        <Tab
          value={2}
          onClick={handleTabIndex}
          ref={(el) => {
            refs.current[2] = el;
            return null;
          }}
        >
          <Text selected={tabIndex === 2}>기본 정보</Text>
          {tabIndex === 2 && <TabIndicator layoutId="danji-tab-indicator" />}
        </Tab>

        <Tab
          value={3}
          onClick={handleTabIndex}
          ref={(el) => {
            refs.current[3] = el;
            return null;
          }}
        >
          <Text selected={tabIndex === 3}>학군 및 주변 정보</Text>
          {tabIndex === 3 && <TabIndicator layoutId="danji-tab-indicator" />}
        </Tab>
      </div>
    </div>
  );
}

export default memo(DanjiTabs);
