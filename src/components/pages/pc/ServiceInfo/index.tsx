import { Panel } from '@/components/atoms';
import { memo, useCallback } from 'react';
import { ServiceInfo as ServiceInfoTemplate } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);

  const handleClickBusinessInfo = useCallback(() => {
    router.replace(Routes.BusinessInfo);
  }, [router]);

  const handleClickTermsAndPolicy = useCallback(() => {
    router.replace(Routes.TermsAndPolicy);
  }, [router]);

  return (
    <Panel width={panelWidth}>
      <ServiceInfoTemplate
        onClickBusinessInfo={handleClickBusinessInfo}
        onClickTermsAndPolicy={handleClickTermsAndPolicy}
      />
    </Panel>
  );
});
