import { memo } from 'react';

import MySuggestDetail from '@/components/domains/my/MySuggestDetail';

import AuthRequired from '@/components/atoms/AuthRequired';

import Panel from '@/components/atoms/Panel';

interface Props {
  depth: number;
  panelWidth?: string;
}

function MySuggestDetailPc({ depth, panelWidth }: Props) {
  return (
    <AuthRequired depth={depth}>
      <Panel width={panelWidth}>
        <MySuggestDetail />
      </Panel>
    </AuthRequired>
  );
}

export default memo(MySuggestDetailPc);
