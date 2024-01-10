import useAPI_GetMySuggestList from '@/apis/suggest/getMySuggestList';
import { AuthRequired, Loading, Panel } from '@/components/atoms';
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

  const handleClickSuggestForm = useCallback(() => {
    router.replace(Routes.SuggestForm, {
      searchParams: {
        entry: 'suggestRequestedList',
      },
    });
  }, [router]);

  const handleClickSuggestItem = useCallback(
    (id: number) => {
      router.replace(Routes.MySuggestDetail, {
        searchParams: {
          suggestID: `${id}`,
          entry: 'suggestRequestedList',
        },
      });
    },
    [router],
  );

  return (
    <AuthRequired depth={depth}>
      <Panel width={panelWidth}>
        {isLoading ? (
          <div tw="py-20">
            <Loading />
          </div>
        ) : (
          <SuggestRequestedList
            list={data}
            onClickSuggestForm={handleClickSuggestForm}
            onClickSuggestItem={handleClickSuggestItem}
            onNext={increamentPageNumber}
          />
        )}
      </Panel>
    </AuthRequired>
  );
});
