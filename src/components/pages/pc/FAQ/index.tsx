import { Panel } from '@/components/atoms';
import { memo } from 'react';
import { FAQ as FAQTemplate } from '@/components/templates';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ panelWidth }: Props) => (
  <Panel width={panelWidth}>
    <FAQTemplate />
  </Panel>
));
