import { MobileContainer } from '@/components/atoms';

import React from 'react';

import dynamic from 'next/dynamic';

const MobRealPriceDetail = dynamic(() => import('@/components/templates/MobRealPriceDetail'), { ssr: false });

export default function RealPriceDetail() {
  return (
    <MobileContainer>
      <MobRealPriceDetail />
    </MobileContainer>
  );
}
