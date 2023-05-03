import React from 'react';
import { Tabs } from '@/components/molecules';
import { BuyOrRent, describeJeonsaeWolsaeSame, Year } from '@/constants/enums';
import { Button } from '@/components/atoms';

import Routes from '@/router/routes';
import { useRouter } from 'next/router';

export default function RealPriceInfoHeader({
  buyOrRent,
  selectedYear,
  isMoreButton = true,
  onChangeBuyOrRent,
  onChangeSelectedYear,
}: {
  buyOrRent?: number;
  selectedYear?: number;
  isMoreButton?: boolean;
  onChangeBuyOrRent?: (value: number) => void;
  onChangeSelectedYear?: (value: number) => void;
}) {
  const router = useRouter();

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
      {isMoreButton && (
        <div tw="mt-4">
          <Button
            variant="primary"
            tw="w-full"
            onClick={() =>
              router.push(
                {
                  pathname: `/${Routes.EntryMobile}/${Routes.DanjiDetail}/${Routes.DanjiRealPriceDetail}`,
                  query: {
                    p: `${router.query.p}`,
                    rt: router.query.rt as string,
                    bor: buyOrRent?.toString() || '',
                    sl: selectedYear?.toString() || '',
                  },
                },
                `/${Routes.EntryMobile}/${Routes.DanjiDetail}/${Routes.DanjiRealPriceDetail}?p=${router.query.p}&rt=${router.query.rt}`,
              )
            }
          >
            실거래 심층분석
          </Button>
        </div>
      )}
    </div>
  );
}
