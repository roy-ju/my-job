import { memo } from 'react';

import RealestateDocumentVerifying from '@/components/domains/realestate-helper/RealestateDocumentVerifying';

import Panel from '@/components/atoms/Panel';

interface Props {
  panelWidth?: string;
}

function RealestateDocumentAddressVerifyingPc({ panelWidth }: Props) {
  return (
    <Panel width={panelWidth}>
      <RealestateDocumentVerifying />
    </Panel>
  );
}

export default memo(RealestateDocumentAddressVerifyingPc);
