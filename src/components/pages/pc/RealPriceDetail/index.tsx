import dynamic from 'next/dynamic';

import { Panel } from '@/components/atoms';

const RealPriceDetail = dynamic(() => import('@/components/templates/RealPriceDetail'), {
  ssr: false,
});

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
