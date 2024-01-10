import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';
import { Button } from '@/components/atoms';
import { NavigationHeader, Tabs } from '@/components/molecules';
import { BuyOrRent, describeJeonsaeWolsaeSame, Year } from '@/constants/enums';

import React from 'react';

export default function ReapTradeDetailHeader({
  danji,
  buyOrRent,
  selectedYear,
  onChangeBuyOrRent,
  onChangeSelectedYear,
  onClickBackButton,
  onClickSelectPage,
}: {
  danji?: GetDanjiDetailResponse;
  buyOrRent?: number;
  selectedYear?: number;
  onChangeBuyOrRent?: (value: number) => void;
  onChangeSelectedYear?: (value: number) => void;
  onClickBackButton?: () => void;
  onClickSelectPage?: () => void;
}) {
  if (!danji) return null;

  return (
    <div tw="flex flex-col w-full">
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={onClickBackButton} />
        <NavigationHeader.Title tw="text-inherit">실거래 심층 분석</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="flex items-center justify-between mb-2 px-5">
        <span tw="text-b1 [line-height: 1] font-bold">{danji.name}</span>
        <Button variant="outlined" size="small" selected onClick={onClickSelectPage}>
          VS 다른 단지와 비교
        </Button>
      </div>
      <div>
        <div tw="px-5">
          <Tabs variant="contained" value={buyOrRent} onChange={onChangeBuyOrRent}>
            <Tabs.Tab value={BuyOrRent.Buy}>{describeJeonsaeWolsaeSame(BuyOrRent.Buy)}</Tabs.Tab>
            <Tabs.Tab value={BuyOrRent.Jeonsae}>{describeJeonsaeWolsaeSame(BuyOrRent.Jeonsae)}</Tabs.Tab>
            <Tabs.Indicator />
          </Tabs>
        </div>
        <div tw="mt-3 px-5">
          <Tabs variant="outlined" value={selectedYear} onChange={onChangeSelectedYear}>
            <Tabs.Tab value={Year.One}>{Year.One}년</Tabs.Tab>
            <Tabs.Tab value={Year.Three}>{Year.Three}년</Tabs.Tab>
            <Tabs.Tab value={Year.Five}>{Year.Five}년</Tabs.Tab>
            <Tabs.Indicator />
          </Tabs>
        </div>
      </div>
    </div>
  );
}
