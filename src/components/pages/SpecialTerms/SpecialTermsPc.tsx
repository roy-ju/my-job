import { memo } from 'react';

import SpecialTerms from '@/components/domains/realestate-helper/SpecialTerms';

import Panel from '@/components/atoms/Panel';

interface Props {
  depth: number;
  panelWidth?: string;
}

function SpecialTermsPc({ panelWidth }: Props) {
  return (
    <Panel width={panelWidth}>
      <SpecialTerms />
    </Panel>
  );
}

export default memo(SpecialTermsPc);
