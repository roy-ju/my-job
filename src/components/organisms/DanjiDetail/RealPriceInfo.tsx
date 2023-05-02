import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';
import { GetDanjiRealPricesPyoungListResponse } from '@/apis/danji/danjiRealPricesPyoungList';
import {
  GetDanjiJeonsaerateResponse,
  GetDanjiJeonsaerateSigunguResponse,
  GetDanjiTradeTurnrateResponse,
  GetDanjiTradeTurnrateSigunguResponse,
} from '@/apis/danji/danjiTradeTurnRate';
import React from 'react';
import RealPriceInfoCurrent from './RealPriceInfoCurrent';
import RealPriceInfoHeader from './RealPriceInfoHeader';

export default function RealPriceInfo({
  depth,
  danji,
  buyOrRent,
  danjiTradeTurnRateData,
  danjiTradeTurnRateSigunguData,
  danjiJeonsaeRateRateData,
  danjiJeonsaeRateSigunguData,
  selectedYear,
  onChangeBuyOrRent,
  onChangeSelectedYear,
}: {
  depth: number;
  danji?: GetDanjiDetailResponse;
  buyOrRent?: number;
  danjiRealPricesData?: GetDanjiRealPricesPyoungListResponse;
  danjiRealPricesPyoungList?: GetDanjiRealPricesPyoungListResponse['list'];
  danjiTradeTurnRateData?: GetDanjiTradeTurnrateResponse;
  danjiTradeTurnRateSigunguData?: GetDanjiTradeTurnrateSigunguResponse;
  danjiJeonsaeRateRateData?: GetDanjiJeonsaerateResponse;
  danjiJeonsaeRateSigunguData?: GetDanjiJeonsaerateSigunguResponse;
  selectedYear?: number;
  onChangeBuyOrRent?: (value: number) => void;
  onChangeSelectedYear?: (value: number) => void;
}) {
  return (
    <div tw="px-5">
      <div tw="mb-4">
        <span tw="text-b1 [line-height: 1] [letter-spacing: -0.4px] font-bold">단지 실거래 분석</span>
      </div>
      <RealPriceInfoHeader
        depth={depth}
        buyOrRent={buyOrRent}
        selectedYear={selectedYear}
        onChangeBuyOrRent={onChangeBuyOrRent}
        onChangeSelectedYear={onChangeSelectedYear}
      />
      <RealPriceInfoCurrent
        buyOrRent={buyOrRent}
        danji={danji}
        danjiTradeTurnRateData={danjiTradeTurnRateData}
        danjiTradeTurnRateSigunguData={danjiTradeTurnRateSigunguData}
        danjiJeonsaeRateRateData={danjiJeonsaeRateRateData}
        danjiJeonsaeRateSigunguData={danjiJeonsaeRateSigunguData}
      />
    </div>
  );
}
