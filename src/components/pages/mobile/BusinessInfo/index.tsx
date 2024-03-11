import { MobileContainer } from '@/components/atoms';
// import { BusinessInfo } from '@/components/templates';
import { useRouter } from 'next/router';
import { memo, useCallback } from 'react';

export default memo(() => {
  const router = useRouter();

  const handleGoBack = useCallback(() => {
    router.back();
  }, [router]);

  return <MobileContainer>{/* <BusinessInfo onClickGoBack={handleGoBack} /> */}</MobileContainer>;
});
