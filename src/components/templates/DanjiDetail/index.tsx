/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-return-assign */
import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';

import { Loading, Separator } from '@/components/atoms';
import { DanjiDetailSection } from '@/components/organisms';
import tw from 'twin.macro';

import { useRef, useState, MouseEvent, useEffect, useCallback, useMemo } from 'react';
import { useIsomorphicLayoutEffect, useRouter, useScroll } from '@/hooks/utils';

import Routes from '@/router/routes';
import { motion } from 'framer-motion';
import useDanjiInteraction from '@/states/danjiButton';
import DanjiDetailHeader from './Components/DanjiDetailHeader';
import DanjiPhotoHero from './Components/DanjiPhotoHero';
import DanjiRealpriceContainer from './Components/DanjiRealpriceContainer';

interface Props {
  depth: number;
  danji?: GetDanjiDetailResponse;
  isShowTab?: boolean;
  handleMutateDanji?: () => void;
}

export default function DanjiDetail({ depth, danji, isShowTab = true, handleMutateDanji }: Props) {
  const interactStore = useDanjiInteraction({ danjiData: danji });

  const router = useRouter(depth);
  const scrollContainer = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const refs = useRef<any>([]);

  const [listingsSection, setListingsSection] = useState<HTMLDivElement | null>(null);
  const [realPriceSection, setRealPriceSection] = useState<HTMLDivElement | null>(null);
  const [infoSection, setInfoSection] = useState<HTMLDivElement | null>(null);
  const [facilitiesSection, setFacilitiesSection] = useState<HTMLDivElement | null>(null);

  const [isHeaderActive, setIsHeaderActive] = useState(false);
  const [loadingRp, setLoadingRp] = useState(true);

  const [tabIndex, setTabIndex] = useState(0);

  const [isDrag, setIsDrag] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>();

  const [isShowRpTab, setIsShowRpTab] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [bottomReached, setBottomReached] = useState(false);

  const [visibleState, setVisibleState] = useState<Record<string, boolean>>({
    listingsSection: true,
    realPriceSection: false,
    infoSection: false,
    facilitiesSection: false,
  });

  const isShowlistingsSection = useMemo(() => router?.query?.depth2 !== Routes.DanjiListings, [router.query]);

  useScroll(scrollContainer, ({ scrollY }) => {
    setIsHeaderActive(scrollY > 0);
  });

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
    (index: number) => {
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
    },
    [listingsSection, realPriceSection, infoSection, facilitiesSection],
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
      { threshold: 0.1 },
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

    return () => {
      observer.disconnect();
    };
  }, [facilitiesSection, infoSection, listingsSection, realPriceSection]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((item) => {
          const targetID = item.target.id;
          const idPrefix = 'negocio-danjidetail-';

          const { isIntersecting } = item;

          if (targetID === `${idPrefix}bottom`) {
            setBottomReached(isIntersecting);
          }
        });
      },
      { rootMargin: '0px 0px 0px 0px', threshold: 0.1 },
    );

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [loadingRp]);

  useEffect(() => {
    if (!isShowlistingsSection) {
      setVisibleState((prev) => ({
        ...prev,
        listingsSection: false,
      }));
    }
  }, [isShowlistingsSection]);

  useIsomorphicLayoutEffect(
    () => () => {
      interactStore.makeDataReset();
    },
    [],
  );

  useEffect(() => {
    let i = 0;

    if (bottomReached) {
      i = 3;
      setTabIndex(i);
      return;
    }

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
    }
  }, [bottomReached, visibleState]);

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
    <div tw="relative flex flex-col h-full">
      <DanjiDetailHeader danji={danji} isHeaderActive={isHeaderActive} handleMutateDanji={handleMutateDanji} />

      <div tw="flex-1 min-h-0 overflow-y-auto" ref={scrollContainer} id="scroll-container">
        <DanjiPhotoHero danji={danji} depth={depth} />
        {isShowTab && !loadingRp && (
          <div
            id="negocio-danjidetail-tabs"
            tw="pt-2 pb-0 sticky bg-white [top: 56px] [z-index: 100] border-b border-gray-300"
          >
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
              {isShowlistingsSection && (
                <div
                  role="presentation"
                  tw="relative px-5 pt-2.5 pb-3 whitespace-nowrap cursor-pointer"
                  onClick={() => {
                    onClickTab(0);
                  }}
                  ref={(el) => (refs.current[0] = el)}
                >
                  <p
                    tw="[text-align: center] w-full text-b2 [line-height: 17px]"
                    css={[tabIndex === 0 ? tw`font-bold text-gray-1000` : tw`font-normal text-gray-600`]}
                  >
                    단지 매물
                  </p>
                  {tabIndex === 0 && (
                    <motion.div
                      layoutId="danji-tab-indicator"
                      tw="absolute bottom-0 left-[-0px] w-full h-full border-b-2 border-b-gray-1000"
                    />
                  )}
                </div>
              )}

              {isShowRpTab && (
                <div
                  role="presentation"
                  tw="relative px-5 pt-2.5 pb-3 whitespace-nowrap cursor-pointer"
                  onClick={() => {
                    onClickTab(1);
                  }}
                  ref={(el) => (refs.current[1] = el)}
                >
                  <p
                    tw="[text-align: center] w-full text-b2 [line-height: 17px]"
                    css={[tabIndex === 1 ? tw`font-bold text-gray-1000` : tw`font-normal text-gray-600`]}
                  >
                    단지 실거래 분석
                  </p>
                  {tabIndex === 1 && (
                    <motion.div
                      layoutId="danji-tab-indicator"
                      tw="absolute bottom-0 left-[-0px] w-full h-full border-b-2 border-b-gray-1000"
                    />
                  )}
                </div>
              )}

              <div
                role="presentation"
                tw="relative px-5 pt-2.5 pb-3 whitespace-nowrap cursor-pointer"
                onClick={() => {
                  onClickTab(2);
                }}
                ref={(el) => (refs.current[2] = el)}
              >
                <p
                  tw="[text-align: center] w-full text-b2 [line-height: 17px]"
                  css={[tabIndex === 2 ? tw`font-bold text-gray-1000` : tw`font-normal text-gray-600`]}
                >
                  기본 정보
                </p>
                {tabIndex === 2 && (
                  <motion.div
                    layoutId="danji-tab-indicator"
                    tw="absolute bottom-0 left-[0px] w-full h-full border-b-2 border-b-gray-1000"
                  />
                )}
              </div>

              <div
                role="presentation"
                tw="relative px-5 pt-2.5 pb-3 whitespace-nowrap cursor-pointer"
                onClick={() => {
                  onClickTab(3);
                }}
                ref={(el) => (refs.current[3] = el)}
              >
                <p
                  tw="[text-align: center] w-full text-b2 [line-height: 17px]"
                  css={[tabIndex === 3 ? tw`font-bold text-gray-1000` : tw`font-normal text-gray-600`]}
                >
                  학군 및 주변 정보
                </p>
                {tabIndex === 3 && (
                  <motion.div
                    layoutId="danji-tab-indicator"
                    tw="absolute bottom-0 left-[-0px] w-full h-full border-b-2 border-b-gray-1000"
                  />
                )}
              </div>
            </div>
          </div>
        )}

        <DanjiDetailSection>
          {isShowlistingsSection && (
            <div tw="pt-7" id="listingsSection" ref={setListingsSection}>
              <DanjiDetailSection.Info danji={danji} depth={depth} />
              <DanjiDetailSection.ActiveInfo danji={danji} depth={depth} setLoadingListing={() => {}} />
            </div>
          )}

          <div id="realPriceSection" ref={setRealPriceSection}>
            <DanjiRealpriceContainer
              danji={danji}
              depth={depth}
              isShowRpTab={isShowRpTab}
              isShowlistingsSection={isShowlistingsSection}
              // setLoadingRp={() => {}}
              setLoadingRp={setLoadingRp}
              setIsShowRpTab={setIsShowRpTab}
            />
          </div>

          <div id="infoSection" ref={setInfoSection}>
            <Separator tw="w-full [min-height: 8px]" />
            <DanjiDetailSection.DetailInfo danji={danji} />
          </div>

          <div id="facilitiesSection" ref={setFacilitiesSection}>
            <Separator tw="w-full [min-height: 8px]" />
            <DanjiDetailSection.SchoolInfo danji={danji} />
            <Separator tw="w-full [min-height: 8px]" />
            <DanjiDetailSection.AroundInfo danji={danji} />
          </div>
        </DanjiDetailSection>
        <div id="negocio-danjidetail-bottom" ref={bottomRef} style={{ height: '10px' }} />
      </div>
    </div>
  );
}
