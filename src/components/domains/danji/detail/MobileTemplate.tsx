import React, { memo, useCallback, useRef, useState } from 'react';

// import dynamic from 'next/dynamic';

import Separator from '@/components/atoms/Separator';

import RelativeFlexContents from '@/components/atoms/RelativeFlexContents';

import News from '@/components/organisms/News';

import useScroll from '@/hooks/useScroll';

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

import { describeRealestateType } from '@/constants/enums';

import {
  DanjiDetailResponse,
  DanjiListingListResponse,
  DanjiPhotosResponse,
  DanjiSchoolsResponse,
  DanjiSuggestListResponse,
  NaverDanjiResponse,
} from '@/services/danji/types';

import ListingsSection from './sectionContainers/ListingsSection';

import RealPriceSection from './sectionContainers/RealPriceSection';

import InfoSection from './sectionContainers/InfoSection';

import FacilitiesSection from './sectionContainers/FacilitiesSection';

import NewsSection from './sectionContainers/NewsSection';

import Header from './header-mobile';

import Photos from './photos-mobile';

import TabsMobile from './tabs-mobile';

import Summary from './summary-mobile';

import SuggestsOrListings from './suggests-or-listings-mobile';

import BasicInfo from './basic-info-mobile';

import SchoolInfo from './school-info-mobile';

import { Container, HeaderWrraper } from './MobileTemplateWidget';

// const Realprice = dynamic(() => import('./Components/realprice'), { ssr: false });

// const AroundInfo = dynamic(() => import('./Components/aroundInfo'), { ssr: false });

interface MobDanjiDetailProps {
  danji: DanjiDetailResponse;
  danjiPhotos?: DanjiPhotosResponse;
  danjiSuggestList?: DanjiSuggestListResponse;
  danjiListingList?: DanjiListingListResponse;
  naverDanji?: NaverDanjiResponse;
  preselectedSchoolType: number;
  danjiSchools?: DanjiSchoolsResponse;
}

function MobDanjiDetail({
  danji,
  danjiPhotos,
  danjiSuggestList,
  danjiListingList,
  naverDanji,
  preselectedSchoolType,
  danjiSchools,
}: MobDanjiDetailProps) {
  const scrollContainer = useRef<HTMLDivElement | null>(null);

  const listingsSectionRef = useRef<HTMLDivElement | null>(null);
  const infoSectionRef = useRef<HTMLDivElement | null>(null);
  const realPriceSectionRef = useRef<HTMLDivElement | null>(null);
  const facilitiesSectionRef = useRef<HTMLDivElement | null>(null);
  const newsSectionRef = useRef<HTMLDivElement | null>(null);

  const [isHeaderActive, setIsHeaderActive] = useState(false);
  const [loadingRealprice, setLoadingRealprice] = useState(true);
  const [showRealPriceTab, setShowRealPriceTab] = useState(false);

  const [tabIndex, setTabIndex] = useState(0);

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

  const onClickTab = useCallback((e: NegocioMouseEvent<HTMLButtonElement>) => {
    const index = Number(e.currentTarget.value);

    if (index === 0) {
      scrollContainer.current?.scrollBy({
        top: (listingsSectionRef?.current?.getBoundingClientRect()?.top ?? 0) - 103,
        behavior: 'smooth',
      });
    }

    if (index === 1) {
      scrollContainer.current?.scrollBy({
        top: (realPriceSectionRef?.current?.getBoundingClientRect()?.top ?? 0) - 103,
        behavior: 'smooth',
      });
    }

    if (index === 2) {
      scrollContainer.current?.scrollBy({
        top: (infoSectionRef?.current?.getBoundingClientRect()?.top ?? 0) - 103,
        behavior: 'smooth',
      });
    }

    if (index === 3) {
      scrollContainer.current?.scrollBy({
        top: (facilitiesSectionRef?.current?.getBoundingClientRect()?.top ?? 0) - 103,
        behavior: 'smooth',
      });
    }

    if (index === 4) {
      scrollContainer.current?.scrollBy({
        top: (newsSectionRef?.current?.getBoundingClientRect()?.top ?? 0) - 103,
        behavior: 'smooth',
      });
    }
  }, []);

  useIsomorphicLayoutEffect(() => {
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

    if (listingsSectionRef?.current) {
      observer.observe(listingsSectionRef.current);
    }

    if (realPriceSectionRef?.current) {
      observer.observe(realPriceSectionRef.current);
    }

    if (infoSectionRef?.current) {
      observer.observe(infoSectionRef.current);
    }

    if (facilitiesSectionRef?.current) {
      observer.observe(facilitiesSectionRef.current);
    }

    if (newsSectionRef?.current) {
      observer.observe(newsSectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [listingsSectionRef, realPriceSectionRef, infoSectionRef, facilitiesSectionRef, newsSectionRef]);

  useIsomorphicLayoutEffect(() => {
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
            onClickTab={onClickTab}
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
            {/* <Realprice
              danji={danji}
              isShowRpTab={showRealPriceTab}
              setLoadingRp={setLoadingRealprice}
              setIsShowRpTab={setShowRealPriceTab}
            /> */}
          </RealPriceSection>

          <InfoSection ref={infoSectionRef}>
            <BasicInfo danji={danji} />
          </InfoSection>

          <FacilitiesSection ref={facilitiesSectionRef}>
            <Separator tw="w-full [min-height: 8px]" />
            <SchoolInfo danji={danji} danjiSchools={danjiSchools} preselectedSchoolType={preselectedSchoolType} />
            <Separator tw="w-full [min-height: 8px]" />
            {/* <AroundInfo danji={danji} /> */}
          </FacilitiesSection>

          <NewsSection ref={newsSectionRef}>
            <Separator tw="w-full [min-height: 8px]" />
            <News.ColumnType
              query={`${danji.name} ${describeRealestateType(danji.type)}`}
              query2={`${danji.sigungu_name} 부동산`}
            />
          </NewsSection>
        </RelativeFlexContents>
      </Container>
    </>
  );
}

export default memo(MobDanjiDetail);
