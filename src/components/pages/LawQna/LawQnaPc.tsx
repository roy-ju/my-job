import { memo } from 'react';

import Panel from '@/components/atoms/Panel';

interface Props {
  panelWidth?: string;
}

function LawQnaPc({ panelWidth }: Props) {
  return <Panel width={panelWidth}>{/* <SuggestForm /> */}</Panel>;
}

export default memo(LawQnaPc);
