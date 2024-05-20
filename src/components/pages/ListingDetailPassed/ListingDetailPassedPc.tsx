import { memo } from 'react';

import Panel from '@/components/atoms/Panel';

import ListingDetailPassed from '@/components/domains/listings/ListingDetailPassed';

import { AuthRequired } from '@/components/atoms';

interface Props {
  depth: number;
  panelWidth?: string;
}

function ListingDetailPassedPc({ depth, panelWidth }: Props) {
  return (
    <AuthRequired depth={depth}>
      <Panel width={panelWidth}>
        <ListingDetailPassed />
      </Panel>
    </AuthRequired>
  );
}

export default memo(ListingDetailPassedPc);
