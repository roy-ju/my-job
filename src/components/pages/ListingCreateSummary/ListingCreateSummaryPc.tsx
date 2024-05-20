import { memo } from 'react';

import Panel from '@/components/atoms/Panel';

import ListingCreateSummary from '@/components/domains/listings/ListingCreateSummary';

interface Props {
  panelWidth?: string;
}

function ListingCreateSummaryPc({ panelWidth }: Props) {
  return (
    <Panel width={panelWidth}>
      <ListingCreateSummary />
    </Panel>
  );
}

export default memo(ListingCreateSummaryPc);
