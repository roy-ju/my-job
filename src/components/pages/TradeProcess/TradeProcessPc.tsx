import { memo } from 'react';

import TradeProcess from '@/components/domains/realestate-helper/TradeProcess';

import AuthRequired from '@/components/atoms/AuthRequired';

import Panel from '@/components/atoms/Panel';

interface Props {
  depth: number;
  panelWidth?: string;
}

function TradeProcessPc({ depth, panelWidth }: Props) {
  return (
    <AuthRequired depth={depth}>
      <Panel width={panelWidth}>
        <TradeProcess />
      </Panel>
    </AuthRequired>
  );
}

export default memo(TradeProcessPc);
