import { memo } from 'react';

import RealestateDocumentDetail from '@/components/domains/realestate-helper/RealestateDocumentDetail';

import AuthRequired from '@/components/atoms/AuthRequired';

import Panel from '@/components/atoms/Panel';

interface Props {
  depth: number;
  panelWidth?: string;
}

function RealestateDocumentDetailPc({ panelWidth, depth }: Props) {
  return (
    <AuthRequired depth={depth}>
      <Panel width={panelWidth}>
        <RealestateDocumentDetail />
      </Panel>
    </AuthRequired>
  );
}

export default memo(RealestateDocumentDetailPc);
