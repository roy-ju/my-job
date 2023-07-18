import { useAPI_GetDanjiDetail } from '@/apis/danji/danjiDetail';
import { Panel } from '@/components/atoms';
import { DanjiSelect as DanjiSelectTemplate } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { useCallback, useEffect, useState } from 'react';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default function DanjiSelect({ depth, panelWidth }: Props) {
  const router = useRouter(depth);

  const [buyOrRent, setBuyOrRent] = useState<number>();
  const [selectedYear, setSelectedYear] = useState<number>();

  const { danji } = useAPI_GetDanjiDetail({
    danjiId: router?.query?.danjiID ? Number(router.query.danjiID) : undefined,
    realestateType: router?.query?.rt ? Number(router.query.rt) : undefined,
  });

  const handleClickBackButton = useCallback(() => {
    if (router.query.listingID) {
      router.replace(Routes.DanjiRealPriceDetail, {
        searchParams: {
          listingID: router.query.listingID as string,
          danjiID: router.query.danjiID as string,
          rt: router.query.rt as string,
        },
        state: { bor: buyOrRent?.toString() || '', sl: selectedYear?.toString() || '' },
      });
    } else {
      router.replace(Routes.DanjiRealPriceDetail, {
        searchParams: { danjiID: `${router.query.danjiID}`, rt: router.query.rt as string },
        state: { bor: buyOrRent?.toString() || '', sl: selectedYear?.toString() || '' },
      });
    }
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
    if (router.query.listingID) {
      router.replace(Routes.DanjiRealTradeDetail, {
        searchParams: {
          listingID: router.query.listingID as string,
          danjiID: router.query.danjiID as string,
          rt: router.query.rt as string,
        },
        state: { bor: buyOrRent?.toString() || '', sl: selectedYear?.toString() || '' },
      });
    } else {
      router.replace(Routes.DanjiRealTradeDetail, {
        searchParams: { danjiID: `${router.query.danjiID}`, rt: router.query.rt as string },
        state: { bor: buyOrRent?.toString() || '', sl: selectedYear?.toString() || '' },
      });
    }
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
    <Panel width={panelWidth}>
      <DanjiSelectTemplate
        depth={depth}
        danji={danji}
        handleClickBackButton={handleClickBackButton}
        handleClickTradePage={handleClickTradePage}
      />
    </Panel>
  );
}
