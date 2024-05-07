import { memo } from 'react';

import Panel from '@/components/atoms/Panel';

import ListingDetailPassed from '@/components/domains/listings/ListingDetailPassed';

interface Props {
  panelWidth?: string;
}

function ListingDetailPassedPc({ panelWidth }: Props) {
  return (
    <Panel width={panelWidth}>
      <ListingDetailPassed />
    </Panel>
  );
}

export default memo(ListingDetailPassedPc);
