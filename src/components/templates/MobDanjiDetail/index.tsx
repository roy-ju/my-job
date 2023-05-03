/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';
import { Loading, Separator } from '@/components/atoms';
import { MobDanjiDetailSection } from '@/components/organisms';
import { useScroll } from '@/hooks/utils';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
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

  const basicContainerRef = useRef<HTMLDivElement | null>(null);
  const realPriceContainerRef = useRef<HTMLDivElement | null>(null);
  const basicDetailContainerRef = useRef<HTMLDivElement | null>(null);
  const danjiSchoolContainerRef = useRef<HTMLDivElement | null>(null);

  const [isHeaderActive, setIsHeaderActive] = useState(false);

  const [loadingListing, setLoadingListing] = useState(true);
  const [loadingRp, setLoadingRp] = useState(true);
  const [loadingSchool, setLoadingSchool] = useState(true);
  const [isShowRpTab, setIsShowRpTab] = useState(false);

  const [activeTab, setActiveTab] = useState(1);

  const onClickTab = (index: number) => {};

  const onClickBack = () => {
    router.back();
  };

  useScroll(scrollContainer, ({ scrollY }) => {
    setIsHeaderActive(scrollY > 0);
  });

  if (!danji)
    return (
      <div tw="py-20">
        <Loading />
      </div>
    );

  return (
    <div tw="relative w-full max-w-mobile flex flex-col h-full">
      <MobDanjiDetailHeader
        danji={danji}
        isHeaderActive={isHeaderActive}
        onClickBack={onClickBack}
        handleMutateDanji={handleMutateDanji}
      />
      <div tw="overflow-y-auto" ref={scrollContainer}>
        <MobDanjiPhotoHero danji={danji} />
        {isShowTab && (
          <div id="mob-negocio-danjidetail-tabs" tw="px-3 py-2 sticky bg-white [top: 56px] [z-index: 100]">
            <div
              tw="flex flex-row items-center overflow-x-auto gap-2"
              role="presentation"
              ref={scrollRef}
              // onMouseDown={onDragStart}
              // onMouseMove={onDragMove}
              // onMouseUp={onDragEnd}
              // onMouseLeave={onDragEnd}
            >
              <StyledDiv
                tw="p-2 whitespace-nowrap cursor-pointer"
                onClick={() => onClickTab(1)}
                ref={(el) => (refs.current[1] = el)}
              >
                <span tw="text-b1 font-bold" css={[activeTab === 1 ? tw`text-gray-1000` : tw`text-gray-600`]}>
                  단지 매물
                </span>
              </StyledDiv>
              {isShowRpTab && (
                <StyledDiv
                  tw="p-2 whitespace-nowrap cursor-pointer"
                  onClick={() => onClickTab(2)}
                  ref={(el) => (refs.current[2] = el)}
                >
                  <span tw="text-b1 font-bold" css={[activeTab === 2 ? tw`text-gray-1000` : tw`text-gray-600`]}>
                    단지 실거래 분석
                  </span>
                </StyledDiv>
              )}
              <StyledDiv
                tw="p-2 whitespace-nowrap cursor-pointer"
                onClick={() => onClickTab(3)}
                ref={(el) => (refs.current[3] = el)}
              >
                <span tw="text-b1 font-bold" css={[activeTab === 3 ? tw`text-gray-1000` : tw`text-gray-600`]}>
                  기본 정보
                </span>
              </StyledDiv>
              <StyledDiv
                tw="p-2 whitespace-nowrap cursor-pointer"
                onClick={() => onClickTab(4)}
                ref={(el) => (refs.current[4] = el)}
              >
                <span tw="text-b1 font-bold" css={[activeTab === 4 ? tw`text-gray-1000` : tw`text-gray-600`]}>
                  학군 및 주변 정보
                </span>
              </StyledDiv>
            </div>
          </div>
        )}

        <MobDanjiDetailSection>
          <div tw="pt-6" id="mob-negocio-danjidetail-bi" ref={basicContainerRef}>
            <MobDanjiDetailSection.Info danji={danji} />
            <MobDanjiDetailSection.ActiveInfo danji={danji} setLoadingListing={setLoadingListing} />
          </div>

          <MobDanjiRealpriceContainer
            ref={realPriceContainerRef}
            danji={danji}
            isShowRpTab={isShowRpTab}
            setLoadingRp={setLoadingRp}
            setIsShowRpTab={setIsShowRpTab}
          />

          <div id="mob-negocio-danjidetail-bid" ref={basicDetailContainerRef}>
            <Separator tw="w-full [min-height: 8px]" />
            <MobDanjiDetailSection.DetailInfo danji={danji} />
          </div>

          <div id="negocio-danjidetail-sc" ref={danjiSchoolContainerRef}>
            <Separator tw="w-full [min-height: 8px]" />
            <MobDanjiDetailSection.SchoolInfo danji={danji} />
            <Separator tw="w-full [min-height: 8px]" />
            <MobDanjiDetailSection.AroundInfo danji={danji} />
          </div>
        </MobDanjiDetailSection>
      </div>
    </div>
  );
}
