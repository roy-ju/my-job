import { Panel } from '@/components/atoms';
import { RegisterSuccess } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { memo, useCallback } from 'react';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);

  const handleLeave = useCallback(() => {
    router.pop();
  }, [router]);

  const navigateToVerifyCi = useCallback(() => {
    router.replace(Routes.VerifyCi);
  }, [router]);

  return (
    <Panel width={panelWidth}>
      <RegisterSuccess onClickLeave={handleLeave} onClickVerifyCi={navigateToVerifyCi} />
    </Panel>
  );
});
