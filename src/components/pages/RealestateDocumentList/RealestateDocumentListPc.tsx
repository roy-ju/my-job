import { memo } from 'react';

import RealestateDocumentList from '@/components/domains/realestate-helper/RealestateDocumentList';

import AuthRequired from '@/components/atoms/AuthRequired';

import Panel from '@/components/atoms/Panel';

interface Props {
  depth: number;
  panelWidth?: string;
}

function RealestateDocumentListPc({ depth, panelWidth }: Props) {
  return (
    <AuthRequired depth={depth}>
      <Panel width={panelWidth}>
        <RealestateDocumentList />
      </Panel>
    </AuthRequired>
  );
}

export default memo(RealestateDocumentListPc);
