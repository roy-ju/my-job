import { memo } from 'react';

import RegisterHomeAddressVerifyResult from '@/components/domains/my/RegisterHomeAddressVerifyResult';

import AuthRequired from '@/components/atoms/AuthRequired';

import Panel from '@/components/atoms/Panel';

interface Props {
  depth: number;
  panelWidth?: string;
}

function MyAddressVerifyResultPc({ panelWidth, depth }: Props) {
  return (
    <AuthRequired depth={depth}>
      <Panel width={panelWidth}>
        <RegisterHomeAddressVerifyResult />
      </Panel>
    </AuthRequired>
  );
}

export default memo(MyAddressVerifyResultPc);
