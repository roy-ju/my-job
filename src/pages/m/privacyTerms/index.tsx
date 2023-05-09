import { memo, useCallback, useState } from 'react';
import { PrivacyTerms as PrivacyTermsTemplate } from '@/components/templates';

import Routes from '@/router/routes';
import HTML_20221208 from '@/assets/terms/privacy_agreement/20221208';
import HTML_20221103 from '@/assets/terms/privacy_agreement/20221103';
import HTML_20221017 from '@/assets/terms/privacy_agreement/20221017';
import { useRouter } from 'next/router';
import { MobileContainer } from '@/components/atoms';

export default memo(() => {
  const router = useRouter();
  const [selectedTerms, setSelectedTerms] = useState('2022.12.08');

  const htmlTerms = (() => {
    switch (selectedTerms) {
      case '2022.11.03':
        return HTML_20221103;
      case '2022.10.17':
        return HTML_20221017;
      default:
        return HTML_20221208;
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
      <PrivacyTermsTemplate
        termDate={selectedTerms}
        html={htmlTerms}
        onClickGoBack={handleGoBack}
        onChangeSelectedTerms={handleChangeSelectedTerms}
      />
    </MobileContainer>
  );
});
