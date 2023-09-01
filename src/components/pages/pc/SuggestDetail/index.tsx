import useAPI_GetSuggestDetail from '@/apis/suggest/getSuggestDetail';
import { Loading, Panel } from '@/components/atoms';
import { SuggestDetail } from '@/components/templates';
import { useRouter } from '@/hooks/utils';

import { memo } from 'react';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ panelWidth, depth }: Props) => {
  const router = useRouter(depth);

  const suggestID = router?.query?.suggestID ? Number(router.query.suggestID) : undefined;

  const { data, isLoading } = useAPI_GetSuggestDetail(suggestID);

  if (isLoading) {
    return (
      <Panel width={panelWidth}>
        <div tw="py-20">
          <Loading />
        </div>
      </Panel>
    );
  }

  if (!data) return null;

  return (
    <Panel width={panelWidth}>
      <SuggestDetail data={data} />
    </Panel>
  );
});
