import useAPI_GetMySuggestList from '@/apis/suggest/getMySuggestList';
import { Loading, Panel } from '@/components/atoms';
import { SuggestRequestedList } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { memo, useCallback } from 'react';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ panelWidth, depth }: Props) => {
  const router = useRouter(depth);

  const { data, isLoading, increamentPageNumber } = useAPI_GetMySuggestList();

  const handleClickRecommendationForm = useCallback(() => {
    router.replace(Routes.RecommendationForm, {
      searchParams: {
        back: router.asPath,
      },
    });
  }, [router]);

  const handleClickSuggestItem = useCallback(
    (id: number) => {
      router.replace(Routes.MySuggestDetail, {
        searchParams: {
          suggestID: `${id}`,
        },
      });
    },
    [router],
  );

  if (isLoading) {
    return (
      <Panel width={panelWidth}>
        <div tw="py-20">
          <Loading />
        </div>
      </Panel>
    );
  }

  return (
    <Panel width={panelWidth}>
      <SuggestRequestedList
        list={data}
        onClickRecommendationForm={handleClickRecommendationForm}
        onClickSuggestItem={handleClickSuggestItem}
        onNext={increamentPageNumber}
      />
    </Panel>
  );
});
