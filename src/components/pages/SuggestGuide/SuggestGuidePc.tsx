import { memo } from 'react';

import SuggestGuide from '@/components/domains/suggest/SuggestGuide';

import Panel from '@/components/atoms/Panel';

interface Props {
  depth: number;
  panelWidth?: string;
}

function SuggestGuidePc({ depth, panelWidth }: Props) {
  return (
    <Panel width={panelWidth}>
      <SuggestGuide depth={depth} />
    </Panel>
  );
}

export default memo(SuggestGuidePc);
