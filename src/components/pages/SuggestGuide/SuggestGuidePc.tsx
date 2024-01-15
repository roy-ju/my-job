import { memo } from 'react';

import SuggestGuide from '@/components/domains/suggest/SuggestGuide';

import Panel from '@/components/atoms/Panel';

interface Props {
  panelWidth?: string;
}

function SuggestGuidePc({ panelWidth }: Props) {
  return (
    <Panel width={panelWidth}>
      <SuggestGuide />
    </Panel>
  );
}

export default memo(SuggestGuidePc);
