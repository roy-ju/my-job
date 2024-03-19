import { memo } from 'react';

import RealestateDocumentAddressDetail from '@/components/domains/realestate-helper/RealestateDocumentAddressDetail';

import Panel from '@/components/atoms/Panel';

interface Props {
  panelWidth?: string;
}

function RealestateDocumentAddressDetailPc({ panelWidth }: Props) {
  return (
    <Panel width={panelWidth}>
      <RealestateDocumentAddressDetail />
    </Panel>
  );
}

export default memo(RealestateDocumentAddressDetailPc);
