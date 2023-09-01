import { MobileContainer } from '@/components/atoms';
import { SuggestMyListing as SuggestMyListingTemplate } from '@/components/templates';
import { useRouter } from 'next/router';
import { memo, useCallback } from 'react';

export default memo(() => {
  const router = useRouter();

  const handleClickBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <MobileContainer>
      <SuggestMyListingTemplate onClickBack={handleClickBack} />
    </MobileContainer>
  );
});
