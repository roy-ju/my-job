import { Panel } from '@/components/atoms';
import { memo, useCallback } from 'react';
import { TermsAndPolicy as TermsAndPolicyTemplate } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);

  const handleClickServiceTerms = useCallback(() => {
    router.replace(Routes.ServiceTerms);
  }, [router]);

  const handleClickPrivacyTerms = useCallback(() => {
    router.replace(Routes.PrivacyTerms);
  }, [router]);

  const handleClickLocationTerms = useCallback(() => {
    router.replace(Routes.LocationTerms);
  }, [router]);

  const handleGoBack = useCallback(() => {
    router.replace(Routes.ServiceInfo);
  }, [router]);

  return (
    <Panel width={panelWidth}>
      <TermsAndPolicyTemplate
        onClickGoBack={handleGoBack}
        onClickServiceTerms={handleClickServiceTerms}
        onClickPrivacyTerms={handleClickPrivacyTerms}
        onClickLocationTerms={handleClickLocationTerms}
      />
    </Panel>
  );
});
