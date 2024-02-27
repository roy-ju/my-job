import { memo } from 'react';

import MySuggsetDetail from '@/components/domains/my/MySuggsetDetail';

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
        <MySuggsetDetail />
      </Panel>
    </AuthRequired>
  );
}

export default memo(MySuggestDetailPc);
