import { memo } from 'react';

import RealestateDcoumentList from '@/components/domains/realestate-helper/RealestateDocumentList';

import Panel from '@/components/atoms/Panel';

interface Props {
  panelWidth?: string;
}

function RealestateDocumentListPc({ panelWidth }: Props) {
  return (
    <Panel width={panelWidth}>
      <RealestateDcoumentList />
    </Panel>
  );
}

export default memo(RealestateDocumentListPc);
