import { memo, useCallback } from 'react';
import { TermsAndPolicy as TermsAndPolicyTemplate } from '@/components/templates';
import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import { MobileContainer } from '@/components/atoms';

export default memo(() => {
  const router = useRouter();

  const handleClickServiceTerms = useCallback(() => {
    router.push(`/${Routes.EntryMobile}/${Routes.ServiceTerms}`);
  }, [router]);

  const handleClickPrivacyTerms = useCallback(() => {
    router.push(`/${Routes.EntryMobile}/${Routes.PrivacyTerms}`);
  }, [router]);

  const handleClickLocationTerms = useCallback(() => {
    router.push(`/${Routes.EntryMobile}/${Routes.LocationTerms}`);
  }, [router]);

  const handleGoBack = useCallback(() => {
    router.push(`/${Routes.EntryMobile}/${Routes.ServiceInfo}`);
  }, [router]);

  return (
    <MobileContainer>
      <TermsAndPolicyTemplate
        onClickGoBack={handleGoBack}
        onClickServiceTerms={handleClickServiceTerms}
        onClickPrivacyTerms={handleClickPrivacyTerms}
        onClickLocationTerms={handleClickLocationTerms}
      />
    </MobileContainer>
  );
});
