import { memo } from 'react';

import RealestateDocumentVerifyResult from '@/components/domains/realestate-helper/RealestateDocumentVerifyResult';

import AuthRequired from '@/components/atoms/AuthRequired';

import Panel from '@/components/atoms/Panel';

interface Props {
  depth: number;
  panelWidth?: string;
}

function RealestateDocumentVerifyResultPc({ depth, panelWidth }: Props) {
  return (
    <AuthRequired depth={depth}>
      <Panel width={panelWidth}>
        <RealestateDocumentVerifyResult />
      </Panel>
    </AuthRequired>
  );
}

export default memo(RealestateDocumentVerifyResultPc);
