import { memo } from 'react';

import RegisterHomeAgreement from '@/components/domains/my/RegisterHomeAgreement';

import AuthRequired from '@/components/atoms/AuthRequired';

import Panel from '@/components/atoms/Panel';

interface Props {
  depth: number;
  panelWidth?: string;
}

function MyAddressAgreementPc({ panelWidth, depth }: Props) {
  return (
    <AuthRequired depth={depth} ciRequired>
      <Panel width={panelWidth}>
        <RegisterHomeAgreement />
      </Panel>
    </AuthRequired>
  );
}

export default memo(MyAddressAgreementPc);
