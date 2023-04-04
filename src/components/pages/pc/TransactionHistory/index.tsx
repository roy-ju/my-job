import { Panel } from '@/components/atoms';
import { memo } from 'react';
import { TransactionHistory as TransactionHistoryTemplate } from '@/components/templates';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ panelWidth }: Props) => (
  <Panel width={panelWidth}>
    <TransactionHistoryTemplate list={[]} />
  </Panel>
));
