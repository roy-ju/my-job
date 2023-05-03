import { MobileContainer } from '@/components/atoms';
import { BiddingSuccess } from '@/components/templates';
import { useRouter } from 'next/router';
import { memo, useCallback } from 'react';

export default memo(() => {
  const router = useRouter();

  const onClickNext = useCallback(async () => {
    router.back();
  }, [router]);

  return (
    <MobileContainer>
      <BiddingSuccess onClickNext={onClickNext} canReceiveSuggest={false} />
    </MobileContainer>
  );
});
