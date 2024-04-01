import { useCallback } from 'react';

import { useRouter } from 'next/router';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import Routes from '@/router/routes';

export default function useTermsAndPolicy() {
  const router = useRouter();

  const { platform } = useCheckPlatform();

  const handleClickBack = useCallback(() => {
    if (platform === 'pc') {
      if (router?.query?.entry === Routes.Home) {
        router.replace('/');
      } else {
        const depth1 = router?.query?.depth1;
        const depth2 = router?.query?.depth2;

        const query = router.query;

        delete query.depth1;
        delete query.depth2;

        if (depth1 && depth2) {
          if (depth1 === Routes.TermsAndPolicy) {
            router.replace(`/${Routes.ServiceInfo}/${depth2}`);
          } else {
            router.replace(`/${depth1}/${Routes.ServiceInfo}`);
          }
        } else if (depth1 && !depth2) {
          router.replace(`/${Routes.ServiceInfo}`);
        }

        router.replace(Routes.ServiceInfo);
      }
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

  const handleClickServiceTerms = useCallback(() => {
    if (platform === 'pc') {
      const depth1 = router?.query?.depth1;
      const depth2 = router?.query?.depth2;

      const query = router.query;

      delete query.depth1;
      delete query.depth2;

      if (depth1 && depth2) {
        if (depth1 === Routes.TermsAndPolicy) {
          router.replace(`/${Routes.ServiceTerms}/${depth2}`);
        } else {
          router.replace(`/${depth1}/${Routes.ServiceTerms}`);
        }
      } else if (depth1 && !depth2) {
        router.replace(`/${Routes.ServiceTerms}`);
      }
    }

    if (platform === 'mobile') {
      router.push(`/${Routes.EntryMobile}/${Routes.ServiceTerms}`);
    }
  }, [platform, router]);

  const handleClickPrivacyPolicy = useCallback(() => {
    if (platform === 'pc') {
      const depth1 = router?.query?.depth1;
      const depth2 = router?.query?.depth2;

      const query = router.query;

      delete query.depth1;
      delete query.depth2;

      if (depth1 && depth2) {
        if (depth1 === Routes.TermsAndPolicy) {
          router.replace(`/${Routes.PrivacyPolicy}/${depth2}`);
        } else {
          router.replace(`/${depth1}/${Routes.PrivacyPolicy}`);
        }
      } else if (depth1 && !depth2) {
        router.replace(`/${Routes.PrivacyPolicy}`);
      }
    }

    if (platform === 'mobile') {
      router.push(`/${Routes.EntryMobile}/${Routes.PrivacyPolicy}`);
    }
  }, [platform, router]);

  const handleClickLocationTerms = useCallback(() => {
    if (platform === 'pc') {
      const depth1 = router?.query?.depth1;
      const depth2 = router?.query?.depth2;

      const query = router.query;

      delete query.depth1;
      delete query.depth2;

      if (depth1 && depth2) {
        if (depth1 === Routes.TermsAndPolicy) {
          router.replace(`/${Routes.LocationTerms}/${depth2}`);
        } else {
          router.replace(`/${depth1}/${Routes.LocationTerms}`);
        }
      } else if (depth1 && !depth2) {
        router.replace(`/${Routes.LocationTerms}`);
      }
    }

    if (platform === 'mobile') {
      router.push(`/${Routes.EntryMobile}/${Routes.LocationTerms}`);
    }
  }, [platform, router]);

  return { handleClickBack, handleClickServiceTerms, handleClickPrivacyPolicy, handleClickLocationTerms };
}
