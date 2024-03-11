import { memo } from 'react';

import PrivacyPolicy from '@/components/domains/terms-and-info/PrivacyPolicy';

import Panel from '@/components/atoms/Panel';

interface Props {
  panelWidth?: string;
}

function PrivacyPolicyPc({ panelWidth }: Props) {
  return (
    <Panel width={panelWidth}>
      <PrivacyPolicy />
    </Panel>
  );
}

export default memo(PrivacyPolicyPc);
