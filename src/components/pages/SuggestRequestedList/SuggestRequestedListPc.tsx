import { memo } from 'react';

import MySuggestRequestedList from '@/components/domains/my/MySuggestRequestedList';

import Panel from '@/components/atoms/Panel';

import { AuthRequired } from '@/components/atoms';

interface Props {
  depth: number;
  panelWidth?: string;
}

function SuggestRequestedListPc({ depth, panelWidth }: Props) {
  return (
    <AuthRequired depth={depth}>
      <Panel width={panelWidth}>
        <MySuggestRequestedList />
      </Panel>
    </AuthRequired>
  );
}

export default memo(SuggestRequestedListPc);
