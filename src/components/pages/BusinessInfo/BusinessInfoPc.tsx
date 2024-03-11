import { memo } from 'react';

import BusinessInfo from '@/components/domains/terms-and-info/BusinessInfo';

import Panel from '@/components/atoms/Panel';

interface Props {
  panelWidth?: string;
}

function BusinessInfoPc({ panelWidth }: Props) {
  return (
    <Panel width={panelWidth}>
      <BusinessInfo />
    </Panel>
  );
}

export default memo(BusinessInfoPc);
