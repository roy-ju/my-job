import { Button } from '@/components/atoms';

import { NavigationHeader, Tabs } from '@/components/molecules';

import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';

import { BuyOrRent, describeJeonsaeWolsaeSame, Year } from '@/constants/enums';

export default function ReapPriceDetailHeader({
  danji,
  buyOrRent,
  selectedYear,
  onChangeBuyOrRent,
  onChangeSelectedYear,
  onClickSelectPage,
  onClickBack,
  onClickTitle,
}: {
  danji?: GetDanjiDetailResponse;
  buyOrRent?: number;
  selectedYear?: number;
  onChangeBuyOrRent?: (value: number) => void;
  onChangeSelectedYear?: (value: number) => void;
  onClickSelectPage?: () => void;
  onClickBack?: () => void;
  onClickTitle?: () => void;
}) {
  if (!danji) return null;

  return (
    <div tw="flex flex-col w-full">
      <NavigationHeader>
        {onClickBack && <NavigationHeader.BackButton onClick={onClickBack} />}
        <NavigationHeader.Title tw="text-inherit">실거래 심층 분석</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="w-full flex items-center justify-between mt-7 mb-3 px-5">
        <button type="button" tw="text-b1 font-bold underline" onClick={onClickTitle}>
          {danji.name}
        </button>
        <Button variant="outlined" size="small" onClick={onClickSelectPage}>
          VS 다른 단지와 비교
        </Button>
      </div>
      <div tw="w-full">
        <div tw="px-5">
          <Tabs variant="contained" value={buyOrRent} onChange={onChangeBuyOrRent}>
            <Tabs.Tab value={BuyOrRent.Buy}>{describeJeonsaeWolsaeSame(BuyOrRent.Buy)}</Tabs.Tab>
            <Tabs.Tab value={BuyOrRent.Jeonsae}>{describeJeonsaeWolsaeSame(BuyOrRent.Jeonsae)}</Tabs.Tab>
            <Tabs.Indicator />
          </Tabs>
        </div>
        <div tw="mt-3 px-5 w-full">
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
