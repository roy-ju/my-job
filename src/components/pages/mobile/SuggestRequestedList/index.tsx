import useAPI_GetMySuggestList from '@/apis/suggest/getMySuggestList';
import { Loading, MobileContainer } from '@/components/atoms';

import { SuggestRequestedList } from '@/components/templates';
import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import { memo, useCallback } from 'react';

export default memo(() => {
  const router = useRouter();

  const { data, isLoading, increamentPageNumber } = useAPI_GetMySuggestList();

  const handleClickRecommendationForm = useCallback(() => {
    router.push(`/${Routes.EntryMobile}/${Routes.RecommendationForm}`);
  }, [router]);

  const handleClickSuggestItem = useCallback(
    (id: number) => {
      router.push(`/${Routes.EntryMobile}/${Routes.MySuggestDetail}?suggestID=${id}`);
    },
    [router],
  );

  const handleClickBack = useCallback(() => {
    router.back();
  }, [router]);

  if (isLoading) {
    return (
      <MobileContainer>
        <div tw="py-20">
          <Loading />
        </div>
      </MobileContainer>
    );
  }

  return (
    <MobileContainer>
      <SuggestRequestedList
        onClickBack={handleClickBack}
        list={data}
        onClickRecommendationForm={handleClickRecommendationForm}
        onClickSuggestItem={handleClickSuggestItem}
        onNext={increamentPageNumber}
      />
    </MobileContainer>
  );
});
