import useAPI_GetMySuggestDetail from '@/apis/suggest/getMySuggestDetail';
import { Panel } from '@/components/atoms';
import { SuggestDetail } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { memo } from 'react';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ panelWidth, depth }: Props) => {
  const router = useRouter(depth);
  const suggestID = Number(router.query.suggestID) ?? 0;

  useAPI_GetMySuggestDetail(suggestID);

  return (
    <Panel width={panelWidth}>
      <SuggestDetail onClickBack={() => router.replace(Routes.SuggestRequestedList)} />
    </Panel>
  );
});
