import { memo } from 'react';

import LocationTerms from '@/components/domains/terms-and-info/LocationTerms';

import Panel from '@/components/atoms/Panel';

interface Props {
  panelWidth?: string;
}

function LocationTermsPc({ panelWidth }: Props) {
  return (
    <Panel width={panelWidth}>
      <LocationTerms />
    </Panel>
  );
}

export default memo(LocationTermsPc);
