import { memo } from 'react';

import Dictionary from '@/components/domains/realestate-helper/Dictionary';

import Panel from '@/components/atoms/Panel';

interface Props {
  panelWidth?: string;
}

function DictionaryPc({ panelWidth }: Props) {
  return (
    <Panel width={panelWidth}>
      <Dictionary />
    </Panel>
  );
}

export default memo(DictionaryPc);
