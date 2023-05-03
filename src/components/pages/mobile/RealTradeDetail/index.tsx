import { MobileContainer } from '@/components/atoms';

import dynamic from 'next/dynamic';

const MobRealTradeDetail = dynamic(() => import('@/components/templates/MobRealTradeDetail'), { ssr: false });

export default function RealTradeDetail() {
  return (
    <MobileContainer>
      <MobRealTradeDetail />
    </MobileContainer>
  );
}
