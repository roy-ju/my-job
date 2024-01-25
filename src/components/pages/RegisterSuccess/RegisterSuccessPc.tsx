import { memo } from 'react';

import RegisterSuccess from '@/components/domains/auth/RegisterSuccess';

import Panel from '@/components/atoms/Panel';

interface Props {
  panelWidth?: string;
}

function RegisterSuccessPc({ panelWidth }: Props) {
  return (
    <Panel width={panelWidth}>
      <RegisterSuccess />
    </Panel>
  );
}

export default memo(RegisterSuccessPc);
