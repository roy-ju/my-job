/* eslint-disable @typescript-eslint/no-unused-vars */
import { Panel } from '@/components/atoms';
import { RecommendGuide } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import { useRouter as useNextRouter } from 'next/router';
import Routes from '@/router/routes';

import { memo, useCallback, useMemo } from 'react';

interface Props {
  depth: number;
  panelWidth?: string;
  ipAddress?: string;
}

export default memo(({ panelWidth, depth }: Props) => {
  const router = useRouter(depth);
  const nextRouter = useNextRouter();

  // 매물 등록 홈 아래쪽 지도에서 넘어갈때 쿼리
  const address = useMemo(
    () => (router?.query?.address ? (router.query.address as string) : ''),
    [router?.query?.address],
  );

  // 단지 상세에서 넘어갈때 쿼리
  const entry = useMemo(() => (router?.query?.entry ? (router.query.entry as string) : ''), [router?.query?.entry]);
  const danjiID = useMemo(
    () => (router?.query?.danjiID ? (router.query.danjiID as string) : ''),
    [router?.query?.danjiID],
  );

  const redirect = useMemo(
    () => (router?.query?.redirect ? (router.query.redirect as string) : ''),
    [router?.query?.redirect],
  );

  const handleClickSuggestion = useCallback(async () => {
    if (entry === 'map') {
      router.replace(Routes.SuggestRegionalForm, {
        searchParams: {
          ...(address ? { address } : {}),
        },
      });

      return;
    }

    if (entry && danjiID && redirect) {
      if (entry === `danji${Routes.SuggestListings}}`) {
        nextRouter.replace({
          pathname: `/${Routes.SuggestListings}/${Routes.DanjiRecommendation}`,
          query: { entry, danjiID, redirect },
        });
        return;
      }

      nextRouter.replace({
        pathname: `/${Routes.DanjiDetail}/${Routes.DanjiRecommendation}`,
        query: { entry, danjiID, redirect },
      });
      return;
    }

    router.replace(Routes.RecommendationForm, {
      searchParams: {
        back: router.asPath,
      },
    });
  }, [address, danjiID, entry, nextRouter, redirect, router]);

  const handleClickBack = useCallback(() => {
    nextRouter.replace(router.query.back as string);
  }, [router, nextRouter]);

  return (
    <Panel width={panelWidth}>
      <RecommendGuide
        title="매물 구해요"
        onClickCTA={handleClickSuggestion}
        onClickBack={router?.query?.back ? handleClickBack : undefined}
      />
    </Panel>
  );
});
