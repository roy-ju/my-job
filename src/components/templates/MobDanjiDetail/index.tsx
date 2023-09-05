/* eslint-disable no-return-assign */

import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';
import useAPI_GetUserInfo from '@/apis/user/getUserInfo';
import { Button, Loading, Separator } from '@/components/atoms';
import { OverlayPresenter, Popup } from '@/components/molecules';
import { MobDanjiDetailSection } from '@/components/organisms';
import { useScroll } from '@/hooks/utils';
import Routes from '@/router/routes';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useRef, useState, MouseEvent, useCallback, useEffect } from 'react';
import tw, { styled } from 'twin.macro';

import MobDanjiDetailHeader from './Components/MobDanjiDetailHeader';
import MobDanjiPhotoHero from './Components/MobDanjiPhotoHero';
import MobDanjiRealpriceContainer from './Components/MobDanjiRealpriceContainer';

interface Props {
  danji?: GetDanjiDetailResponse;
  isShowTab?: boolean;
  handleMutateDanji?: () => void;
}

const StyledDiv = styled.div``;

export default function MobDanjiDetail({ danji, isShowTab = true, handleMutateDanji }: Props) {
  const router = useRouter();
  const scrollContainer = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const refs = useRef<any>([]);

  const [isHeaderActive, setIsHeaderActive] = useState(false);
  const [loadingRp, setLoadingRp] = useState(true);
  const [isShowRpTab, setIsShowRpTab] = useState(false);

  const [listingsSection, setListingsSection] = useState<HTMLDivElement | null>(null);
  const [realPriceSection, setRealPriceSection] = useState<HTMLDivElement | null>(null);
  const [infoSection, setInfoSection] = useState<HTMLDivElement | null>(null);
  const [facilitiesSection, setFacilitiesSection] = useState<HTMLDivElement | null>(null);

  const [tabIndex, setTabIndex] = useState(0);

  const [isDrag, setIsDrag] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>();

  const [visibleState, setVisibleState] = useState<Record<string, boolean>>({
    listingsSection: true,
    realPriceSection: false,
    infoSection: false,
    facilitiesSection: false,
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
      { rootMargin: '-103px 0px -103px 0px', threshold: 0.1 },
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

  const [tempPopup, setTempPopup] = useState(false);

  const { data: user } = useAPI_GetUserInfo();

  const handleClickButton = useCallback(() => {
    if (!user) {
      setTempPopup(true);
      return;
    }

    router.push(`/${Routes.EntryMobile}/${Routes.SuggestDetail}?suggestID=44`);
  }, [router, user]);

  const handleClickTempPopup = useCallback(
    async (val?: string) => {
      if (val === 'close') {
        setTempPopup(false);
        return;
      }

      if (val === 'open') {
        setTempPopup(false);
        router.push({
          pathname: `/${Routes.EntryMobile}/${Routes.Login}`,
          query: {
            redirect: `/${Routes.EntryMobile}/${Routes.SuggestDetail}?danjiID=${router?.query.danjiID}&suggestID=44`,
          },
        });
      }
    },
    [router],
  );

  if (!danji)
    return (
      <div tw="py-20">
        <Loading />
      </div>
    );

  return (
    <>
      <div tw="relative w-full max-w-mobile flex flex-col h-full overflow-x-hidden">
        <div tw="[z-index: 500]">
          <MobDanjiDetailHeader
            danji={danji}
            isHeaderActive={isHeaderActive}
            onClickBack={onClickBack}
            handleMutateDanji={handleMutateDanji}
          />
        </div>
        <div tw="flex-1 min-h-0 overflow-y-auto" ref={scrollContainer}>
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
                <StyledDiv
                  tw="relative px-5 pt-2.5 pb-3 whitespace-nowrap cursor-pointer"
                  onClick={() => onClickTab(0)}
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
                </StyledDiv>

                {isShowRpTab && (
                  <StyledDiv
                    tw="relative px-5 pt-2.5 pb-3 whitespace-nowrap cursor-pointer"
                    onClick={() => onClickTab(1)}
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
                  </StyledDiv>
                )}

                <StyledDiv
                  tw="relative px-5 pt-2.5 pb-3 whitespace-nowrap cursor-pointer"
                  onClick={() => onClickTab(2)}
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
                </StyledDiv>

                <StyledDiv
                  tw="relative px-5 pt-2.5 pb-3 whitespace-nowrap cursor-pointer"
                  onClick={() => onClickTab(3)}
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
                </StyledDiv>
              </div>
            </div>
          )}

          <MobDanjiDetailSection>
            <div tw="pt-7" id="listingsSection" ref={setListingsSection}>
              <MobDanjiDetailSection.Info danji={danji} />
              <MobDanjiDetailSection.ActiveInfo danji={danji} setLoadingListing={() => {}} />
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
            </div>
          </MobDanjiDetailSection>
        </div>
      </div>

      {tempPopup && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup tw="py-6">
              <Popup.SmallTitle tw="text-center">
                요청 내용을 확인하기 위해서는 로그인이 필요합니다.
                <br />
                로그인 화면으로 이동하시겠습니까?
              </Popup.SmallTitle>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.CancelButton onClick={() => handleClickTempPopup('close')}>닫기</Popup.CancelButton>
              <Popup.ActionButton onClick={() => handleClickTempPopup('open')}>로그인 하러가기</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
    </>
  );
}
