import { memo } from 'react';

import Developer from '@/components/domains/developer';

import Panel from '@/components/atoms/Panel';

interface Props {
  panelWidth?: string;
}

function DeveloperPc({ panelWidth }: Props) {
  return (
    <Panel width={panelWidth}>
      <Developer />
    </Panel>
  );
}

export default memo(DeveloperPc);
