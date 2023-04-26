import { Panel } from '@/components/atoms';
import { memo } from 'react';
import { TransactionReview as TransactionReviewTemplate } from '@/components/templates';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ panelWidth }: Props) => (
  <Panel width={panelWidth}>
    <TransactionReviewTemplate />
  </Panel>
));
