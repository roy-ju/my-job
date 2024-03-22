import { memo } from 'react';

import SubHome from '@/components/domains/realestate-helper/SubHome';

import Panel from '@/components/atoms/Panel';

interface Props {
  panelWidth?: string;
}

function SubHomePc({ panelWidth }: Props) {
  return (
    <Panel width={panelWidth}>
      <SubHome />
    </Panel>
  );
}

export default memo(SubHomePc);
