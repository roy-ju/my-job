import { memo } from 'react';

import Register from '@/components/domains/auth/Register';

import Panel from '@/components/atoms/Panel';

interface Props {
  panelWidth?: string;
}

function RegisterPc({ panelWidth }: Props) {
  return (
    <Panel width={panelWidth}>
      <Register />
    </Panel>
  );
}

export default memo(RegisterPc);
