import dynamic from 'next/dynamic';

import { Panel } from '@/components/atoms';

const RealTradeDetail = dynamic(() => import('@/components/templates/RealTradeDetail'), {
  ssr: false,
});

interface Props {
  depth: number;
  panelWidth?: string;
}

export default function RealPrice({ depth, panelWidth }: Props) {
  return (
    <Panel width={panelWidth}>
      <RealTradeDetail depth={depth} />
    </Panel>
  );
}
