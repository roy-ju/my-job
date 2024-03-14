import { memo } from 'react';

import RealestateDocumentAddressDetail from '@/components/domains/realestate-helper/RealestateDocumentAddressDetail';

import AuthRequired from '@/components/atoms/AuthRequired';

import Panel from '@/components/atoms/Panel';

interface Props {
  depth: number;
  panelWidth?: string;
}

function RealestateDocumentAddressDetailPc({ panelWidth, depth }: Props) {
  return (
    <AuthRequired depth={depth}>
      <Panel width={panelWidth}>
        <RealestateDocumentAddressDetail />
      </Panel>
    </AuthRequired>
  );
}

export default memo(RealestateDocumentAddressDetailPc);
