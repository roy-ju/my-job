import { memo, useCallback, useState } from 'react';

import { useRouter } from 'next/router';

import { Panel } from '@/components/atoms';

// import { ServiceTerms as ServiceTermsTemplate } from '@/components/templates';

import { useRouter as useCustomRouter } from '@/hooks/utils';

import Routes from '@/router/routes';

import HTML_20230322 from '@/assets/terms/service_agreement/20230322';

import HTML_20221208 from '@/assets/terms/service_agreement/20221208';

import HTML_20221103 from '@/assets/terms/service_agreement/20221103';

import HTML_20221017 from '@/assets/terms/service_agreement/20221017';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter();

  const customRouter = useCustomRouter(depth);

  const [selectedTerms, setSelectedTerms] = useState('2023.03.22');

  const htmlTerms = (() => {
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

  const handleGoBack = useCallback(() => {
    if (router.query.register) {
      // customRouter.replace(Routes.Register, {
      //   state: {
      //     email: router.query.email as string,
      //     token: router.query.token as string,
      //     socialLoginType: router.query.socialLoginType as string,
      //   },
      // });
      router.back();
    } else {
      customRouter.replace(Routes.TermsAndPolicy);
    }
  }, [customRouter, router]);

  return (
    <Panel width={panelWidth}>
      {/* <ServiceTermsTemplate
        termDate={selectedTerms}
        html={htmlTerms}
        onClickGoBack={handleGoBack}
        onChangeSelectedTerms={handleChangeSelectedTerms}
      /> */}
    </Panel>
  );
});
