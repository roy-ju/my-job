import MyFindAccount from '@/components/domains/my/MyFindAccount';

import { Panel } from '@/components/atoms';

interface FindAccountPcProps {
  panelWidth?: string;
}

export default function FindAccountPc({ panelWidth }: FindAccountPcProps) {
  return (
    <Panel width={panelWidth}>
      <MyFindAccount />
    </Panel>
  );
}
