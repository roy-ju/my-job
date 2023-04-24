import useAPI_GetMySuggestDetail from '@/apis/suggest/getMySuggestDetail';
import { Loading, Panel } from '@/components/atoms';
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

  const { data, isLoading } = useAPI_GetMySuggestDetail(suggestID);

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
      <SuggestDetail suggestData={data} onClickBack={() => router.replace(Routes.SuggestRequestedList)} />
    </Panel>
  );
});
