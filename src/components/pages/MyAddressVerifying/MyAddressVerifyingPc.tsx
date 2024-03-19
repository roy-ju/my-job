import { memo } from 'react';

import RegisterHomeAddressVerifying from '@/components/domains/my/RegisterHomeAddressVerifying';

import AuthRequired from '@/components/atoms/AuthRequired';

import Panel from '@/components/atoms/Panel';

interface Props {
  depth: number;
  panelWidth?: string;
}

function MyAddressVerifyingPc({ panelWidth, depth }: Props) {
  return (
    <AuthRequired depth={depth}>
      <Panel width={panelWidth}>
        <RegisterHomeAddressVerifying />
      </Panel>
    </AuthRequired>
  );
}

export default memo(MyAddressVerifyingPc);
