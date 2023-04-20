import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';
import { Separator } from '@/components/atoms';
import React from 'react';
import RealPriceDanjiListAll from '../RealPriceDetail/RealPriceDanjiListAll/RealPriceDanjiListAll';
import { RealPriceAllListWrraper } from '../RealPriceDetail/RealPriceListAll/RealPriceAllListWrraper';
import { RealTradeTotalChartWrraper } from './RealTradeTotal/RealTradeTotalChartWrraper';
import { RealTradeTrendChartWrraper } from './RealTradeTrendsChart/RealTradeTrendChartWrraper';
import { RealTradeValuesChartWrraper } from './RealTradeValuesChart/RealTradeValuesChartWrraper';

type ComparisonList = {
  colorCode: string;
  name: string;
  pnu: string;
  rt: number;
}[];

export default function RealTradeDetailContent({
  danji,
  buyOrRent,
  selectedYear,
  comparisonList,
}: {
  danji?: GetDanjiDetailResponse;
  buyOrRent?: number;
  selectedYear?: number;
  comparisonList: ComparisonList;
}) {
  return (
    <div tw="pt-6">
      <div tw="mb-10 px-5">
        <span tw="font-bold text-b1 [line-height: 19px]">실거래 비교 분석 결과</span>
      </div>
      <div tw="flex flex-col gap-10 px-5 pb-14">
        <RealTradeTrendChartWrraper
          danji={danji}
          buyOrRent={buyOrRent}
          selectedYear={selectedYear}
          comparisonList={comparisonList}
        />
        <RealTradeValuesChartWrraper
          danji={danji}
          buyOrRent={buyOrRent}
          selectedYear={selectedYear}
          comparisonList={comparisonList}
        />
        <RealTradeTotalChartWrraper
          danji={danji}
          buyOrRent={buyOrRent}
          selectedYear={selectedYear}
          comparisonList={comparisonList}
        />
      </div>
      <Separator tw="min-h-[8px] min-w-[1px] bg-gray-300" />
      <RealPriceDanjiListAll danji={danji} buyOrRent={buyOrRent} />
      <Separator tw="min-h-[8px] min-w-[1px] bg-gray-300" />
      <RealPriceAllListWrraper danji={danji} buyOrRent={buyOrRent} />
    </div>
  );
}
