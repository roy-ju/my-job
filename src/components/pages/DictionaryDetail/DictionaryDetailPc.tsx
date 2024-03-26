import { memo } from 'react';

import DictionaryDetail from '@/components/domains/realestate-helper/DictionaryDetail';

import Panel from '@/components/atoms/Panel';

interface Props {
  panelWidth?: string;
}

function DictionaryDetailPc({ panelWidth }: Props) {
  return (
    <Panel width={panelWidth}>
      <DictionaryDetail />
    </Panel>
  );
}

export default memo(DictionaryDetailPc);
