import { memo } from 'react';

import Panel from '@/components/atoms/Panel';

import AuthRequired from '@/components/atoms/AuthRequired';

import ListingQnaCreate from '@/components/domains/listings/ListingQnaCreate';

interface Props {
  depth: number;
  panelWidth?: string;
}

function ListingQnaCreatePc({ depth, panelWidth }: Props) {
  return (
    <AuthRequired depth={depth} ciRequired>
      <Panel width={panelWidth}>
        <ListingQnaCreate />
      </Panel>
    </AuthRequired>
  );
}

export default memo(ListingQnaCreatePc);
