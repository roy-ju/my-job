import { memo, useCallback } from 'react';

import { Panel } from '@/components/atoms';

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

  const handleClickBack = useCallback(() => {
    router.replace('/');
  }, [router]);

  return (
    <Panel width={panelWidth}>
      <ServiceInfoTemplate
        onClickBack={handleClickBack}
        onClickBusinessInfo={handleClickBusinessInfo}
        onClickTermsAndPolicy={handleClickTermsAndPolicy}
      />
    </Panel>
  );
});
