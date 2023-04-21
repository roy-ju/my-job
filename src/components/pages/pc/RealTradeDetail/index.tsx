import { Panel } from '@/components/atoms';
import { RealTradeDetail } from '@/components/templates';

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
