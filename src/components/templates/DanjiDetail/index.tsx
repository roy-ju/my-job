/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';

import { Loading, Separator } from '@/components/atoms';
import { DanjiDetailSection } from '@/components/organisms';
import tw from 'twin.macro';

import { useRef, useState, MouseEvent, useEffect, useCallback } from 'react';
import { useScroll } from '@/hooks/utils';

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
  const scrollContainer = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const refs = useRef<any>([]);

  const basicContainerRef = useRef<HTMLDivElement | null>(null);
  const realPriceContainerRef = useRef<HTMLDivElement | null>(null);
  const basicDetailContainerRef = useRef<HTMLDivElement | null>(null);
  const danjiSchoolContainerRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const [basicInfoVisible, setBasicInfoVisible] = useState(true);
  const [realPriceVisible, setRealPriceVisible] = useState(false);
  const [detailInfoVisible, setDetailInfoVisible] = useState(false);
  const [schoolInfoVisible, setSchoolInfoVisible] = useState(false);
  const [bottomReached, setBottomReached] = useState(false);

  const [isHeaderActive, setIsHeaderActive] = useState(false);

  const [activeTab, setActiveTab] = useState(1);
  const [isDrag, setIsDrag] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>();

  const [loadingListing, setLoadingListing] = useState(true);
  const [loadingRp, setLoadingRp] = useState(true);
  const [loadingSchool, setLoadingSchool] = useState(true);
  const [isShowRpTab, setIsShowRpTab] = useState(false);

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

  const calculateOffsetTop = useCallback(() => {
    const headerElement = document.getElementById('negocio-header');
    const tabsElement = document.getElementById('negocio-danjidetail-tabs');

    let headerHeight = 0;
    let tabsHeight = 0;

    if (headerElement && tabsElement) {
      headerHeight = headerElement.getBoundingClientRect().height;
      tabsHeight = tabsElement.getBoundingClientRect().height;
    }

    return headerHeight + tabsHeight;
  }, []);

  const onClickTab = useCallback(
    (index: number) => {
      if (!isShowTab) return;

      if (!danji) return;

      if (index === activeTab) return;

      const offsetTop = calculateOffsetTop();

      if (index === 1 && basicContainerRef.current && scrollContainer.current) {
        const elementPosition = basicContainerRef.current.offsetTop;
        const offsetPosition = elementPosition + scrollContainer.current.scrollTop - offsetTop;
        scrollContainer.current.scrollTo({ top: offsetPosition });
      } else if (index === 2 && realPriceContainerRef.current && scrollContainer.current) {
        const elementPosition = realPriceContainerRef.current.offsetTop;
        const offsetPosition = elementPosition + scrollContainer.current.scrollTop - offsetTop;
        scrollContainer.current.scrollTo({ top: offsetPosition });
      } else if (index === 3 && basicDetailContainerRef.current && scrollContainer.current) {
        const elementPosition = basicDetailContainerRef.current.offsetTop;
        const offsetPosition = elementPosition + scrollContainer.current.scrollTop - offsetTop;
        scrollContainer.current.scrollTo({ top: offsetPosition });
      } else if (index === 4 && danjiSchoolContainerRef.current && scrollContainer.current) {
        const elementPosition = danjiSchoolContainerRef.current.offsetTop;
        const offsetPosition = elementPosition + scrollContainer.current.scrollTop - offsetTop;
        scrollContainer.current.scrollTo({ top: offsetPosition });
      }
    },
    [activeTab, calculateOffsetTop, danji, isShowTab],
  );

  useEffect(() => {
    if (typeof activeTab === 'number' && danji) {
      const selectedElement = refs.current[activeTab];

      if (scrollRef.current && selectedElement) {
        const { offsetLeft } = scrollRef.current;
        const { offsetLeft: childOffsetLeft, offsetWidth } = selectedElement;

        scrollRef.current.scrollLeft =
          childOffsetLeft - offsetLeft - scrollRef.current.offsetWidth / 2 + offsetWidth / 2;
      }
    }
  }, [danji, activeTab]);

  useEffect(() => {
    if (!isShowTab) return;

    const cb: IntersectionObserverCallback = (entries) => {
      entries.forEach((item) => {
        const targetID = item.target.id;
        const idPrefix = 'negocio-danjidetail-';
        const { isIntersecting } = item;

        if (targetID === `${idPrefix}bi`) {
          setBasicInfoVisible(isIntersecting);
        } else if (targetID === `${idPrefix}rp`) {
          setRealPriceVisible(isIntersecting);
        } else if (targetID === `${idPrefix}bid`) {
          setDetailInfoVisible(isIntersecting);
        } else if (targetID === `${idPrefix}sc`) {
          setSchoolInfoVisible(isIntersecting);
        } else if (targetID === `${idPrefix}bottom`) {
          setBottomReached(isIntersecting);
        }
      });
    };

    const observer = new IntersectionObserver(cb, {
      rootMargin: `-120px 0px -120px 0px`,
      threshold: 0.1,
    });

    const observerBottom = new IntersectionObserver(cb, {
      rootMargin: `0px 0px 0px 0px`,
      threshold: 0.1,
    });

    if (basicContainerRef.current) {
      observer.observe(basicContainerRef.current);
    }

    if (realPriceContainerRef.current) {
      observer.observe(realPriceContainerRef.current);
    }

    if (basicDetailContainerRef.current) {
      observer.observe(basicDetailContainerRef.current);
    }

    if (danjiSchoolContainerRef.current) {
      observer.observe(danjiSchoolContainerRef.current);
    }

    if (bottomRef.current) {
      observerBottom.observe(bottomRef.current);
    }

    return () => {
      observer.disconnect();
      observerBottom.disconnect();
    };
  }, [isShowTab]);

  useEffect(() => {
    if (!isShowTab) return;

    if (bottomReached) {
      setActiveTab(4);
      return;
    }

    if (basicInfoVisible) {
      setActiveTab(1);
    } else if (realPriceVisible) {
      setActiveTab(2);
    } else if (detailInfoVisible) {
      setActiveTab(3);
    } else if (schoolInfoVisible) {
      setActiveTab(4);
    }
  }, [basicInfoVisible, bottomReached, detailInfoVisible, isShowTab, realPriceVisible, schoolInfoVisible]);

  if (!danji)
    return (
      <div tw="py-20">
        <Loading />
      </div>
    );

  return (
    <div tw="relative flex flex-col h-full">
      <DanjiDetailHeader danji={danji} isHeaderActive={isHeaderActive} handleMutateDanji={handleMutateDanji} />
      <div tw="overflow-y-auto" ref={scrollContainer}>
        <DanjiPhotoHero danji={danji} depth={depth} />
        {isShowTab && (
          <div id="negocio-danjidetail-tabs" tw="px-3 py-2 sticky bg-white [top: 56px] [z-index: 100]">
            <div
              tw="flex flex-row items-center overflow-x-auto gap-2"
              // role="presentation"
              ref={scrollRef}
              onMouseDown={onDragStart}
              onMouseMove={onDragMove}
              onMouseUp={onDragEnd}
              onMouseLeave={onDragEnd}
            >
              <div
                tw="p-2 whitespace-nowrap cursor-pointer"
                onClick={() => onClickTab(1)}
                ref={(el) => (refs.current[1] = el)}
              >
                <span tw="text-b1 font-bold" css={[activeTab === 1 ? tw`text-gray-1000` : tw`text-gray-600`]}>
                  단지 매물
                </span>
              </div>
              {isShowRpTab && (
                <div
                  tw="p-2 whitespace-nowrap cursor-pointer"
                  onClick={() => onClickTab(2)}
                  ref={(el) => (refs.current[2] = el)}
                >
                  <span tw="text-b1 font-bold" css={[activeTab === 2 ? tw`text-gray-1000` : tw`text-gray-600`]}>
                    단지 실거래 분석
                  </span>
                </div>
              )}
              <div
                tw="p-2 whitespace-nowrap cursor-pointer"
                onClick={() => onClickTab(3)}
                ref={(el) => (refs.current[3] = el)}
              >
                <span tw="text-b1 font-bold" css={[activeTab === 3 ? tw`text-gray-1000` : tw`text-gray-600`]}>
                  기본 정보
                </span>
              </div>
              <div
                tw="p-2 whitespace-nowrap cursor-pointer"
                onClick={() => onClickTab(4)}
                ref={(el) => (refs.current[4] = el)}
              >
                <span tw="text-b1 font-bold" css={[activeTab === 4 ? tw`text-gray-1000` : tw`text-gray-600`]}>
                  학군 및 주변 정보
                </span>
              </div>
            </div>
          </div>
        )}

        <DanjiDetailSection>
          <div tw="pt-6" id="negocio-danjidetail-bi" ref={basicContainerRef}>
            <DanjiDetailSection.Info danji={danji} depth={depth} />
            <DanjiDetailSection.ActiveInfo danji={danji} depth={depth} setLoadingListing={setLoadingListing} />
          </div>

          <DanjiRealpriceContainer
            ref={realPriceContainerRef}
            danji={danji}
            depth={depth}
            isShowRpTab={isShowRpTab}
            setLoadingRp={setLoadingRp}
            setIsShowRpTab={setIsShowRpTab}
          />

          <div id="negocio-danjidetail-bid" ref={basicDetailContainerRef}>
            <Separator tw="w-full [min-height: 8px]" />
            <DanjiDetailSection.DetailInfo danji={danji} />
          </div>

          <div id="negocio-danjidetail-sc" ref={danjiSchoolContainerRef}>
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
