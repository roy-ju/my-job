import React, { useState, memo, useEffect, useRef, MouseEvent } from 'react';

import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';

import { DanjiTab } from '@/components/organisms/DanjiDetail/DanjiTabs';

type MobDanjiTabProps = {
  danji: GetDanjiDetailResponse;
  tabIndex: number;
  isShowTab: boolean;
  isShowRpTab: boolean;
  loadingRp: boolean;
  onClickTab: (e: NegocioMouseEvent<HTMLButtonElement>) => void;
};

const MobDanjiTab = ({ danji, tabIndex, isShowTab, loadingRp, isShowRpTab, onClickTab }: MobDanjiTabProps) => {
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

  useEffect(() => {
    if (typeof tabIndex === 'number' && danji) {
      const selectedElement = refs.current[tabIndex];

      if (scrollRef.current && selectedElement) {
        const { offsetLeft } = scrollRef.current;
        const { offsetLeft: childOffsetLeft, offsetWidth } = selectedElement;

        scrollRef.current.scrollLeft =
          childOffsetLeft - offsetLeft - scrollRef.current.offsetWidth / 2 + offsetWidth / 2;
      }
    }
  }, [danji, tabIndex]);

  if (!isShowTab || loadingRp) return null;

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
        <DanjiTab>
          <DanjiTab.Tab
            value={0}
            onClick={onClickTab}
            ref={(el) => {
              refs.current[0] = el;
              return null;
            }}
          >
            <DanjiTab.Text selected={tabIndex === 0}>단지 거래</DanjiTab.Text>
            {tabIndex === 0 && <DanjiTab.Indicator layoutId="danji-tab-indicator" />}
          </DanjiTab.Tab>
        </DanjiTab>

        {isShowRpTab && (
          <DanjiTab>
            <DanjiTab.Tab
              value={1}
              onClick={onClickTab}
              ref={(el) => {
                refs.current[1] = el;
                return null;
              }}
            >
              <DanjiTab.Text selected={tabIndex === 1}>단지 실거래 분석</DanjiTab.Text>
              {tabIndex === 1 && <DanjiTab.Indicator layoutId="danji-tab-indicator" />}
            </DanjiTab.Tab>
          </DanjiTab>
        )}

        <DanjiTab>
          <DanjiTab.Tab
            value={2}
            onClick={onClickTab}
            ref={(el) => {
              refs.current[2] = el;
              return null;
            }}
          >
            <DanjiTab.Text selected={tabIndex === 2}>기본 정보</DanjiTab.Text>
            {tabIndex === 2 && <DanjiTab.Indicator layoutId="danji-tab-indicator" />}
          </DanjiTab.Tab>
        </DanjiTab>

        <DanjiTab>
          <DanjiTab.Tab
            value={3}
            onClick={onClickTab}
            ref={(el) => {
              refs.current[3] = el;
              return null;
            }}
          >
            <DanjiTab.Text selected={tabIndex === 3}>학군 및 주변 정보</DanjiTab.Text>
            {tabIndex === 3 && <DanjiTab.Indicator layoutId="danji-tab-indicator" />}
          </DanjiTab.Tab>
        </DanjiTab>

        <DanjiTab>
          <DanjiTab.Tab
            value={4}
            onClick={onClickTab}
            ref={(el) => {
              refs.current[4] = el;
              return null;
            }}
          >
            <DanjiTab.Text selected={tabIndex === 4}>단지 뉴스</DanjiTab.Text>
            {tabIndex === 4 && <DanjiTab.Indicator layoutId="danji-tab-indicator" />}
          </DanjiTab.Tab>
        </DanjiTab>
      </div>
    </div>
  );
};

export default memo(MobDanjiTab);
