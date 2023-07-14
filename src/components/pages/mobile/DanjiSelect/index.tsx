import { useAPI_GetDanjiDetail } from '@/apis/danji/danjiDetail';
import { Loading, MobileContainer } from '@/components/atoms';
import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const MobDanjiSelect = dynamic(() => import('@/components/templates/MobDanjiSelect'), {
  loading: () => <Loading />,
  ssr: false,
});

export default function DanjiSelect() {
  const router = useRouter();

  const [buyOrRent, setBuyOrRent] = useState<number>();
  const [selectedYear, setSelectedYear] = useState<number>();

  const { danji } = useAPI_GetDanjiDetail({
    danjiId: router?.query?.danjiID ? Number(router.query.danjiID) : null,
    realestateType: router?.query?.rt ? Number(router.query.rt) : undefined,
  });

  const handleClickBackButton = useCallback(() => {
    router.replace(
      {
        pathname: `/${Routes.EntryMobile}/${Routes.DanjiRealPriceDetail}`,
        query: {
          listingID: router.query.listingID as string,
          danjiID: `${router.query.danjiID}`,
          rt: router.query.rt as string,
          bor: buyOrRent?.toString() || '',
          sl: selectedYear?.toString() || '',
        },
      },
      `/${Routes.EntryMobile}/${Routes.DanjiRealPriceDetail}?danjiID=${router.query.danjiID}&rt=${
        router.query.rt as string
      }`,
    );
  }, [buyOrRent, router, selectedYear]);

  useEffect(() => {
    if (router?.query?.bor) {
      setBuyOrRent(Number(router.query.bor));
    }

    if (router?.query?.sl) {
      setSelectedYear(Number(router.query.sl));
    }
  }, [router.query]);

  const handleClickTradePage = useCallback(() => {
    router.replace(
      {
        pathname: `/${Routes.EntryMobile}/${Routes.DanjiRealTradeDetail}`,
        query: {
          danjiID: `${router.query.danjiID}`,
          rt: router.query.rt as string,
          bor: buyOrRent?.toString() || '',
          sl: selectedYear?.toString() || '',
        },
      },
      `/${Routes.EntryMobile}/${Routes.DanjiRealTradeDetail}?danjiID=${router.query.danjiID}&rt=${router.query.rt}`,
    );
  }, [buyOrRent, router, selectedYear]);

  useEffect(() => {
    if (router?.query?.bor) {
      setBuyOrRent(Number(router.query.bor));
    }

    if (router?.query?.sl) {
      setSelectedYear(Number(router.query.sl));
    }
  }, [router.query]);

  return (
    <MobileContainer>
      <MobDanjiSelect
        danji={danji}
        handleClickBackButton={handleClickBackButton}
        handleClickTradePage={handleClickTradePage}
      />
    </MobileContainer>
  );
}
