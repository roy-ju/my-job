import { memo } from 'react';

import ListingCheckList from '@/components/domains/realestate-helper/ListingCheckList';

import Panel from '@/components/atoms/Panel';

interface Props {
  panelWidth?: string;
}

function ListingCheckListPc({ panelWidth }: Props) {
  return (
    <Panel width={panelWidth}>
      <ListingCheckList />
    </Panel>
  );
}

export default memo(ListingCheckListPc);
