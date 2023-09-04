import useAPI_GetSuggestDetail from '@/apis/suggest/getSuggestDetail';
import { AuthRequired, Loading, Panel } from '@/components/atoms';
import { SuggestDetail } from '@/components/templates';
import { useRouter } from '@/hooks/utils';

import { memo, useCallback, useMemo } from 'react';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ panelWidth, depth }: Props) => {
  const router = useRouter(depth);

  const suggestID = router?.query?.suggestID ? Number(router.query.suggestID) : undefined;

  const { data, isLoading } = useAPI_GetSuggestDetail(suggestID);

  const disabledCTA = useMemo(() => false, []);

  const isExistMySuggested = useMemo(() => true, []);

  const handleClickCTA = useCallback(() => {}, []);

  return (
    <AuthRequired depth={depth}>
      <Panel width={panelWidth}>
        {isLoading ? (
          <div tw="py-20">
            <Loading />
          </div>
        ) : data ? (
          <SuggestDetail
            data={data}
            isExistMySuggested={isExistMySuggested}
            disabledCTA={disabledCTA}
            onClickCTA={handleClickCTA}
          />
        ) : null}
      </Panel>
    </AuthRequired>
  );
});
