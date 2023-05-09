import { Panel } from '@/components/atoms';
import { VerifyCiSuccess } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import { useRouter as useNextRouter } from 'next/router';
import { memo, useCallback } from 'react';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);
  const nextRouter = useNextRouter();

  const handleLeave = useCallback(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const redirect = urlSearchParams.get('redirect');
    if (redirect) {
      nextRouter.replace(redirect);
    } else {
      router.pop();
    }
  }, [nextRouter, router]);

  return (
    <Panel width={panelWidth}>
      <VerifyCiSuccess onClickLeave={handleLeave} />
    </Panel>
  );
});
