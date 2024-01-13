import { memo, useCallback } from 'react';

import { useRouter } from 'next/router';

import { MobileContainer } from '@/components/atoms';

import { ServiceInfo } from '@/components/templates';

import useIsNativeApp from '@/hooks/useIsNativeApp';

import Routes from '@/router/routes';

export default memo(() => {
  const router = useRouter();

  const isNativeApp = useIsNativeApp();

  const handleClickBack = useCallback(() => {
    if (typeof window !== 'undefined') {
      const canGoBack = window.history.length > 1;

      if (canGoBack) {
        router.back();
      } else {
        router.replace(`/${Routes.EntryMobile}`);
      }
    }
  }, [router]);

  return (
    <MobileContainer>
      <ServiceInfo
        onClickBusinessInfo={() => router.push(`/${Routes.EntryMobile}/${Routes.BusinessInfo}`)}
        onClickTermsAndPolicy={() => router.push(`/${Routes.EntryMobile}/${Routes.TermsAndPolicy}`)}
        onClickOpenSourceLicense={
          isNativeApp ? () => router.push(`/${Routes.EntryMobile}/${Routes.OpenSourceLicenses}`) : undefined
        }
        onClickVersionInfo={isNativeApp ? () => router.push(`/${Routes.EntryMobile}/${Routes.VersionInfo}`) : undefined}
        onClickBack={handleClickBack}
      />
    </MobileContainer>
  );
});
