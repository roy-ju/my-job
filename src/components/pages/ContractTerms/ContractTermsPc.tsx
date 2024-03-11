import { memo } from 'react';

import ContractTerms from '@/components/domains/terms-and-info/ContractTerms';

import Panel from '@/components/atoms/Panel';

interface Props {
  panelWidth?: string;
}

function ContractTermsPc({ panelWidth }: Props) {
  return (
    <Panel width={panelWidth}>
      <ContractTerms />
    </Panel>
  );
}

export default memo(ContractTermsPc);
