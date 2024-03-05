import { memo } from 'react';

import Faq from '@/components/domains/my/Faq';

import Panel from '@/components/atoms/Panel';

interface Props {
  panelWidth?: string;
}

function FaqPc({ panelWidth }: Props) {
  return (
    <Panel width={panelWidth}>
      <Faq />
    </Panel>
  );
}

export default memo(FaqPc);
