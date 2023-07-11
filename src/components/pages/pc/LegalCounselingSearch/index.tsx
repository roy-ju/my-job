import { Panel } from '@/components/atoms';
import LegalCounselingSearch from '@/components/templates/LegalCounselingSearch';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { memo } from 'react';

interface Props {
  depth: number;
  panelWidth: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);

  const routerFirst = useRouter(0);

  const onSummit = (value: string) => {
    if (!value) {
      router.popLast();
    } else {
      routerFirst.replace(Routes.LawQna, { searchParams: { search: value } });
    }
  };

  return (
    <Panel width={panelWidth}>
      <LegalCounselingSearch onSubmit={onSummit} />
    </Panel>
  );
});
