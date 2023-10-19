import { MobileContainer } from '@/components/atoms';
import { RecommendGuide } from '@/components/templates';
import { useRouter } from 'next/router';

import { memo, useCallback } from 'react';

export default memo(() => {
  const router = useRouter();

  const handleGoBack = useCallback(() => {
    if (typeof window !== 'undefined') {
      const navigationIndex = window.history.state?.idx;
      const canGoBack = navigationIndex !== 0;

      if (canGoBack) {
        router.back();
      } else {
        router.replace('/');
      }
    }
  }, [router]);

  return (
    <MobileContainer>
      <RecommendGuide title="매물 구해요" onClickBack={handleGoBack} />
    </MobileContainer>
  );
});
