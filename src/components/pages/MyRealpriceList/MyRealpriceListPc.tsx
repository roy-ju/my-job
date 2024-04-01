import MyInterestedRealpriceList from '@/components/domains/my/MyInterestedRealpriceList';

import { AuthRequired, Panel } from '@/components/atoms';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default function MyRealpriceListPc({ depth, panelWidth }: Props) {
  return (
    <AuthRequired depth={depth}>
      <Panel width={panelWidth}>
        <MyInterestedRealpriceList />
      </Panel>
    </AuthRequired>
  );
}
