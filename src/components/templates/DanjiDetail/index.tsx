/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { Separator } from '@/components/atoms';
import { DanjiDetailSection } from '@/components/organisms';
import tw from 'twin.macro';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import { MonthStartDate } from '@/components/pages/pc/DanjiDetail/useXAxisDate';
import { BuyOrRent, describeJeonsaeWolsaeSame } from '@/constants/enums';
import { DanjiRealPricesListItem, DanjiRealPricesListResponse } from '@/apis/danji/danjiRealPricesList';
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
  danji?: GetDanjiDetailResponse;
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
}

export default function DanjiDetail({
  danji,
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
  selectedJeonyongArea,
  selectedJeonyongAreaMax,
  isShowDanjiPhotos,
  onClickListingDetail,
  onChangeChecked,
  onChangeBuyOrRent,
  onChangeSelectedYear,
  onChangeSelectedIndex,
  onChangeSelectedArea,
  onChangeSelectedJeonyongArea,
  onChangeSelectedJeonyongAreaMax,
  danjiRealPriesListSetSize,
}: Props) {
  if (!danji) return null;

  return (
    <div tw="flex flex-col h-full">
      <DanjiDetailSection>
        <div tw="pt-6" css={[danjiListings && danjiListings.slice(0, 3).length === 3 ? tw`pb-10` : tw`pb-1`]}>
          <DanjiDetailSection.Info danji={danji} />
          {danjiListings && danjiListings.length > 0 && (
            <>
              <DanjiDetailSection.ActiveInfo danjiListings={danjiListings} onClick={onClickListingDetail} />
            </>
          )}
        </div>

        <Separator tw="w-full [min-height: 8px] h-2 bg-gray-300" />

        {danjiRealPricesPyoungList && danjiRealPricesPyoungList.length > 0 && (
          <>
            <div tw="pt-10">
              <DanjiDetailSection.RealPriceInfo
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
            />
          </>
        )}
        <Separator tw="w-full [min-height: 8px] h-2 bg-gray-300" />
        <DanjiDetailSection.DetailInfo danji={danji} />
        <Separator tw="w-full [min-height: 8px] h-2 bg-gray-300" />
        <DanjiDetailSection.SchoolInfo danji={danji} />
      </DanjiDetailSection>
    </div>
  );
}
