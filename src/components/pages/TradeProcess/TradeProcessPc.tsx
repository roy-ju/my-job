import { memo } from 'react';

import TradeProcess from '@/components/domains/realestate-helper/TradeProcess';

import Panel from '@/components/atoms/Panel';

interface Props {
  panelWidth?: string;
}

function TradeProcessPc({ panelWidth }: Props) {
  return (
    <Panel width={panelWidth}>
      <TradeProcess />
    </Panel>
  );
}

export default memo(TradeProcessPc);
