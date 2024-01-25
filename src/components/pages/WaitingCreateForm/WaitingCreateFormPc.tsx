import { memo } from 'react';

import WaitingCreateForm from '@/components/domains/waiting/WaitingCreateForm';

import Panel from '@/components/atoms/Panel';

interface Props {
  panelWidth?: string;
}

function WaitingCreateFormPc({ panelWidth }: Props) {
  return (
    <Panel width={panelWidth}>
      <WaitingCreateForm />
    </Panel>
  );
}

export default memo(WaitingCreateFormPc);
