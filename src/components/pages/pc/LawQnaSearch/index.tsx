import { memo, useCallback } from 'react';

import { Panel } from '@/components/atoms';

import LegalCounselingSearch from '@/components/templates/LegalCounselingSearch';

import { useRouter } from '@/hooks/utils';

import Routes from '@/router/routes';

interface Props {
  depth: number;
  panelWidth: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);

  const anotherRouter = useRouter(1);

  const onSummit = useCallback(
    (value: string) => {
      if (!value) {
        router.replace(Routes.LawQnaSearch, { searchParams: undefined });
        return;
      }

      router.replace(Routes.LawQnaSearch, { searchParams: { q: value }, persistParams: true });
    },
    [router],
  );

  const closePopLast = useCallback(() => {
    anotherRouter.popLast();
  }, [anotherRouter]);

  return (
    <Panel width={panelWidth}>
      <LegalCounselingSearch onSubmit={onSummit} closePopLast={closePopLast} />
    </Panel>
  );
});
