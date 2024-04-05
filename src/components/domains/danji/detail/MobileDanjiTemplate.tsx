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

import useMobileDanjiHandler from './hooks/useMobileDanjiHandler';

import { ListingsSection, RealPriceSection, InfoSection, FacilitiesSection, NewsSection } from './section-containers';

import Header from './header-mobile';

import Photos from './photos-mobile';

import TabsMobile from './tabs-mobile';

import Summary from './summary-mobile';

import SuggestsOrListings from './suggests-or-listings-mobile';

import BasicInfo from './basic-info-mobile';

import SchoolInfo from './school-info-mobile';

import News from './news';

import { Container, HeaderWrraper } from './widget/MobileTemplateWidget';

import { CommonDanjiDetailProps } from './types';

const Realprice = dynamic(() => import('./real-price-mobile'), { ssr: false });

const AroundInfo = dynamic(() => import('./around-info-mobile'), { ssr: false });

interface MobDanjiDetailProps extends CommonDanjiDetailProps {
  danjiPhotos?: DanjiPhotosResponse;
  danjiSuggestList?: DanjiSuggestListResponse;
  danjiListingList?: DanjiListingListResponse;
  naverDanji?: NaverDanjiResponse;
  preselectedSchoolType: number;
  danjiSchools?: DanjiSchoolsResponse;
}

function MobileDanjiTemplate({
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
          <Header danji={danji} isHeaderActive={isHeaderActive} />
        </HeaderWrraper>
        <RelativeFlexContents id="scroll-container" ref={scrollContainer}>
          <Photos danji={danji} danjiPhotos={danjiPhotos} />
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
              tabIndex={tabIndex}
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
        </RelativeFlexContents>
      </Container>
    </>
  );
}

export default memo(MobileDanjiTemplate);
