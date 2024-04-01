import { useState, useCallback } from 'react';

import { useRouter } from 'next/router';

import HTML_20221208 from '@/assets/terms/privacy_agreement/20221208';

import HTML_20221103 from '@/assets/terms/privacy_agreement/20221103';

import HTML_20221017 from '@/assets/terms/privacy_agreement/20221017';

import HTML_20231211 from '@/assets/terms/privacy_agreement/20231211';

import HTML_20240213 from '@/assets/terms/privacy_agreement/20240213';
import useCheckPlatform from '@/hooks/useCheckPlatform';
import Routes from '@/router/routes';

export default function usePrivacyPolicy() {
  const router = useRouter();

  const { platform } = useCheckPlatform();

  const [selectedTerms, setSelectedTerms] = useState('2024.02.13');

  const html = (() => {
    switch (selectedTerms) {
      case '2022.11.03':
        return HTML_20221103;
      case '2022.10.17':
        return HTML_20221017;
      case '2022.12.08':
        return HTML_20221208;
      case '2023.12.11':
        return HTML_20231211;
      default:
        return HTML_20240213;
    }
  })();

  const handleChangeSelectedTerms = useCallback(
    (value: string) => {
      setSelectedTerms(value);
    },
    [setSelectedTerms],
  );

  const handleClickBack = useCallback(() => {
    if (platform === 'pc') {
      if (router?.query?.register) {
        router.back();
      } else if (router?.query?.entry === 'home') {
        router.replace('/');
      } else {
        const depth1 = router?.query?.depth1;
        const depth2 = router?.query?.depth2;

        const query = router.query;

        delete query.depth1;
        delete query.depth2;

        if (depth1 && depth2) {
          if (depth1 === Routes.PrivacyPolicy) {
            router.replace(`/${Routes.TermsAndPolicy}/${depth2}`);
          } else {
            router.replace(`/${depth1}/${Routes.TermsAndPolicy}`);
          }
        } else if (depth1 && !depth2) {
          router.replace(`/${Routes.TermsAndPolicy}`);
        }
      }
    }

    if (platform === 'mobile') {
      if (router.query.register) {
        router.replace({
          pathname: `/${Routes.EntryMobile}/${Routes.Register}`,
          query: {
            email: router.query.email as string,
            token: router.query.token as string,
            socialLoginType: router.query.socialLoginType as string,
          },
        });
      } else if (typeof window !== 'undefined') {
        const canGoBack = window.history.length > 1;

        if (canGoBack) {
          router.back();
        } else {
          router.replace('/');
        }
      }
    }
  }, [platform, router]);

  return { html, selectedTerms, handleChangeSelectedTerms, handleClickBack };
}
