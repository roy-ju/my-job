import { memo } from 'react';

import Panel from '@/components/atoms/Panel';

import ListingTargetPriceUpdateSummary from '@/components/domains/listings/ListingTargetPriceUpdateSummary';

interface Props {
  panelWidth?: string;
}

function ListingTargetPriceUpdateSummaryPc({ panelWidth }: Props) {
  return (
    <Panel width={panelWidth}>
      <ListingTargetPriceUpdateSummary />
    </Panel>
  );
}

export default memo(ListingTargetPriceUpdateSummaryPc);
