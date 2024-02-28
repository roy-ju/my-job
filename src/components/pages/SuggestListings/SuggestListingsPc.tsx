import { memo } from 'react';

import SuggestListings from '@/components/domains/suggest/SuggestListings';

import Panel from '@/components/atoms/Panel';

interface Props {
  panelWidth?: string;
}

function SuggestListingsPc({ panelWidth }: Props) {
  return (
    <Panel width={panelWidth}>
      <SuggestListings />
    </Panel>
  );
}

export default memo(SuggestListingsPc);
