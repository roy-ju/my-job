import { memo, useCallback, useState } from 'react';

import { useRouter } from 'next/router';

import { Panel } from '@/components/atoms';

import { PrivacyPolicy as PrivacyPolicyTemplate } from '@/components/templates';

import { useRouter as useCustomRouter } from '@/hooks/utils';

import Routes from '@/router/routes';

import HTML_20221208 from '@/assets/terms/privacy_agreement/20221208';

import HTML_20221103 from '@/assets/terms/privacy_agreement/20221103';

import HTML_20221017 from '@/assets/terms/privacy_agreement/20221017';

import HTML_20231211 from '@/assets/terms/privacy_agreement/20231211';

import HTML_20240213 from '@/assets/terms/privacy_agreement/20240213';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const customRouter = useCustomRouter(depth);

  const router = useRouter();

  const [selectedTerms, setSelectedTerms] = useState('2024.02.13');

  const htmlTerms = (() => {
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

  const handleGoBack = useCallback(() => {
    if (router?.query?.register) {
      router.back();
      // customRouter.replace(Routes.Register, {
      //   state: {
      //     email: customRouter.query.email as string,
      //     token: customRouter.query.token as string,
      //     socialLoginType: customRouter.query.socialLoginType as string,
      //   },
      // });
    } else if (customRouter.query.entry === 'home') {
      customRouter.replace('/');
    } else {
      customRouter.replace(Routes.TermsAndPolicy);
    }
  }, [customRouter, router]);

  return (
    <Panel width={panelWidth}>
      <PrivacyPolicyTemplate
        termDate={selectedTerms}
        html={htmlTerms}
        onClickGoBack={handleGoBack}
        onChangeSelectedTerms={handleChangeSelectedTerms}
      />
    </Panel>
  );
});
