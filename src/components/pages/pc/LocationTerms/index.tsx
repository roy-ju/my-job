import { memo, useCallback, useState } from 'react';

import { useRouter } from 'next/router';

import { Panel } from '@/components/atoms';

import { LocationTerms as LocationTermsTemplate } from '@/components/templates';

import { useRouter as useCustomRouter } from '@/hooks/utils';

import Routes from '@/router/routes';

import HTML_20221103 from '@/assets/terms/location_agreement/20221103';

import HTML_20221017 from '@/assets/terms/location_agreement/20221017';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter();

  const customRouter = useCustomRouter(depth);

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
      <LocationTermsTemplate
        html={htmlTerms}
        termDate={selectedTerms}
        onClickGoBack={handleGoBack}
        onChangeSelectedTerms={handleChangeSelectedTerms}
      />
    </Panel>
  );
});
