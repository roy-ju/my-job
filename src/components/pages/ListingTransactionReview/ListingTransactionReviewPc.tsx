import { memo } from 'react';

import Panel from '@/components/atoms/Panel';

import ListingTranactionReview from '@/components/domains/listings/ListingTranactionReview';

interface Props {
  panelWidth?: string;
}

function ListingTranactionReviewPc({ panelWidth }: Props) {
  return (
    <Panel width={panelWidth}>
      <ListingTranactionReview />
    </Panel>
  );
}

export default memo(ListingTranactionReviewPc);
