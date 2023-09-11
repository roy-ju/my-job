import { Panel } from '@/components/atoms';
import { SuggestRecommendedList as SuggestRecommendedListTemplate } from '@/components/templates';
import { memo } from 'react';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ panelWidth }: Props) => (
  <Panel width={panelWidth}>
    <SuggestRecommendedListTemplate />
  </Panel>
));
