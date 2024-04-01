import { memo } from 'react';

import RealestateDocumentAddressDetail from '@/components/domains/realestate-helper/RealestateDocumentAddressDetail';

import Panel from '@/components/atoms/Panel';

import AuthRequired from '@/components/atoms/AuthRequired';

interface Props {
  depth: number;
  panelWidth?: string;
}

function RealestateDocumentAddressDetailPc({ depth, panelWidth }: Props) {
  return (
    <AuthRequired depth={depth}>
      <Panel width={panelWidth}>
        <RealestateDocumentAddressDetail />
      </Panel>
    </AuthRequired>
  );
}

export default memo(RealestateDocumentAddressDetailPc);
