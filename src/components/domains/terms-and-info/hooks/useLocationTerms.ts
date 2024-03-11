import { useCallback, useState } from 'react';

import { useRouter } from 'next/router';

import Routes from '@/router/routes';

import HTML_20221103 from '@/assets/terms/location_agreement/20221103';

import HTML_20221017 from '@/assets/terms/location_agreement/20221017';

import useCheckPlatform from '@/hooks/useCheckPlatform';

export default function useLocationTerms() {
  const { platform } = useCheckPlatform();

  const router = useRouter();

  const [selectedTerms, setSelectedTerms] = useState('2022.11.03');

  const htmlTerms = (() => {
    switch (selectedTerms) {
      case '2022.10.17':
        return HTML_20221017;
      default:
        return HTML_20221103;
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
      if (router.query.register) {
        router.back();
      } else {
        const depth1 = router?.query?.depth1;
        const depth2 = router?.query?.depth2;

        const query = router.query;

        delete query.depth1;
        delete query.depth2;

        if (depth1 && depth2) {
          if (depth1 === Routes.LocationTerms) {
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
      } else {
        router.back();
      }
    }
  }, [router, platform]);

  return { handleClickBack, handleChangeSelectedTerms, selectedTerms, html: htmlTerms };
}
