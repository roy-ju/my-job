import { DanjiDetailResponse } from '@/services/danji/types';

import RealPriceInfoCurrent from './RealPriceInfoCurrent';

import RealPriceInfoHeader from './RealPriceInfoHeader';

export default function RealPriceInfo({
  danji,
  buyOrRent,
  selectedYear,
  onChangeBuyOrRent,
  onChangeSelectedYear,
}: {
  danji?: DanjiDetailResponse;
  buyOrRent?: number;
  selectedYear?: number;
  onChangeBuyOrRent?: (value: number) => void;
  onChangeSelectedYear?: (value: number) => void;
}) {
  if (!danji) return null;

  return (
    <div tw="px-5">
      <div tw="mb-4">
        <span tw="text-b1 [line-height: 1] [letter-spacing: -0.4px] font-bold">단지 실거래 분석</span>
      </div>
      <RealPriceInfoHeader
        danjiId={danji.danji_id}
        buyOrRent={buyOrRent}
        selectedYear={selectedYear}
        onChangeBuyOrRent={onChangeBuyOrRent}
        onChangeSelectedYear={onChangeSelectedYear}
      />
      <RealPriceInfoCurrent danji={danji} buyOrRent={buyOrRent} selectedYear={selectedYear} />
    </div>
  );
}
