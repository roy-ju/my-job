import { Panel, Loading } from '@/components/atoms';
import { memo } from 'react';
import { SuggestUpdate as SuggestUpdateTemplate } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import useAPI_GetSuggestDetail from '@/apis/suggest/getSuggestDetail';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);
  const suggestID = Number(router.query.suggestID) ?? 0;

  const { isLoading } = useAPI_GetSuggestDetail(suggestID);

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
      <SuggestUpdateTemplate />
    </Panel>
  );
});
