import { Panel } from '@/components/atoms';
import { memo, useCallback, useState } from 'react';
import { PrivacyPolicy as PrivacyPolicyTemplate } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import HTML_20221208 from '@/assets/terms/privacy_agreement/20221208';
import HTML_20221103 from '@/assets/terms/privacy_agreement/20221103';
import HTML_20221017 from '@/assets/terms/privacy_agreement/20221017';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);
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
    if (router.query.register)
      router.replace(Routes.Register, {
        state: {
          email: router.query.email as string,
          token: router.query.token as string,
          socialLoginType: router.query.socialLoginType as string,
        },
      });
    else router.replace(Routes.TermsAndPolicy);
  }, [router]);

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