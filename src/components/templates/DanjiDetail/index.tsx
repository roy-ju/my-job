/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';
import { GetDanjiListingsResponse } from '@/apis/danji/danjiListingsList';
import { GetDanjiPhotosResponse } from '@/apis/danji/danjiPhotos';
import { GetDanjiRealPricesPyoungListResponse } from '@/apis/danji/danjiRealPricesPyoungList';
import {
  GetDanjiJeonsaerateResponse,
  GetDanjiJeonsaerateSigunguResponse,
  GetDanjiTradeTurnrateResponse,
  GetDanjiTradeTurnrateSigunguResponse,
} from '@/apis/danji/danjiTradeTurnRate';
import { Loading, Separator } from '@/components/atoms';
import { DanjiDetailSection, PhotoHero } from '@/components/organisms';
import tw from 'twin.macro';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import { MonthStartDate } from '@/components/pages/pc/DanjiDetail/useXAxisDate';
import { BuyOrRent, describeJeonsaeWolsaeSame } from '@/constants/enums';
import { DanjiRealPricesListItem, DanjiRealPricesListResponse } from '@/apis/danji/danjiRealPricesList';
import ShareIcon from '@/assets/icons/share.svg';
import HeartFilledIcon from '@/assets/icons/heart.svg';
import HeartOutlinedIcon from '@/assets/icons/heart_outlined.svg';
import { useRef, useState, MouseEvent, useEffect } from 'react';
import { useScroll } from '@/hooks/utils';
import { NavigationHeader } from '@/components/molecules';
import { DefaultListingImageLg } from '@/constants/strings';
// import { scrollToElementNoneBehaviour } from '@/utils/scrollElement';
import DanjiStatusChartWrraper from './DanjiStatusChartWrraper';
import DanjiStatusTradeChartWrraper from './DanjiStatusTradeChartWrraper';
import DanjiStatusJeonsaeChartWrraper from './DanjiStatusJeonsaeChartWrraper';
import { DanjiRealPriceChart } from './DanjiRealPriceChart';

type ChartDataFirst = {
  sigungu_price?: number;
  sigungu_count?: number | null;

  sido_price?: number;
  sido_count?: number | null;

  danji_price?: number;
  danji_count?: number | null;

  date: Date;
}[];

type ChartDataFirstJeonsae = {
  date: Date;
  sigungu_jeonsae_rate?: number | null | undefined;
  sido_jeonsae_rate?: number | null | undefined;
  danji_jeonsae_rate?: number | null | undefined;
  isManipulate?: boolean | undefined;
}[];

type RealpricesChartData = {
  buy_price?: number;
  jeonsae_price?: number;
  buy_count?: number;
  jeonsae_count?: number;
  date: Date;
  buy_prices?: null | number[];
  jeonsae_prices?: null | number[];
  buy_domain_prices?: number;
  jeonsae_domain_prices?: number;
}[];

type ListDanji = {
  date: string;
  price: number;
  count: number;
}[];

type JeonsaeListDanji = {
  date: string;
  jeonsae_rate: number;
}[];

interface Props {
  depth: number;
  danji?: GetDanjiDetailResponse;
  isRealPricesAvailable?: boolean;
  danjiPhotos?: GetDanjiPhotosResponse;
  danjiListings?: GetDanjiListingsResponse['list'];
  danjiRealPricesData?: GetDanjiRealPricesPyoungListResponse;
  danjiRealPricesPyoungList?: GetDanjiRealPricesPyoungListResponse['list'];
  danjiTradeTurnRateData?: GetDanjiTradeTurnrateResponse;
  danjiTradeTurnRateSigunguData?: GetDanjiTradeTurnrateSigunguResponse;
  danjiJeonsaeRateRateData?: GetDanjiJeonsaerateResponse;
  danjiJeonsaeRateSigunguData?: GetDanjiJeonsaerateSigunguResponse;
  danjiChartData: ChartDataFirst;
  sigunguChartData: ChartDataFirst;
  sidoChartData: ChartDataFirst;
  listDanji: ListDanji;
  jeonsaeListDanji: JeonsaeListDanji;
  jeonsaeDanjiChartData: ChartDataFirstJeonsae;
  jeonsaeSidoChartData: ChartDataFirstJeonsae;
  jeonsaeSigunguChartData: ChartDataFirstJeonsae;
  realpricesChartData: RealpricesChartData;
  xAxis: MonthStartDate[];
  buyOrRent?: number;
  checked?: boolean;
  selectedYear: number;
  selectedArea?: string;
  selectedJeonyongArea?: string;
  selectedJeonyongAreaMax?: string;
  selectedIndex?: number;
  isShowDanjiPhotos?: boolean;
  danjiRealPricesListData?: DanjiRealPricesListResponse[];
  danjiRealPricesList?: DanjiRealPricesListItem[];
  isRecommendationService: boolean;
  handleRecommendation?: () => void;
  handlePhotos?: () => void;
  handleRealPriceList?: () => void;
  handleListingAll?: () => void;
  onClickListingDetail: (id: number) => void;
  onChangeBuyOrRent?: (value: number) => void;
  onChangeSelectedYear?: (value: number) => void;
  onChangeSelectedIndex?: (value: number) => void;
  onChangeSelectedArea?: (value: string) => void;
  onChangeSelectedJeonyongArea?: (valul: string) => void;
  onChangeSelectedJeonyongAreaMax?: (value: string) => void;
  onChangeChecked?: () => void;
  danjiRealPriesListSetSize?: (
    size: number | ((_size: number) => number),
  ) => Promise<DanjiRealPricesListResponse[] | undefined>;
  onChangeHakgudoActive?: (active: boolean) => void;
}

export default function DanjiDetail({
  depth,
  danji,
  isRealPricesAvailable,
  danjiPhotos,
  danjiListings,
  danjiRealPricesData,
  danjiRealPricesPyoungList,
  danjiTradeTurnRateData,
  danjiTradeTurnRateSigunguData,
  danjiJeonsaeRateRateData,
  danjiJeonsaeRateSigunguData,
  listDanji,
  danjiChartData,
  sigunguChartData,
  sidoChartData,
  jeonsaeListDanji,
  jeonsaeDanjiChartData,
  jeonsaeSidoChartData,
  jeonsaeSigunguChartData,
  realpricesChartData,
  danjiRealPricesListData,
  danjiRealPricesList,
  xAxis,
  buyOrRent,
  checked,
  selectedYear,
  selectedArea,
  selectedIndex,
  isRecommendationService,
  handleRecommendation,
  handlePhotos,
  handleRealPriceList,
  handleListingAll,
  onClickListingDetail,
  onChangeChecked,
  onChangeBuyOrRent,
  onChangeSelectedYear,
  onChangeSelectedIndex,
  onChangeSelectedArea,
  onChangeSelectedJeonyongArea,
  onChangeSelectedJeonyongAreaMax,
  danjiRealPriesListSetSize,
  onChangeHakgudoActive,
}: Props) {
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

  useScroll(scrollContainer, ({ scrollY }) => {
    setIsHeaderActive(scrollY > 0.1);
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

  const onClickTab = (index: number) => {
    if (!danji) return;

    if (index === activeTab) return;

    if (index === 1 && basicContainerRef.current) {
      basicContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (index === 2 && realPriceContainerRef.current) {
      realPriceContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (index === 3 && basicDetailContainerRef.current) {
      basicDetailContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (index === 4 && danjiSchoolContainerRef.current) {
      danjiSchoolContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

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
  }, [isRealPricesAvailable, danji, activeTab]);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
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
  }, [basicInfoVisible, bottomReached, detailInfoVisible, realPriceVisible, schoolInfoVisible]);

  if (!danji)
    return (
      <div tw="py-20">
        <Loading />
      </div>
    );

  return (
    <div tw="relative flex flex-col h-full">
      <NavigationHeader
        id="negocio-header"
        css={[
          tw`absolute top-0 left-0 z-50 w-full text-white transition-colors bg-transparent`,
          isHeaderActive && tw`bg-white text-gray-1000`,
        ]}
      >
        <NavigationHeader.Title tw="text-inherit">{danji.name}</NavigationHeader.Title>
        <div tw="flex gap-4">
          <NavigationHeader.Button>
            <ShareIcon tw="text-inherit" />
          </NavigationHeader.Button>
          <NavigationHeader.Button>
            {danji?.is_favorite ? <HeartFilledIcon tw="text-red" /> : <HeartOutlinedIcon tw="text-inherit" />}
          </NavigationHeader.Button>
        </div>
      </NavigationHeader>
      <div tw="overflow-y-auto" ref={scrollContainer} id="scroll-container">
        <PhotoHero
          itemSize={danjiPhotos?.danji_photos?.length ?? 0}
          photoPath={danjiPhotos?.danji_photos?.[0]?.full_file_path ?? DefaultListingImageLg[danji.type]}
          onClickViewPhotos={handlePhotos}
        />
        <div id="negocio-danjidetail-tabs" tw="px-3 py-2 sticky bg-white [top: 56px] [z-index: 100]">
          <div
            tw="flex flex-row items-center overflow-x-auto gap-2"
            role="presentation"
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
            {isRealPricesAvailable && (
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

        <DanjiDetailSection>
          <div tw="pt-6" id="negocio-danjidetail-bi" ref={basicContainerRef}>
            <div tw="pb-10">
              <DanjiDetailSection.Info
                danji={danji}
                isRecommendationService={isRecommendationService}
                handleRecommendation={handleRecommendation}
              />
            </div>
            {danjiListings && danjiListings.length > 0 && (
              <div tw="pb-8">
                <DanjiDetailSection.ActiveInfo
                  danjiListings={danjiListings}
                  onClick={onClickListingDetail}
                  handleListingAll={handleListingAll}
                />
              </div>
            )}
          </div>

          {isRealPricesAvailable && (
            <div id="negocio-danjidetail-rp" ref={realPriceContainerRef}>
              <Separator tw="w-full [min-height: 8px]" />
              <div tw="pt-10">
                <DanjiDetailSection.RealPriceInfo
                  depth={depth}
                  buyOrRent={buyOrRent}
                  danji={danji}
                  danjiRealPricesData={danjiRealPricesData}
                  danjiTradeTurnRateData={danjiTradeTurnRateData}
                  danjiTradeTurnRateSigunguData={danjiTradeTurnRateSigunguData}
                  danjiJeonsaeRateRateData={danjiJeonsaeRateRateData}
                  danjiJeonsaeRateSigunguData={danjiJeonsaeRateSigunguData}
                  selectedYear={selectedYear}
                  onChangeBuyOrRent={onChangeBuyOrRent}
                  onChangeSelectedYear={onChangeSelectedYear}
                />
              </div>
              <div tw="px-5 mt-10">
                <div tw="mb-3">
                  <span tw="text-b2 [line-height: 1.0625rem] [letter-spacing: -0.4px]">
                    면적당 거래가 ({describeJeonsaeWolsaeSame(buyOrRent)} / ㎡)
                  </span>
                </div>
                <ParentSize>
                  {({ width }) => (
                    <DanjiStatusChartWrraper
                      width={width}
                      xAxis={xAxis}
                      listDanji={listDanji}
                      danjiChartData={danjiChartData}
                      sigunguChartData={sigunguChartData}
                      sidoChartData={sidoChartData}
                      selectedYear={selectedYear}
                    />
                  )}
                </ParentSize>
              </div>

              {buyOrRent === BuyOrRent.Jeonsae && (
                <div tw="px-5 mt-10">
                  <div tw="mb-3">
                    <span tw="text-b2 [line-height: 1.0625rem] [letter-spacing: -0.4px]">평균 전세가율</span>
                  </div>
                  <ParentSize>
                    {({ width }) => (
                      <DanjiStatusJeonsaeChartWrraper
                        width={width}
                        xAxis={xAxis}
                        listDanji={jeonsaeListDanji}
                        danjiChartData={jeonsaeDanjiChartData}
                        sigunguChartData={jeonsaeSigunguChartData}
                        sidoChartData={jeonsaeSidoChartData}
                        selectedYear={selectedYear}
                      />
                    )}
                  </ParentSize>
                </div>
              )}

              <div tw="px-5 mt-10">
                <div tw="mb-3">
                  <span tw="text-b2 [line-height: 1.0625rem] [letter-spacing: -0.4px]">
                    총 거래량 ({describeJeonsaeWolsaeSame(buyOrRent)})
                  </span>
                </div>
                <ParentSize>
                  {({ width }) => (
                    <DanjiStatusTradeChartWrraper
                      width={width}
                      xAxis={xAxis}
                      listDanji={listDanji}
                      danjiChartData={danjiChartData}
                      selectedYear={selectedYear}
                    />
                  )}
                </ParentSize>
              </div>

              <DanjiDetailSection.RealPricesPyoungList
                buyOrRent={buyOrRent}
                danjiRealPricesPyoungList={danjiRealPricesPyoungList}
                selectedArea={selectedArea}
                selectedIndex={selectedIndex}
                checked={checked}
                onChangeChecked={onChangeChecked}
                onChangeSelectedIndex={onChangeSelectedIndex}
                onChangeSelectedArea={onChangeSelectedArea}
                onChangeSelectedJeonyongArea={onChangeSelectedJeonyongArea}
                onChangeSelectedJeonyongAreaMax={onChangeSelectedJeonyongAreaMax}
              />

              <div tw="px-5">
                <ParentSize>
                  {({ width }) => (
                    <DanjiRealPriceChart
                      width={width}
                      xAxis={xAxis}
                      buyOrRent={buyOrRent}
                      selectedYear={selectedYear}
                      selectedIndex={selectedIndex}
                      realpricesChartData={realpricesChartData}
                      checked={checked}
                    />
                  )}
                </ParentSize>
              </div>

              <DanjiDetailSection.RealPricesList
                danjiRealPricesListData={danjiRealPricesListData}
                danjiRealPricesList={danjiRealPricesList}
                danjiRealPriesListSetSize={danjiRealPriesListSetSize}
                isMorePage={false}
                handleRealPriceList={handleRealPriceList}
              />
            </div>
          )}

          <div id="negocio-danjidetail-bid" ref={basicDetailContainerRef}>
            <Separator tw="w-full [min-height: 8px]" />
            <DanjiDetailSection.DetailInfo danji={danji} />
          </div>

          <div id="negocio-danjidetail-sc" ref={danjiSchoolContainerRef}>
            <Separator tw="w-full [min-height: 8px]" />
            <DanjiDetailSection.SchoolInfo danji={danji} onChangeHakgudoActive={onChangeHakgudoActive} />
            <Separator tw="w-full [min-height: 8px]" />
            <DanjiDetailSection.AroundInfo danji={danji} />
          </div>
        </DanjiDetailSection>
        <div id="negocio-danjidetail-bottom" ref={bottomRef} style={{ height: '10px' }} />
      </div>
    </div>
  );
}
