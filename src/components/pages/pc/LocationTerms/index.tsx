import { Panel } from '@/components/atoms';
import { memo } from 'react';
import { TermsAndPolicy as TermsAndPolicyTemplate } from '@/components/templates';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ panelWidth }: Props) => (
  <Panel width={panelWidth}>
    <TermsAndPolicyTemplate />
  </Panel>
));
