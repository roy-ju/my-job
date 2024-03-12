import { memo } from 'react';

import MyRegisteredListings from '@/components/domains/my/MyRegisteredListings';

import Panel from '@/components/atoms/Panel';

import { AuthRequired } from '@/components/atoms';

interface Props {
  depth: number;
  panelWidth?: string;
}

function MyRegisteredListingsPc({ depth, panelWidth }: Props) {
  return (
    <AuthRequired depth={depth}>
      <Panel width={panelWidth}>
        <MyRegisteredListings />
      </Panel>
    </AuthRequired>
  );
}

export default memo(MyRegisteredListingsPc);
