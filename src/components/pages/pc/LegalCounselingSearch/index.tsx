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

  const routerFirst = useRouter(1);

  const onSummit = (value: string) => {
    if (!value) {
      router.replace(Routes.LawQnaSearch, { searchParams: undefined });
      return;
    }

    router.replace(Routes.LawQnaSearch, { searchParams: { q: value }, persistParams: true });
  };

  const closePopLast = () => {
    routerFirst.popLast();
  };

  return (
    <Panel width={panelWidth}>
      <LegalCounselingSearch onSubmit={onSummit} closePopLast={closePopLast} />
    </Panel>
  );
});
