import { memo } from 'react';

import ListingCheckList from '@/components/domains/realestate-helper/ListingCheckList';

import AuthRequired from '@/components/atoms/AuthRequired';

import Panel from '@/components/atoms/Panel';

interface Props {
  depth: number;
  panelWidth?: string;
}

function ListingCheckListPc({ depth, panelWidth }: Props) {
  return (
    <AuthRequired depth={depth}>
      <Panel width={panelWidth}>
        <ListingCheckList />
      </Panel>
    </AuthRequired>
  );
}

export default memo(ListingCheckListPc);
