import { Panel } from '@/components/atoms';
import { BusinessInfo } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { memo, useCallback } from 'react';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);

  const handleGoBack = useCallback(() => {
    router.replace(Routes.ServiceInfo);
  }, [router]);

  return (
    <Panel width={panelWidth}>
      <BusinessInfo onClickGoBack={handleGoBack} />
    </Panel>
  );
});
