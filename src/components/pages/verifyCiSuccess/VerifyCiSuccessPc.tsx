import { memo } from 'react';

import VerifyCiSuccess from '@/components/domains/auth/VerifyCiSuccess';

import Panel from '@/components/atoms/Panel';

interface Props {
  panelWidth?: string;
}

function VerifyCiSuccessPc({ panelWidth }: Props) {
  return (
    <Panel width={panelWidth}>
      <VerifyCiSuccess />
    </Panel>
  );
}

export default memo(VerifyCiSuccessPc);
