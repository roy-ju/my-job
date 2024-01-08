import { memo } from 'react';

import SuggestDetail from '@/components/domains/suggest/SuggestDetail';

import Panel from '@/components/atoms/Panel';

interface Props {
  depth: number;
  panelWidth?: string;
}

function SuggestDetailPc({ depth, panelWidth }: Props) {
  return (
    <Panel width={panelWidth}>
      <SuggestDetail depth={depth} />
    </Panel>
  );
}

export default memo(SuggestDetailPc);
