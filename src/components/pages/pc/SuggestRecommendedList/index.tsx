import useAPI_GetMySuggestRecommendedList from '@/apis/suggest/getMySuggestRecommendedList';
import { Panel, Loading, AuthRequired } from '@/components/atoms';
import { SuggestRecommendedList as SuggestRecommendedListTemplate } from '@/components/templates';
import { memo, useEffect } from 'react';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { useRouter as useNextRouter } from 'next/router';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ panelWidth, depth }: Props) => {
  const router = useRouter(depth);
  const nextRouter = useNextRouter();

  const { data: suggestRecommendedList, isLoading, increamentPageNumber } = useAPI_GetMySuggestRecommendedList();

  const handleNavigateToSuggestRecommendedDetail = (suggestID: number) => {
    router.replace(Routes.SuggestRecommendedDetail, {
      searchParams: { back: router.asPath, suggestID: `${suggestID}` },
    });
  };

  const handleNavigateToMap = () => {
    router.replace(Routes.Map, {
      searchParams: { back: router.asPath },
    });
  };

  const handleClickBack = () => {
    if (router.query.back) {
      nextRouter.replace(router.query.back as string);
    }
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
    <AuthRequired depth={depth}>
      <Panel width={panelWidth}>
        {isLoading ? (
          <div tw="py-20">
            <Loading />
          </div>
        ) : (
          <SuggestRecommendedListTemplate
            onClickBack={router.query.back ? handleClickBack : undefined}
            suggestRecommendedList={suggestRecommendedList}
            onNextListing={increamentPageNumber}
            onNavigateToSuggestRecommendedDetail={handleNavigateToSuggestRecommendedDetail}
            onNavigateToMap={handleNavigateToMap}
          />
        )}
      </Panel>
    </AuthRequired>
  );
});
