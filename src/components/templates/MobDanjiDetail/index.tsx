/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-return-assign */
import { useRef, useState, MouseEvent, useCallback, useEffect } from 'react';

import { useRouter } from 'next/router';

// import { Loading, Separator } from '@/components/atoms';

import { MobDanjiDetailSection } from '@/components/organisms';

// import { DanjiTab } from '@/components/organisms/DanjiDetail/DanjiTabs';

import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';

import { useScroll } from '@/hooks/utils';

// import { describeRealestateType } from '@/constants/enums';

// import News from '@/components/organisms/News';

import dynamic from 'next/dynamic';

const MobDanjiTab = dynamic(() => import('./Components/MobDanjiTab'), {
  ssr: false,
});

const MobDanjiDetailHeader = dynamic(() => import('./Components/MobDanjiDetailHeader'), {
  ssr: true,
});

const MobDanjiPhotoHero = dynamic(() => import('./Components/MobDanjiPhotoHero'), {
  ssr: false,
});

const MobDanjiRealpriceContainer = dynamic(() => import('./Components/MobDanjiRealpriceContainer'), {
  ssr: false,
});

interface Props {
  danji: GetDanjiDetailResponse;
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

          <MobDanjiTab
            danji={danji}
            tabIndex={tabIndex}
            isShowRpTab={isShowRpTab}
            isShowTab={isShowTab}
            loadingRp={loadingRp}
            onClickTab={onClickTab}
          />

          <MobDanjiDetailSection>
            {/* <div tw="pt-7" id="listingsSection" ref={setListingsSection}>
              <MobDanjiDetailSection.Info danji={danji} />
              <MobDanjiDetailSection.ActiveInfo danji={danji} tabIndex={tabIndex} />
            </div> */}

            <div id="realPriceSection" ref={setRealPriceSection}>
              <MobDanjiRealpriceContainer
                danji={danji}
                isShowRpTab={isShowRpTab}
                setLoadingRp={setLoadingRp}
                setIsShowRpTab={setIsShowRpTab}
              />
            </div>

            {/* <div id="infoSection" ref={setInfoSection}>
              <Separator tw="w-full [min-height: 8px]" />
              <MobDanjiDetailSection.DetailInfo danji={danji} />
            </div> */}

            {/* <div id="facilitiesSection" ref={setFacilitiesSection}>
              <Separator tw="w-full [min-height: 8px]" />
              <MobDanjiDetailSection.SchoolInfo danji={danji} />
              <Separator tw="w-full [min-height: 8px]" />
              <MobDanjiDetailSection.AroundInfo danji={danji} />
              <div tw="[min-height: 80px] w-full" />
            </div> */}

            {/* <div id="newsSection" ref={setNewsSection}>
              <Separator tw="w-full [min-height: 8px]" />
              <News.ColumnType
                query={`${danji.name} ${describeRealestateType(danji.type)}`}
                query2={`${danji.sigungu_name} 부동산`}
              />
            </div> */}
          </MobDanjiDetailSection>
        </div>
      </div>
    </>
  );
}
