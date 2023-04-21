import { Panel } from '@/components/atoms';
import { RealPriceDetail } from '@/components/templates';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default function RealPrice({ depth, panelWidth }: Props) {
  return (
    <Panel width={panelWidth}>
      <RealPriceDetail depth={depth} />
    </Panel>
  );
}
