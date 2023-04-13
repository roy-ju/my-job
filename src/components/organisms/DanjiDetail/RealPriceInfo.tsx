import { GetDanjiRealPricesPyoungListResponse } from '@/apis/danji/danjiRealPricesPyoungList';
import React from 'react';
import RealPriceInfoCurrent from './RealPriceInfoCurrent';
import RealPriceInfoHeader from './RealPriceInfoHeader';

export default function RealPriceInfo({
  buyOrRent,
  danjiRealPricesData,
  danjiRealPricesPyoungList,
  selectedYear,
  onChangeBuyOrRent,
  onChangeSelectedYear,
}: {
  buyOrRent?: number;
  danjiRealPricesData?: GetDanjiRealPricesPyoungListResponse;
  danjiRealPricesPyoungList?: GetDanjiRealPricesPyoungListResponse['list'];
  selectedYear?: number;
  onChangeBuyOrRent?: (value: number) => void;
  onChangeSelectedYear?: (value: number) => void;
}) {
  if (!danjiRealPricesData) return null;

  return (
    <div tw="px-5">
      <div tw="mb-4">
        <span tw="text-b1 [line-height: 1] font-bold">단지 실거래 분석</span>
      </div>
      <RealPriceInfoHeader
        buyOrRent={buyOrRent}
        selectedYear={selectedYear}
        onChangeBuyOrRent={onChangeBuyOrRent}
        onChangeSelectedYear={onChangeSelectedYear}
      />
      <RealPriceInfoCurrent />
    </div>
  );
}
