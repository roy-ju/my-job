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

  const handleClickPrivacyPolicy = useCallback(() => {
    router.replace(Routes.PrivacyPolicy);
  }, [router]);

  const handleClickLocationTerms = useCallback(() => {
    router.replace(Routes.LocationTerms);
  }, [router]);

  const handleGoBack = useCallback(() => {
    if (router?.query?.entry === Routes.Home) {
      router.replace('/');
    } else {
      router.replace(Routes.ServiceInfo);
    }
  }, [router]);

  return (
    <Panel width={panelWidth}>
      <TermsAndPolicyTemplate
        onClickGoBack={handleGoBack}
        onClickServiceTerms={handleClickServiceTerms}
        onClickPrivacyPolicy={handleClickPrivacyPolicy}
        onClickLocationTerms={handleClickLocationTerms}
      />
    </Panel>
  );
});
