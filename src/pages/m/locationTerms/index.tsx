import { MobileContainer } from '@/components/atoms';
import { memo, useCallback, useState } from 'react';
import { LocationTerms as LocationTermsTemplate } from '@/components/templates';

import HTML_20221103 from '@/assets/terms/location_agreement/20221103';
import HTML_20221017 from '@/assets/terms/location_agreement/20221017';
import Routes from '@/router/routes';
import { useRouter } from 'next/router';

export default memo(() => {
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

  const handleGoBack = useCallback(() => {
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
  }, [router]);

  return (
    <MobileContainer>
      <LocationTermsTemplate
        html={htmlTerms}
        termDate={selectedTerms}
        onClickGoBack={handleGoBack}
        onChangeSelectedTerms={handleChangeSelectedTerms}
      />
    </MobileContainer>
  );
});
