import React from 'react';

import dynamic from 'next/dynamic';

import { DanjiDetailResponse } from '@/services/danji/types';

const InfoHeader = dynamic(import('./InfoHeader'), { ssr: false });

const InfoDetail = dynamic(import('./InfoDetail'), { ssr: false });

export default function Info({
  danji,
  buyOrRent,
  selectedYear,
  onChangeBuyOrRent,
  onChangeSelectedYear,
}: {
  danji: DanjiDetailResponse;
  buyOrRent?: number;
  selectedYear?: number;
  onChangeBuyOrRent?: (value: number) => void;
  onChangeSelectedYear?: (value: number) => void;
}) {
  return (
    <div tw="px-5">
      <div tw="mb-4">
        <span tw="text-b1 [line-height: 1] [letter-spacing: -0.4px] font-bold">단지 실거래 분석</span>
      </div>
      <InfoHeader
        danjiId={danji.danji_id}
        buyOrRent={buyOrRent}
        selectedYear={selectedYear}
        onChangeBuyOrRent={onChangeBuyOrRent}
        onChangeSelectedYear={onChangeSelectedYear}
      />
      <InfoDetail danji={danji} buyOrRent={buyOrRent ?? 0} selectedYear={selectedYear ?? 0} />
    </div>
  );
}
