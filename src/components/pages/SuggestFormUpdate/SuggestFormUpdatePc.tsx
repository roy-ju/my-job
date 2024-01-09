import { memo } from 'react';

import SuggestFormUpdate from '@/components/domains/suggest/SuggestFormUpdate';

import AuthRequired from '@/components/atoms/AuthRequired';

import Panel from '@/components/atoms/Panel';

interface Props {
  depth: number;
  panelWidth?: string;
}

function SuggestFormUpdatePc({ depth, panelWidth }: Props) {
  return (
    <AuthRequired depth={depth} ciRequired>
      <Panel width={panelWidth}>
        <SuggestFormUpdate depth={depth} />
      </Panel>
    </AuthRequired>
  );
}

export default memo(SuggestFormUpdatePc);
