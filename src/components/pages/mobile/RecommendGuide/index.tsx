import { MobileContainer } from '@/components/atoms';
import { RecommendGuide } from '@/components/templates';
import Routes from '@/router/routes';
import { useRouter } from 'next/router';

import { memo, useCallback, useMemo } from 'react';

export default memo(() => {
  const router = useRouter();

  // 매물 등록 홈 아래쪽 지도에서 넘어갈때 쿼리
  const address = useMemo(
    () => (router?.query?.address ? (router.query.address as string) : ''),
    [router?.query?.address],
  );

  const entry = useMemo(() => (router?.query?.entry ? (router.query.entry as string) : ''), [router?.query?.entry]);

  const danjiID = useMemo(
    () => (router?.query?.danjiID ? (router.query.danjiID as string) : ''),
    [router?.query?.danjiID],
  );

  const redirect = useMemo(
    () => (router?.query?.redirect ? (router.query.redirect as string) : ''),
    [router?.query?.redirect],
  );

  const origin = useMemo(() => (router?.query?.origin ? (router.query.origin as string) : ''), [router?.query?.origin]);

  const handleClickSuggestion = useCallback(async () => {
    if (entry === 'map') {
      router.push({
        pathname: `/${Routes.EntryMobile}/${Routes.SuggestRegionalForm}`,
        query: { ...(address ? { address } : {}), ...(entry ? { entry } : {}), ...(origin ? { origin } : {}) },
      });

      return;
    }

    if (entry && danjiID && redirect) {
      router.push({
        pathname: `/${Routes.EntryMobile}/${Routes.DanjiRecommendation}`,
        query: { entry, danjiID, redirect, ...(origin ? { origin } : {}) },
      });
      return;
    }

    router.push({
      pathname: `/${Routes.EntryMobile}/${Routes.RecommendationForm}`,
      query: { ...(origin ? { origin } : {}) },
    });
  }, [address, danjiID, entry, redirect, origin, router]);

  const handleGoBack = useCallback(() => {
    if (typeof window !== 'undefined') {
      const navigationIndex = window.history.state?.idx;
      const canGoBack = navigationIndex !== 0;

      if (canGoBack) {
        router.back();
      } else {
        router.replace('/');
      }
    }
  }, [router]);

  return (
    <MobileContainer>
      <RecommendGuide title="매물 구해요" onClickCTA={handleClickSuggestion} onClickBack={handleGoBack} />
    </MobileContainer>
  );
});
