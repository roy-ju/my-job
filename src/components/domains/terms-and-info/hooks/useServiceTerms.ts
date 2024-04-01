import { useCallback, useState } from 'react';

import { useRouter } from 'next/router';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import HTML_20230322 from '@/assets/terms/service_agreement/20230322';

import HTML_20221208 from '@/assets/terms/service_agreement/20221208';

import HTML_20221103 from '@/assets/terms/service_agreement/20221103';

import HTML_20221017 from '@/assets/terms/service_agreement/20221017';

import Routes from '@/router/routes';

export default function useServiceTerms() {
  const router = useRouter();

  const { platform } = useCheckPlatform();

  const [selectedTerms, setSelectedTerms] = useState('2023.03.22');

  const html = (() => {
    switch (selectedTerms) {
      case '2022.12.08':
        return HTML_20221208;
      case '2022.11.03':
        return HTML_20221103;
      case '2022.10.17':
        return HTML_20221017;
      default:
        return HTML_20230322;
    }
  })();

  const handleChangeSelectedTerms = useCallback(
    (value: string) => {
      setSelectedTerms(value);
    },
    [setSelectedTerms],
  );

  const handleClickBack = useCallback(() => {
    if (router.query.register) {
      if (platform === 'pc') {
        router.back();
      } else {
        router.replace({
          pathname: `/${Routes.EntryMobile}/${Routes.Register}`,
          query: {
            email: router.query.email as string,
            token: router.query.token as string,
            socialLoginType: router.query.socialLoginType as string,
          },
        });
      }
    } else if (platform === 'pc') {
      const depth1 = router?.query?.depth1;
      const depth2 = router?.query?.depth2;

      const query = router.query;

      delete query.depth1;
      delete query.depth2;

      if (depth1 && depth2) {
        if (depth1 === Routes.ServiceTerms) {
          router.replace(`/${Routes.TermsAndPolicy}/${depth2}`);
        } else {
          router.replace(`/${depth1}/${Routes.TermsAndPolicy}`);
        }
      } else if (depth1 && !depth2) {
        router.replace(`/${Routes.TermsAndPolicy}`);
      }
    } else {
      router.back();
    }
  }, [platform, router]);

  return { selectedTerms, html, handleChangeSelectedTerms, handleClickBack };
}
