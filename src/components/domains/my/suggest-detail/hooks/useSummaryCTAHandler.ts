import { useCallback, useMemo, useState } from 'react';

import { useRouter } from 'next/router';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import Routes from '@/router/routes';

import { SuggestDetailResponse } from '@/services/suggests/types';

import { DanjiOrRegionalType } from '@/constants/enums';

export default function useSummaryCTAHandler({ data }: { data?: (SuggestDetailResponse & ErrorResponse) | null }) {
  const router = useRouter();

  const { platform } = useCheckPlatform();

  const [openSummaryDetail, setOpenSummaryDetail] = useState(false);

  const danjiID = useMemo(() => data?.danji_id ?? 0, [data]);

  const renderRoutingDanjiDetailButton = useMemo(() => {
    if (data?.danji_or_regional === DanjiOrRegionalType.Danji && data?.danji_id) {
      return true;
    }

    return false;
  }, [data]);

  const handleClickOpenSummaryDetail = useCallback(() => {
    setOpenSummaryDetail((prev) => !prev);
  }, []);

  const handleRouterDanjiDetail = useCallback(() => {
    if (!danjiID) return;

    if (platform === 'pc') {
      const depth1 = router?.query?.depth1 ?? '';
      const depth2 = router?.query?.depth2 ?? '';

      const query = router.query;

      delete query.depth1;
      delete query.depth2;

      if (depth1 && !depth2) {
        router.push({
          pathname: `/${Routes.DanjiDetail}`,
          query: {
            ...query,
            danjiID: `${danjiID}`,
          },
        });
      } else if (depth1 && depth2) {
        router.push({
          pathname: `/${depth1}/${Routes.DanjiDetail}`,
          query: {
            ...query,
            danjiID: `${danjiID}`,
          },
        });
      }
    }

    if (platform === 'mobile') {
      router.push(`/${Routes.EntryMobile}/${Routes.DanjiDetail}?danjiID=${danjiID}`);
    }
  }, [danjiID, platform, router]);

  return {
    openSummaryDetail,
    renderRoutingDanjiDetailButton,
    handleRouterDanjiDetail,
    handleClickOpenSummaryDetail,
  };
}
