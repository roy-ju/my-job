/* eslint-disable no-return-assign */
import { useRef, useState, MouseEvent, useCallback, useEffect } from 'react';

import { useRouter } from 'next/router';

import { Loading, Separator } from '@/components/atoms';

import { MobDanjiDetailSection } from '@/components/organisms';

import { DanjiTab } from '@/components/organisms/DanjiDetail/DanjiTabs';

import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';

import { useScroll } from '@/hooks/utils';

import { describeRealestateType } from '@/constants/enums';

import News from '@/components/organisms/News';

import MobDanjiDetailHeader from './Components/MobDanjiDetailHeader';

import MobDanjiPhotoHero from './Components/MobDanjiPhotoHero';

import MobDanjiRealpriceContainer from './Components/MobDanjiRealpriceContainer';

interface Props {
  danji?: GetDanjiDetailResponse;
  isShowTab?: boolean;
  handleMutateDanji?: () => void;
}

export default function MobDanjiDetail({ danji, isShowTab = true, handleMutateDanji }: Props) {
  const router = useRouter();
  const scrollContainer = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const refs = useRef<any>([]);

  const [listingsSection, setListingsSection] = useState<HTMLDivElement | null>(null);
  const [realPriceSection, setRealPriceSection] = useState<HTMLDivElement | null>(null);
  const [infoSection, setInfoSection] = useState<HTMLDivElement | null>(null);
  const [facilitiesSection, setFacilitiesSection] = useState<HTMLDivElement | null>(null);
  const [newsSection, setNewsSection] = useState<HTMLDivElement | null>(null);

  const [isHeaderActive, setIsHeaderActive] = useState(false);

  const [loadingRp, setLoadingRp] = useState(true);
  const [isShowRpTab, setIsShowRpTab] = useState(false);

  const [tabIndex, setTabIndex] = useState(0);

  const [isDrag, setIsDrag] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>();

  const [visibleState, setVisibleState] = useState<Record<string, boolean>>({
    listingsSection: true,
    realPriceSection: false,
    infoSection: false,
    facilitiesSection: false,
    newsSection: false,
  });

  useScroll(scrollContainer, ({ scrollY }) => {
    setIsHeaderActive(scrollY > 0);
  });

  const onClickBack = () => {
    router.back();
  };

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

  const onClickTab = useCallback(
    (e: NegocioMouseEvent<HTMLButtonElement>) => {
      const index = Number(e.currentTarget.value);

      if (index === 0) {
        scrollContainer.current?.scrollBy({
          top: (listingsSection?.getBoundingClientRect()?.top ?? 0) - 103,
          behavior: 'smooth',
        });
      }

      if (index === 1) {
        scrollContainer.current?.scrollBy({
          top: (realPriceSection?.getBoundingClientRect()?.top ?? 0) - 103,
          behavior: 'smooth',
        });
      }

      if (index === 2) {
        scrollContainer.current?.scrollBy({
          top: (infoSection?.getBoundingClientRect()?.top ?? 0) - 103,
          behavior: 'smooth',
        });
      }

      if (index === 3) {
        scrollContainer.current?.scrollBy({
          top: (facilitiesSection?.getBoundingClientRect()?.top ?? 0) - 103,
          behavior: 'smooth',
        });
      }

      if (index === 4) {
        scrollContainer.current?.scrollBy({
          top: (newsSection?.getBoundingClientRect()?.top ?? 0) - 103,
          behavior: 'smooth',
        });
      }
    },
    [listingsSection, realPriceSection, infoSection, facilitiesSection, newsSection],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setVisibleState((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      { rootMargin: '-104px 0px -104px 0px', threshold: 0.1 },
    );

    if (listingsSection) {
      observer.observe(listingsSection);
    }

    if (realPriceSection) {
      observer.observe(realPriceSection);
    }

    if (infoSection) {
      observer.observe(infoSection);
    }

    if (facilitiesSection) {
      observer.observe(facilitiesSection);
    }

    if (newsSection) {
      observer.observe(newsSection);
    }

    return () => {
      observer.disconnect();
    };
  }, [facilitiesSection, infoSection, listingsSection, realPriceSection, newsSection]);

  useEffect(() => {
    let i = 0;

    if (visibleState.listingsSection === true) {
      i = 0;
      setTabIndex(i);
    } else if (visibleState.realPriceSection === true) {
      i = 1;
      setTabIndex(i);
    } else if (visibleState.infoSection === true) {
      i = 2;
      setTabIndex(i);
    } else if (visibleState.facilitiesSection === true) {
      i = 3;
      setTabIndex(i);
    } else if (visibleState.newsSection === true) {
      i = 4;
      setTabIndex(i);
    }
  }, [visibleState]);

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

  if (!danji)
    return (
      <div tw="py-20">
        <Loading />
      </div>
    );

  return (
    <>
      <div tw="relative w-full flex flex-col h-full overflow-x-hidden">
        <div tw="[z-index: 500]">
          <MobDanjiDetailHeader
            danji={danji}
            isHeaderActive={isHeaderActive}
            onClickBack={onClickBack}
            handleMutateDanji={handleMutateDanji}
          />
        </div>
        <div tw="flex-1 min-h-0 overflow-y-auto" ref={scrollContainer} id="scroll-container">
          <MobDanjiPhotoHero danji={danji} />
          {isShowTab && !loadingRp && (
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
          )}

          <MobDanjiDetailSection>
            <div tw="pt-7" id="listingsSection" ref={setListingsSection}>
              <MobDanjiDetailSection.Info danji={danji} />
              <MobDanjiDetailSection.ActiveInfo danji={danji} tabIndex={tabIndex} />
            </div>

            <div id="realPriceSection" ref={setRealPriceSection}>
              <MobDanjiRealpriceContainer
                danji={danji}
                isShowRpTab={isShowRpTab}
                setLoadingRp={setLoadingRp}
                setIsShowRpTab={setIsShowRpTab}
              />
            </div>

            <div id="infoSection" ref={setInfoSection}>
              <Separator tw="w-full [min-height: 8px]" />
              <MobDanjiDetailSection.DetailInfo danji={danji} />
            </div>

            <div id="facilitiesSection" ref={setFacilitiesSection}>
              <Separator tw="w-full [min-height: 8px]" />
              <MobDanjiDetailSection.SchoolInfo danji={danji} />
              <Separator tw="w-full [min-height: 8px]" />
              <MobDanjiDetailSection.AroundInfo danji={danji} />
              <div tw="[min-height: 80px] w-full" />
            </div>

            <div id="newsSection" ref={setNewsSection}>
              <Separator tw="w-full [min-height: 8px]" />
              <News.ColumnType
                query={`${danji.name} ${describeRealestateType(danji.type)}`}
                query2={`${danji.sigungu_name} 부동산`}
              />
            </div>
          </MobDanjiDetailSection>
        </div>
      </div>
    </>
  );
}
