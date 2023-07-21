import { Panel } from '@/components/atoms';
import { memo } from 'react';
import { MyCoupon as MyCouponTemplate } from '@/components/templates';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ panelWidth }: Props) => (
  <Panel width={panelWidth}>
    <MyCouponTemplate hasData={false} />
  </Panel>
));