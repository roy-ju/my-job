import { memo } from 'react';

import MyReactivate from '@/components/domains/my/MyReActivate';

import Panel from '@/components/atoms/Panel';

interface Props {
  panelWidth?: string;
}

function ReActivatePc({ panelWidth }: Props) {
  return (
    <Panel width={panelWidth}>
      <MyReactivate />
    </Panel>
  );
}

export default memo(ReActivatePc);
