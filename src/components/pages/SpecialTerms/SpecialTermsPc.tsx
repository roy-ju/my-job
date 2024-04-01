import { memo } from 'react';

import SpecialTerms from '@/components/domains/realestate-helper/SpecialTerms';

import AuthRequired from '@/components/atoms/AuthRequired';

import Panel from '@/components/atoms/Panel';

interface Props {
  depth: number;
  panelWidth?: string;
}

function SpecialTermsPc({ depth, panelWidth }: Props) {
  return (
    <AuthRequired depth={depth}>
      <Panel width={panelWidth}>
        <SpecialTerms />
      </Panel>
    </AuthRequired>
  );
}

export default memo(SpecialTermsPc);
