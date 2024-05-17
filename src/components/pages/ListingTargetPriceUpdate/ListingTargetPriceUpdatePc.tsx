import { memo } from 'react';

import Panel from '@/components/atoms/Panel';

import ListingTargetPriceUpdate from '@/components/domains/listings/ListingTargetPriceUpdate';

interface Props {
  panelWidth?: string;
}

function ListingTargetPriceUpdatePc({ panelWidth }: Props) {
  return (
    <Panel width={panelWidth}>
      <ListingTargetPriceUpdate />
    </Panel>
  );
}

export default memo(ListingTargetPriceUpdatePc);
