import { memo } from 'react';

import SuggestForm from '@/components/domains/suggest/SuggestForm';

import Panel from '@/components/atoms/Panel';

interface Props {
  panelWidth?: string;
}

function SuggestFormPc({ panelWidth }: Props) {
  return (
    <Panel width={panelWidth}>
      <SuggestForm />
    </Panel>
  );
}

export default memo(SuggestFormPc);
