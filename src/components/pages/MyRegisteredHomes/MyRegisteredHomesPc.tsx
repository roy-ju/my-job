import { memo } from 'react';

import MyRegisteredHomes from '@/components/domains/my/MyRegisteredHomes';

import AuthRequired from '@/components/atoms/AuthRequired';

import Panel from '@/components/atoms/Panel';

interface Props {
  depth: number;
  panelWidth?: string;
}

function MyRegisteredHomesPc({ panelWidth, depth }: Props) {
  return (
    <AuthRequired depth={depth} ciRequired>
      <Panel width={panelWidth}>
        <MyRegisteredHomes />
      </Panel>
    </AuthRequired>
  );
}

export default memo(MyRegisteredHomesPc);
