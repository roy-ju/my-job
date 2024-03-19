import { memo } from 'react';

import RegisterHomeAddressVerifying from '@/components/domains/my/RegisterHomeAddressVerifying';

import Panel from '@/components/atoms/Panel';

interface Props {
  panelWidth?: string;
}

function MyAddressVerifyingPc({ panelWidth }: Props) {
  return (
    <Panel width={panelWidth}>
      <RegisterHomeAddressVerifying />
    </Panel>
  );
}

export default memo(MyAddressVerifyingPc);
