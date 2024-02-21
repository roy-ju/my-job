import { memo } from 'react';

import MyDetail from '@/components/domains/my/MyDetail';

import Panel from '@/components/atoms/Panel';

import { AuthRequired } from '@/components/atoms';

interface Props {
  depth: number;
  panelWidth?: string;
}

function MyDetailPc({ depth, panelWidth }: Props) {
  return (
    <AuthRequired depth={depth}>
      <Panel width={panelWidth}>
        <MyDetail />
      </Panel>
    </AuthRequired>
  );
}

export default memo(MyDetailPc);
