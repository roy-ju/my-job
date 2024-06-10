import React, { memo } from 'react';

import { CompositedTab, ScrollContainer, TabsContainer } from './widget/TabsWidget';

import { CommonDanjiDetailProps } from '../types';

import useScrollTabsMobile from './hooks/useScrollTabsMobile';

interface TabsProps extends CommonDanjiDetailProps {
  tabIndex: number;
  showRealPriceTab: boolean;
  loadingRealprice: boolean;
  handleClickTab: (e: NegocioMouseEvent<HTMLButtonElement>) => void;
}

function Tabs({ danji, tabIndex, showRealPriceTab, loadingRealprice, handleClickTab }: TabsProps) {
  const { scrollRef, refs, onDragStart, onDragEnd, onDragMove } = useScrollTabsMobile({ danji, tabIndex });

  return (
    <TabsContainer id="mob-negocio-danjidetail-tabs">
      <ScrollContainer
        className="scrollbar-hide"
        role="presentation"
        ref={scrollRef}
        onMouseDown={onDragStart}
        onMouseMove={onDragMove}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
      >
        <CompositedTab>
          <CompositedTab.Button
            value={0}
            onClick={handleClickTab}
            ref={(el) => {
              refs.current[0] = el;
              return null;
            }}
          >
            <CompositedTab.Text selected={tabIndex === 0}>단지 거래</CompositedTab.Text>
            {tabIndex === 0 && <CompositedTab.Indicator layoutId="danji-tab-indicator" />}
          </CompositedTab.Button>
        </CompositedTab>

        {showRealPriceTab && !loadingRealprice && (
          <CompositedTab>
            <CompositedTab.Button
              value={1}
              onClick={handleClickTab}
              ref={(el) => {
                refs.current[1] = el;
                return null;
              }}
            >
              <CompositedTab.Text selected={tabIndex === 1}>단지 실거래 분석</CompositedTab.Text>
              {tabIndex === 1 && <CompositedTab.Indicator layoutId="danji-tab-indicator" />}
            </CompositedTab.Button>
          </CompositedTab>
        )}

        <CompositedTab>
          <CompositedTab.Button
            value={2}
            onClick={handleClickTab}
            ref={(el) => {
              refs.current[2] = el;
              return null;
            }}
          >
            <CompositedTab.Text selected={tabIndex === 2}>기본 정보</CompositedTab.Text>
            {tabIndex === 2 && <CompositedTab.Indicator layoutId="danji-tab-indicator" />}
          </CompositedTab.Button>
        </CompositedTab>

        <CompositedTab>
          <CompositedTab.Button
            value={3}
            onClick={handleClickTab}
            ref={(el) => {
              refs.current[3] = el;
              return null;
            }}
          >
            <CompositedTab.Text selected={tabIndex === 3}>학군 및 주변 정보</CompositedTab.Text>
            {tabIndex === 3 && <CompositedTab.Indicator layoutId="danji-tab-indicator" />}
          </CompositedTab.Button>
        </CompositedTab>

        <CompositedTab>
          <CompositedTab.Button
            value={4}
            onClick={handleClickTab}
            ref={(el) => {
              refs.current[4] = el;
              return null;
            }}
          >
            <CompositedTab.Text selected={tabIndex === 4}>단지 뉴스</CompositedTab.Text>
            {tabIndex === 4 && <CompositedTab.Indicator layoutId="danji-tab-indicator" />}
          </CompositedTab.Button>
        </CompositedTab>
      </ScrollContainer>
    </TabsContainer>
  );
}

export default memo(Tabs);
