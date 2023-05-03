import { Panel } from '@/components/atoms';
import { memo, useCallback, useState } from 'react';
import { LocationTerms as LocationTermsTemplate } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import HTML_20221103 from '@/assets/terms/location_agreement/20221103';
import HTML_20221017 from '@/assets/terms/location_agreement/20221017';
import Routes from '@/router/routes';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);
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
    router.replace(Routes.TermsAndPolicy);
  }, [router]);

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
