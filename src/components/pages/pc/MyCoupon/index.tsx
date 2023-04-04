import { Panel } from '@/components/atoms';
import { useAuth } from '@/hooks/services';
import { useRouter } from '@/hooks/utils';
import { memo } from 'react';
import { MyCoupon as MyCouponTemplate } from '@/components/templates';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => (
  <Panel width={panelWidth}>
    <MyCouponTemplate hasData={false} />
  </Panel>
));
