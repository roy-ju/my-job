import { Panel } from '@/components/atoms';
import { VerifyCiSuccess } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
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

  return (
    <Panel width={panelWidth}>
      <VerifyCiSuccess onClickLeave={handleLeave} />
    </Panel>
  );
});
