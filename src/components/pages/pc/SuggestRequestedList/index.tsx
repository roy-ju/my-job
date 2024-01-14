import { memo, useCallback } from 'react';

import { useRouter } from 'next/router';

import { AuthRequired, Loading, Panel } from '@/components/atoms';

import { SuggestRequestedList } from '@/components/templates';

import getPath from '@/utils/getPath';

import Routes from '@/router/routes';

import useAPI_GetMySuggestList from '@/apis/suggest/getMySuggestList';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ panelWidth, depth }: Props) => {
  const router = useRouter();

  const { data, isLoading, increamentPageNumber } = useAPI_GetMySuggestList();

  const handleClickSuggestForm = useCallback(() => {
    const path = getPath({
      depth1: router?.query?.depth1 as NegocioPath,
      depth2: router?.query?.depth2 as NegocioPath,
      targetPath: Routes.SuggestForm as NegocioPath,
    });

    router.push({
      pathname: path,
      query: {
        entry: Routes.SuggestRequestedList,
        ...(router?.query?.danjiID ? { danjiID: `${router.query.danjiID}` } : {}),
        ...(router?.query?.listingID ? { listingID: `${router.query.listingID}` } : {}),
        ...(router?.query?.default ? { default: `${router.query.default}` } : {}),
      },
    });
  }, [router]);

  const handleClickSuggestItem = useCallback(
    (id: number) => {
      const path = getPath({
        depth1: router?.query?.depth1 as NegocioPath,
        depth2: router?.query?.depth2 as NegocioPath,
        targetPath: Routes.MySuggestDetail as NegocioPath,
      });

      router.push({
        pathname: path,
        query: {
          suggestID: `${id}`,
          entry: Routes.SuggestRequestedList,
          ...(router?.query?.danjiID ? { danjiID: `${router.query.danjiID}` } : {}),
          ...(router?.query?.listingID ? { listingID: `${router.query.listingID}` } : {}),
          ...(router?.query?.default ? { default: `${router.query.default}` } : {}),
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
