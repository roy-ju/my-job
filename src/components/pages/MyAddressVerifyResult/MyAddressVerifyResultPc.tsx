import { memo } from 'react';

import RegisterHomeAddressVerifyResult from '@/components/domains/my/RegisterHomeAddressVerifyResult';

import Panel from '@/components/atoms/Panel';

interface Props {
  panelWidth?: string;
}

function MyAddressVerifyResultPc({ panelWidth }: Props) {
  return (
    <Panel width={panelWidth}>
      <RegisterHomeAddressVerifyResult />
    </Panel>
  );
}

export default memo(MyAddressVerifyResultPc);
