import { memo } from 'react';

import RealestateDocumentSearchAddress from '@/components/domains/realestate-helper/RealestateDocumentSearchAddress';

import AuthRequired from '@/components/atoms/AuthRequired';

import Panel from '@/components/atoms/Panel';

interface Props {
  depth: number;
  panelWidth?: string;
}

function RealestateDocumentSearchAddressPc({ panelWidth, depth }: Props) {
  return (
    <AuthRequired depth={depth}>
      <Panel width={panelWidth}>
        <RealestateDocumentSearchAddress />
      </Panel>
    </AuthRequired>
  );
}

export default memo(RealestateDocumentSearchAddressPc);
