import { memo } from 'react';

import SuggestForm from '@/components/domains/suggest/SuggestForm';

import Panel from '@/components/atoms/Panel';

interface Props {
  depth: number;
  panelWidth?: string;
}

function SuggestFormPc({ depth, panelWidth }: Props) {
  return (
    <Panel width={panelWidth}>
      <SuggestForm depth={depth} />
    </Panel>
  );
}

export default memo(SuggestFormPc);
