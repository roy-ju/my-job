import { memo } from 'react';

import RegisterHomeAddressDetail from '@/components/domains/my/RegisterHomeAddressDetail';

import AuthRequired from '@/components/atoms/AuthRequired';

import Panel from '@/components/atoms/Panel';

interface Props {
  depth: number;
  panelWidth?: string;
}

function MyAddressDetailPc({ panelWidth, depth }: Props) {
  return (
    <AuthRequired depth={depth}>
      <Panel width={panelWidth}>
        <RegisterHomeAddressDetail />
      </Panel>
    </AuthRequired>
  );
}

export default memo(MyAddressDetailPc);
