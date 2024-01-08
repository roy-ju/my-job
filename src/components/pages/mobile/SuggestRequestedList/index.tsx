import useAPI_GetMySuggestList from '@/apis/suggest/getMySuggestList';
import { Loading, MobAuthRequired, MobileContainer } from '@/components/atoms';

import { SuggestRequestedList } from '@/components/templates';
import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import { memo, useCallback } from 'react';

export default memo(() => {
  const router = useRouter();

  const { data, isLoading, increamentPageNumber } = useAPI_GetMySuggestList();

  const handleClickRecommendationForm = useCallback(() => {
    router.push({
      pathname: `/${Routes.EntryMobile}/${Routes.RecommendationForm}`,
      query: { entry: 'suggestRequestedList' },
    });
  }, [router]);

  const handleClickSuggestItem = useCallback(
    (id: number) => {
      router.push(`/${Routes.EntryMobile}/${Routes.MySuggestDetail}?suggestID=${id}`);
    },
    [router],
  );

  const handleClickBack = useCallback(() => {
    if (typeof window !== 'undefined') {
      const canGoBack = window.history.length > 1;

      if (canGoBack) {
        router.replace(`/${Routes.EntryMobile}/${Routes.My}?default=1`);
      } else {
        router.replace(`/${Routes.EntryMobile}/${Routes.My}?default=1`);
      }
    }
  }, [router]);

  return (
    <MobAuthRequired>
      <MobileContainer>
        {isLoading ? (
          <div tw="py-20">
            <Loading />
          </div>
        ) : (
          <SuggestRequestedList
            onClickBack={handleClickBack}
            list={data}
            onClickRecommendationForm={handleClickRecommendationForm}
            onClickSuggestItem={handleClickSuggestItem}
            onNext={increamentPageNumber}
          />
        )}
      </MobileContainer>
    </MobAuthRequired>
  );
});
