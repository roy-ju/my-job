import { memo } from 'react';

import dynamic from 'next/dynamic';

import tw, { styled } from 'twin.macro';

import Separator from '@/components/atoms/Separator';

import RelativeFlexContents from '@/components/atoms/RelativeFlexContents';

import { describeRealestateType } from '@/constants/enums';

import {
  DanjiListingListResponse,
  DanjiPhotosResponse,
  DanjiSchoolsResponse,
  DanjiSuggestListResponse,
  NaverDanjiResponse,
} from '@/services/danji/types';

import {
  ListingsSection,
  RealPriceSection,
  InfoSection,
  FacilitiesSection,
  NewsSection,
} from './detail/section-containers';

import Header from './detail/header';

import PhotosPc from './detail/photos/PhotosPc';

import TabsMobile from './detail/tabs-mobile';

import Summary from './detail/summary';

import SuggestsOrListings from './detail/suggest-or-listings-pc';

import BasicInfo from './detail/basic-info-pc';

import SchoolInfo from './detail/school-info-mobile';

import News from './detail/news';

import { Container, HeaderWrraper } from './detail/widget/MobileTemplateWidget';

import { CommonDanjiDetailProps } from './detail/types';

import usePcDanjiHandler from './detail/hooks/usePcDanjiHandler';

const BottomDiv = styled.div`
  ${tw`[height: 10px]`}
`;

const Realprice = dynamic(() => import('./detail/real-price'), { ssr: false });

const AroundInfo = dynamic(() => import('./detail/around-info-mobile'), { ssr: false });

interface DanjiDetailProps extends CommonDanjiDetailProps {
  danjiPhotos?: DanjiPhotosResponse;
  danjiSuggestList?: DanjiSuggestListResponse;
  danjiListingList?: DanjiListingListResponse;
  naverDanji?: NaverDanjiResponse;
  preselectedSchoolType: number;
  danjiSchools?: DanjiSchoolsResponse;
  handleMutateDanji?: () => void;
}

function DanjiDetailPc({
  danji,
  danjiPhotos,
  danjiSuggestList,
  danjiListingList,
  naverDanji,
  preselectedSchoolType,
  danjiSchools,
  handleMutateDanji,
}: DanjiDetailProps) {
  const {
    scrollContainer,

    listingsSectionRef,
    infoSectionRef,
    realPriceSectionRef,
    facilitiesSectionRef,
    newsSectionRef,
    bottomRef,

    isHeaderActive,

    tabIndex,
    handleClickTab,

    showRealPriceTab,
    setShowRealPriceTab,

    loadingRealprice,
    setLoadingRealprice,
  } = usePcDanjiHandler({ danji });

  return (
    <>
      <Container>
        <HeaderWrraper>
          <Header danji={danji} isHeaderActive={isHeaderActive} />
        </HeaderWrraper>

        <RelativeFlexContents id="scroll-container" ref={scrollContainer}>
          <PhotosPc danji={danji} danjiPhotos={danjiPhotos} />
          <TabsMobile
            danji={danji}
            tabIndex={tabIndex}
            showRealPriceTab={showRealPriceTab}
            loadingRealprice={loadingRealprice}
            handleClickTab={handleClickTab}
          />
          <ListingsSection ref={listingsSectionRef}>
            <Summary danji={danji} />
            <SuggestsOrListings
              danji={danji}
              danjiSuggestList={danjiSuggestList}
              danjiListingList={danjiListingList}
              naverDanji={naverDanji}
            />
          </ListingsSection>
          <RealPriceSection ref={realPriceSectionRef}>
            <Realprice
              danji={danji}
              isShowRpTab={showRealPriceTab}
              setLoadingRp={setLoadingRealprice}
              setIsShowRpTab={setShowRealPriceTab}
            />
          </RealPriceSection>
          <InfoSection ref={infoSectionRef}>
            <BasicInfo danji={danji} />
          </InfoSection>
          <FacilitiesSection ref={facilitiesSectionRef}>
            <Separator tw="w-full [min-height: 8px]" />
            <SchoolInfo danji={danji} danjiSchools={danjiSchools} preselectedSchoolType={preselectedSchoolType} />
            <Separator tw="w-full [min-height: 8px]" />
            <AroundInfo danji={danji} />
          </FacilitiesSection>
          <NewsSection ref={newsSectionRef}>
            <Separator tw="w-full [min-height: 8px]" />
            <News.List
              query={`${danji.name} ${describeRealestateType(danji.type)}`}
              query2={`${danji.sigungu_name} 부동산`}
            />
          </NewsSection>
          <BottomDiv id="negocio-danjidetail-bottom" ref={bottomRef} />
        </RelativeFlexContents>
      </Container>
    </>
  );
}

export default memo(DanjiDetailPc);
