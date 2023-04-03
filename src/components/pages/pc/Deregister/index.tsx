import { Panel } from '@/components/atoms';
import { Deregister as DeregisterTemplate } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { memo, useCallback } from 'react';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);

  const handleClickBackButton = useCallback(() => {
    router.replace(Routes.MyDetail);
  }, [router]);

  const handleClickNext = useCallback(() => {
    router.replace(Routes.DeregisterDisclaimer);
  }, [router]);

  return (
    <Panel width={panelWidth}>
      <DeregisterTemplate onClickBackButton={handleClickBackButton} onClickNext={handleClickNext} />
    </Panel>
  );
});
