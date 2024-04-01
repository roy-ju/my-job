import { memo } from 'react';

import RealestateDocumentVerifyResult from '@/components/domains/realestate-helper/RealestateDocumentVerifyResult';

import Panel from '@/components/atoms/Panel';

interface Props {
  panelWidth?: string;
}

function RealestateDocumentVerifyResultPc({ panelWidth }: Props) {
  return (
    <Panel width={panelWidth}>
      <RealestateDocumentVerifyResult />
    </Panel>
  );
}

export default memo(RealestateDocumentVerifyResultPc);
