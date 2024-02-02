import { memo } from 'react';

import VerifyCi from '@/components/domains/auth/VerifyCi';

import Panel from '@/components/atoms/Panel';

interface Props {
  panelWidth?: string;
}

function VerifyCiPc({ panelWidth }: Props) {
  return (
    <Panel width={panelWidth}>
      <VerifyCi />
    </Panel>
  );
}

export default memo(VerifyCiPc);
