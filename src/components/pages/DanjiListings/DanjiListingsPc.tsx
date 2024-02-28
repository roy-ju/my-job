import { memo } from 'react';

import DanjiListings from '@/components/domains/danji/DanjiListings';

import Panel from '@/components/atoms/Panel';

interface Props {
  panelWidth?: string;
}

function DanjiListingsPc({ panelWidth }: Props) {
  return (
    <Panel width={panelWidth}>
      <DanjiListings />
    </Panel>
  );
}

export default memo(DanjiListingsPc);
