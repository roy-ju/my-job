import { useRouter } from 'next/router';

import { Button } from '@/components/atoms';

import { Tabs } from '@/components/molecules';

import { BuyOrRent, describeJeonsaeWolsaeSame, Year } from '@/constants/enums';

import Routes from '@/router/routes';

export default function RealPriceInfoHeader({
  danjiId,
  buyOrRent,
  selectedYear,
  isMoreButton = true,
  onChangeBuyOrRent,
  onChangeSelectedYear,
}: {
  danjiId?: number;
  buyOrRent?: number;
  selectedYear?: number;
  isMoreButton?: boolean;
  onChangeBuyOrRent?: (value: number) => void;
  onChangeSelectedYear?: (value: number) => void;
}) {
  const router = useRouter();

  const handleCTA = () => {
    router.push(
      {
        pathname: `/${Routes.EntryMobile}/${Routes.DanjiRealPriceDetail}`,
        query: {
          danjiID: `${danjiId}` || `${router.query.danjiID}` || '',
          bor: buyOrRent?.toString() || '',
          sl: selectedYear?.toString() || '',
        },
      },
      `/${Routes.EntryMobile}/${Routes.DanjiRealPriceDetail}?danjiID=${router.query.danjiID}`,
    );
  };

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
          <Button variant="outlined" tw="w-full" onClick={() => handleCTA()}>
            실거래 심층분석
          </Button>
        </div>
      )}
    </div>
  );
}
