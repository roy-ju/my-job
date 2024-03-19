import { memo } from 'react';

import RegisterHomeSearchAddress from '@/components/domains/my/RegisterHomeSearchAddress';

import AuthRequired from '@/components/atoms/AuthRequired';

import Panel from '@/components/atoms/Panel';

interface Props {
  depth: number;
  panelWidth?: string;
}

function MyAddressPc({ panelWidth, depth }: Props) {
  return (
    <AuthRequired depth={depth}>
      <Panel width={panelWidth}>
        <RegisterHomeSearchAddress />
      </Panel>
    </AuthRequired>
  );
}

export default memo(MyAddressPc);
