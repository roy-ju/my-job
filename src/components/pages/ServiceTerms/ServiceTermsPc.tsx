import { memo } from 'react';

import ServiceTerms from '@/components/domains/terms-and-info/ServiceTerms';

import Panel from '@/components/atoms/Panel';

interface Props {
  panelWidth?: string;
}

function ServiceTermsPc({ panelWidth }: Props) {
  return (
    <Panel width={panelWidth}>
      <ServiceTerms />
    </Panel>
  );
}

export default memo(ServiceTermsPc);
