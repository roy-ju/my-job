import React, { memo } from 'react';

import dynamic from 'next/dynamic';

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

import useMobileDanjiHandler from './detail/hooks/useMobileDanjiHandler';

import {
  ListingsSection,
  RealPriceSection,
  InfoSection,
  FacilitiesSection,
  NewsSection,
} from './detail/section-containers';

import Header from './detail/header';

import PhotosMobile from './detail/photos/PhotosMobile';

import TabsMobile from './detail/tabs-mobile';

import Summary from './detail/summary';

import SuggestsOrListings from './detail/suggests-or-listings-mobile';

import BasicInfo from './detail/basic-info-mobile';

import SchoolInfo from './detail/school-info-mobile';

import News from './detail/news';

import { Container, HeaderWrraper } from './detail/widget/MobileTemplateWidget';

import { CommonDanjiDetailProps } from './detail/types';

const Realprice = dynamic(() => import('./detail/real-price'), { ssr: false });

const AroundInfo = dynamic(() => import('./detail/around-info-mobile'), { ssr: false });

interface MobDanjiDetailProps extends CommonDanjiDetailProps {
  isSeo?: boolean;
  danjiPhotos?: DanjiPhotosResponse;
  danjiSuggestList?: DanjiSuggestListResponse;
  danjiListingList?: DanjiListingListResponse;
  naverDanji?: NaverDanjiResponse;
  preselectedSchoolType: number;
  danjiSchools?: DanjiSchoolsResponse;
}

function DanjiDetailMobile({
  isSeo,
  danji,
  danjiPhotos,
  danjiSuggestList,
  danjiListingList,
  naverDanji,
  preselectedSchoolType,
  danjiSchools,
}: MobDanjiDetailProps) {
  const {
    scrollContainer,

    listingsSectionRef,
    infoSectionRef,
    realPriceSectionRef,
    facilitiesSectionRef,
    newsSectionRef,

    isHeaderActive,

    tabIndex,
    handleClickTab,

    showRealPriceTab,
    setShowRealPriceTab,

    loadingRealprice,
    setLoadingRealprice,
  } = useMobileDanjiHandler();

  return (
    <>
      <Container>
        <HeaderWrraper>
          <Header isSeo={isSeo} danji={danji} isHeaderActive={isHeaderActive} />
        </HeaderWrraper>
        <RelativeFlexContents id="scroll-container" ref={scrollContainer}>
          <PhotosMobile isSeo={isSeo} danji={danji} danjiPhotos={danjiPhotos} />
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
              isSeo={isSeo}
              tabIndex={tabIndex}
              danji={danji}
              danjiSuggestList={danjiSuggestList}
              danjiListingList={danjiListingList}
              naverDanji={naverDanji}
            />
          </ListingsSection>
          <RealPriceSection ref={realPriceSectionRef}>
            <Realprice
              isSeo={isSeo}
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
        </RelativeFlexContents>
      </Container>
    </>
  );
}

export default memo(DanjiDetailMobile);
