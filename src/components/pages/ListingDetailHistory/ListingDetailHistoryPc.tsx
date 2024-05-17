import { memo } from 'react';

import Panel from '@/components/atoms/Panel';

import ListingDetailHistory from '@/components/domains/listings/ListingDetailHistory';

interface Props {
  panelWidth?: string;
}

function ListingDetailHistoryPc({ panelWidth }: Props) {
  return (
    <Panel width={panelWidth}>
      <ListingDetailHistory />
    </Panel>
  );
}

export default memo(ListingDetailHistoryPc);
