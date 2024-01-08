import { memo } from 'react';

import SuggestFormUpdate from '@/components/domains/suggest/SuggestFormUpdate';

import Panel from '@/components/atoms/Panel';

interface Props {
  depth: number;
  panelWidth?: string;
}

function SuggestFormUpdatePc({ depth, panelWidth }: Props) {
  return (
    <Panel width={panelWidth}>
      <SuggestFormUpdate depth={depth} />
    </Panel>
  );
}

export default memo(SuggestFormUpdatePc);
