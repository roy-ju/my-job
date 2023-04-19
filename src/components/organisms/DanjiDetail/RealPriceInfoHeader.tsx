import React from 'react';
import { Tabs } from '@/components/molecules';
import { BuyOrRent, describeJeonsaeWolsaeSame, Year } from '@/constants/enums';
import { Button } from '@/components/atoms';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';

export default function RealPriceInfoHeader({
  depth,
  buyOrRent,
  selectedYear,
  onChangeBuyOrRent,
  onChangeSelectedYear,
}: {
  depth: number;
  buyOrRent?: number;
  selectedYear?: number;
  onChangeBuyOrRent?: (value: number) => void;
  onChangeSelectedYear?: (value: number) => void;
}) {
  const router = useRouter(depth);

  if (!buyOrRent) return null;

  return (
    <div>
      <div>
        <Tabs variant="contained" value={buyOrRent} onChange={onChangeBuyOrRent}>
          <Tabs.Tab value={BuyOrRent.Buy}>{describeJeonsaeWolsaeSame(BuyOrRent.Buy)}</Tabs.Tab>
          <Tabs.Tab value={BuyOrRent.Jeonsae}>{describeJeonsaeWolsaeSame(BuyOrRent.Jeonsae)}</Tabs.Tab>
          <Tabs.Indicator />
        </Tabs>
      </div>
      <div tw="mt-3">
        <Tabs variant="outlined" value={selectedYear} onChange={onChangeSelectedYear}>
          <Tabs.Tab value={Year.One}>{Year.One}년</Tabs.Tab>
          <Tabs.Tab value={Year.Three}>{Year.Three}년</Tabs.Tab>
          <Tabs.Tab value={Year.Five}>{Year.Five}년</Tabs.Tab>
          <Tabs.Indicator />
        </Tabs>
      </div>
      <div tw="mt-4">
        <Button
          variant="primary"
          tw="w-full"
          onClick={() =>
            router.push(Routes.DanjiRealPriceDetail, {
              searchParams: { p: `${router.query.p}`, rt: router.query.rt as string },
              state: { bor: buyOrRent?.toString() || '', sl: selectedYear?.toString() || '' },
            })
          }
        >
          실거래 심층분석
        </Button>
      </div>
    </div>
  );
}
