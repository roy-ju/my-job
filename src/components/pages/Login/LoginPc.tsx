import { memo } from 'react';

import Login from '@/components/domains/auth/Login';

import Panel from '@/components/atoms/Panel';

interface Props {
  depth: number;
  panelWidth?: string;
  ipAddress?: string;
}

function LoginPc({ depth, ipAddress, panelWidth }: Props) {
  return (
    <Panel width={panelWidth}>
      <Login depth={depth} ipAddress={ipAddress} />
    </Panel>
  );
}

export default memo(LoginPc);
