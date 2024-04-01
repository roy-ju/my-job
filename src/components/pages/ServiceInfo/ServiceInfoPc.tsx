import { memo } from 'react';

import ServiceInfo from '@/components/domains/terms-and-info/ServiceInfo';

import Panel from '@/components/atoms/Panel';

interface Props {
  panelWidth?: string;
}

function ServiceInfoPc({ panelWidth }: Props) {
  return (
    <Panel width={panelWidth}>
      <ServiceInfo />
    </Panel>
  );
}

export default memo(ServiceInfoPc);
