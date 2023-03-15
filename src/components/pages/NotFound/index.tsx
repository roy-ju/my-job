import { ClosablePanel } from '@/components/molecules';
import { memo } from 'react';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ panelWidth, depth }: Props) => (
  <ClosablePanel width={panelWidth} closable={depth === 2}>
    <div />
  </ClosablePanel>
));
