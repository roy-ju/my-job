import { Panel } from '@/components/atoms';
import { RegisterSuccess } from '@/components/templates';
import { memo } from 'react';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ panelWidth }: Props) => (
  <Panel width={panelWidth}>
    <RegisterSuccess />
  </Panel>
));
