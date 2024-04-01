import { memo } from 'react';

import { AuthRequired, Panel } from '@/components/atoms';

import MyDeregister from '@/components/domains/my/MyDeregister';

interface Props {
  depth: number;
  panelWidth?: string;
}

function DeregisterPc({ depth, panelWidth }: Props) {
  return (
    <AuthRequired depth={depth}>
      <Panel width={panelWidth}>
        <MyDeregister />
      </Panel>
    </AuthRequired>
  );
}

export default memo(DeregisterPc);
