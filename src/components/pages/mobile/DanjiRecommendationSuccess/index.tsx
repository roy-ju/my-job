import { MobileContainer } from '@/components/atoms';
import { MobDanjiRecommendationSuccess } from '@/components/templates';

import { useRouter } from 'next/router';

import React from 'react';

export default function DanjiRecommendationSuccess() {
  const router = useRouter();

  const handleCTA = () => {
    router.back();
  };

  return (
    <MobileContainer>
      <MobDanjiRecommendationSuccess handleCTA={handleCTA} />
    </MobileContainer>
  );
}
