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
    pnu: router?.query?.p as string,
    realestateType: router?.query?.rt ? Number(router.query.rt) : undefined,
  });

  const handleClickBackButton = useCallback(() => {
    router.replace(Routes.DanjiRealPriceDetail, {
      searchParams: { p: `${router.query.p}`, rt: router.query.rt as string },
      state: { bor: buyOrRent?.toString() || '', sl: selectedYear?.toString() || '' },
    });
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
    router.replace(Routes.DanjiRealTradeDetail, {
      searchParams: { p: `${router.query.p}`, rt: router.query.rt as string },
      state: { bor: buyOrRent?.toString() || '', sl: selectedYear?.toString() || '' },
    });
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
