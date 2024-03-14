import { memo } from 'react';

import RealestateDocumentVerifying from '@/components/domains/realestate-helper/RealestateDocumentVerifying';

import AuthRequired from '@/components/atoms/AuthRequired';

import Panel from '@/components/atoms/Panel';

interface Props {
  depth: number;
  panelWidth?: string;
}

function RealestateDocumentAddressVerifyingPc({ panelWidth, depth }: Props) {
  return (
    <AuthRequired depth={depth}>
      <Panel width={panelWidth}>
        <RealestateDocumentVerifying />
      </Panel>
    </AuthRequired>
  );
}

export default memo(RealestateDocumentAddressVerifyingPc);
