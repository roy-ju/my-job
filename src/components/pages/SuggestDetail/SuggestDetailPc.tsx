import { memo } from 'react';

import SuggestDetail from '@/components/domains/suggest/SuggestDetail';

import Panel from '@/components/atoms/Panel';

interface Props {
  panelWidth?: string;
  ipAddress?: string;
}

function SuggestDetailPc({ panelWidth, ipAddress }: Props) {
  return (
    <Panel width={panelWidth}>
      <SuggestDetail ipAddress={ipAddress} />
    </Panel>
  );
}

export default memo(SuggestDetailPc);
