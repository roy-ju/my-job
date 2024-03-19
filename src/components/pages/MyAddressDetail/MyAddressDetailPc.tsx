import { memo } from 'react';

import RegisterHomeAddressDetail from '@/components/domains/my/RegisterHomeAddressDetail';

import Panel from '@/components/atoms/Panel';

interface Props {
  depth: number;
  panelWidth?: string;
}

function MyAddressDetailPc({ panelWidth }: Props) {
  return (
    <Panel width={panelWidth}>
      <RegisterHomeAddressDetail />
    </Panel>
  );
}

export default memo(MyAddressDetailPc);
