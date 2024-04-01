import { memo } from 'react';

import TermsAndPolicy from '@/components/domains/terms-and-info/TermsAndPolicy';

import Panel from '@/components/atoms/Panel';

interface Props {
  panelWidth?: string;
}

function TermsAndPolicyPc({ panelWidth }: Props) {
  return (
    <Panel width={panelWidth}>
      <TermsAndPolicy />
    </Panel>
  );
}

export default memo(TermsAndPolicyPc);
