import { Loading, MobAuthRequired, MobileContainer } from '@/components/atoms';
import { SuggestRecommendedList as SuggestRecommendedListTemplate } from '@/components/templates';
import { useRouter } from 'next/router';
import { memo, useEffect } from 'react';
import useAPI_GetMySuggestRecommendedList from '@/apis/suggest/getMySuggestRecommendedList';
import Routes from '@/router/routes';

export default memo(() => {
  const router = useRouter();

  const { data: suggestRecommendedList, isLoading, increamentPageNumber } = useAPI_GetMySuggestRecommendedList();

  const handleNavigateMap = () => {
    router.push(`/${Routes.EntryMobile}/${Routes.Map}`);
  };

  const handleNavigateToSuggestRecommendedDetail = (suggestID: number) => {
    router.push(`/${Routes.EntryMobile}/${Routes.SuggestRecommendedDetail}?suggestID=${suggestID}`);
  };

  useEffect(() => {
    if (router?.query?.suggestRecommendID) {
      const element = document.getElementById(`recommendItem-${router.query.suggestRecommendID}`);

      if (element) {
        element.scrollIntoView(true);
      }
    }
  }, [router?.query?.suggestRecommendID]);

  return (
    <MobAuthRequired>
      <MobileContainer>
        {isLoading ? (
          <div tw="py-20">
            <Loading />
          </div>
        ) : (
          <SuggestRecommendedListTemplate
            suggestRecommendedList={suggestRecommendedList}
            onNextListing={increamentPageNumber}
            onNavigateToMap={handleNavigateMap}
            onNavigateToSuggestRecommendedDetail={handleNavigateToSuggestRecommendedDetail}
            onClickBack={() => {
              router.back();
            }}
          />
        )}
      </MobileContainer>
    </MobAuthRequired>
  );
});
