import { useCallback } from 'react';

import { useRouter } from 'next/router';

import useIsNativeApp from '@/hooks/useIsNativeApp';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import Routes from '@/router/routes';

export default function useServiceInfo() {
  const router = useRouter();

  const { platform } = useCheckPlatform();

  const isNativeApp = useIsNativeApp();

  const handleClickBack = useCallback(() => {
    if (platform === 'pc') {
      router.replace('/');
    }

    if (platform === 'mobile') {
      if (typeof window !== 'undefined') {
        const canGoBack = window.history.length > 1;

        if (canGoBack) {
          router.back();
        } else {
          router.replace(`/${Routes.EntryMobile}`);
        }
      }
    }
  }, [router, platform]);

  const handleClickBusinessInfo = useCallback(() => {
    if (platform === 'pc') {
      const depth1 = router?.query?.depth1;
      const depth2 = router?.query?.depth2;

      const query = router.query;

      delete query.depth1;
      delete query.depth2;

      if (depth1 && depth2) {
        if (depth1 === Routes.ServiceInfo) {
          router.replace(`/${Routes.BusinessInfo}/${depth2}`);
        } else {
          router.replace(`/${depth1}/${Routes.BusinessInfo}`);
        }
      } else if (depth1 && !depth2) {
        router.replace(`/${Routes.BusinessInfo}`);
      }
    }

    if (platform === 'mobile') {
      router.push(`/${Routes.EntryMobile}/${Routes.BusinessInfo}`);
    }
  }, [platform, router]);

  const handleClickTermsAndPolicy = useCallback(() => {
    if (platform === 'pc') {
      const depth1 = router?.query?.depth1;
      const depth2 = router?.query?.depth2;

      const query = router.query;

      delete query.depth1;
      delete query.depth2;

      if (depth1 && depth2) {
        if (depth1 === Routes.ServiceInfo) {
          router.replace(`/${Routes.TermsAndPolicy}/${depth2}`);
        } else {
          router.replace(`/${depth1}/${Routes.TermsAndPolicy}`);
        }
      } else if (depth1 && !depth2) {
        router.replace(`/${Routes.TermsAndPolicy}`);
      }
    }

    if (platform === 'mobile') {
      router.push(`/${Routes.EntryMobile}/${Routes.TermsAndPolicy}`);
    }
  }, [platform, router]);

  const handleClickOpenSourceLicense = useCallback(() => {
    router.push(`/${Routes.EntryMobile}/${Routes.TermsAndPolicy}`);
  }, [router]);

  const handleClickVersionInfo = useCallback(() => {
    router.push(`/${Routes.EntryMobile}/${Routes.VersionInfo}`);
  }, [router]);

  return {
    platform,
    isNativeApp,
    handleClickBack,
    handleClickBusinessInfo,
    handleClickOpenSourceLicense,
    handleClickTermsAndPolicy,
    handleClickVersionInfo,
  };
}
