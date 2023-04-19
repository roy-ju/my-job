import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';
import { Separator } from '@/components/atoms';
import React from 'react';
import { RealPriceAllListWrraper } from './RealPriceListAll/RealPriceAllListWrraper';
import { RealPriceTAndVChartWrraper } from './RealPriceTAndVChart/RealPriceTAndVChartWrraper';
import { RealPriceTradeTrendChartWrraper } from './RealPriceTradeTrends/RealPriceTradeTrendChartWrraper';
import { RealPriceTrendChartWrraper } from './RealPriceTrendsChart/RealPriceTrendChartWrraper';
import { RealPriceValuesChartWrraper } from './RealPriceValuesChart/RealPriceValuesChartWrraper';

export default function RealPriceDetailContent({
  danji,
  buyOrRent,
  selectedYear,
}: {
  danji?: GetDanjiDetailResponse;
  buyOrRent?: number;
  selectedYear?: number;
}) {
  return (
    <div tw="pt-6">
      <div tw="mb-10 px-5">
        <span tw="font-bold text-b1 [line-height: 19px]">실거래가 추이</span>
      </div>
      <div tw="flex flex-col gap-10 px-5 pb-14">
        <RealPriceTrendChartWrraper danji={danji} buyOrRent={buyOrRent} selectedYear={selectedYear} />

        <RealPriceValuesChartWrraper danji={danji} buyOrRent={buyOrRent} selectedYear={selectedYear} />

        <RealPriceTAndVChartWrraper danji={danji} buyOrRent={buyOrRent} selectedYear={selectedYear} />

        <RealPriceTradeTrendChartWrraper danji={danji} buyOrRent={buyOrRent} selectedYear={selectedYear} />
      </div>
      <Separator tw="min-h-[8px] min-w-[1px] bg-gray-300" />
      <RealPriceAllListWrraper danji={danji} buyOrRent={buyOrRent} />
    </div>
  );
}
