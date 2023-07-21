import { MobileContainer } from '@/components/atoms';
import { ServiceInfo } from '@/components/templates';
import useIsNativeApp from '@/hooks/utils/useIsNativeApp';
import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import { memo } from 'react';

export default memo(() => {
  const router = useRouter();
  const isNativeApp = useIsNativeApp();

  return (
    <MobileContainer>
      <ServiceInfo
        onClickBusinessInfo={() => router.push(`/${Routes.EntryMobile}/${Routes.BusinessInfo}`)}
        onClickTermsAndPolicy={() => router.push(`/${Routes.EntryMobile}/${Routes.TermsAndPolicy}`)}
        onClickOpenSourceLicense={
          isNativeApp ? () => router.push(`/${Routes.EntryMobile}/${Routes.OpenSourceLicenses}`) : undefined
        }
        onClickVersionInfo={isNativeApp ? () => router.push(`/${Routes.EntryMobile}/${Routes.VersionInfo}`) : undefined}
        // onClickOpenSourceLicense={() => router.push(`/${Routes.EntryMobile}/${Routes.OpenSourceLicenses}`)}
        // onClickVersionInfo={() => router.push(`/${Routes.EntryMobile}/${Routes.VersionInfo}`)}
        onClickBack={() => router.back()}
      />
    </MobileContainer>
  );
});