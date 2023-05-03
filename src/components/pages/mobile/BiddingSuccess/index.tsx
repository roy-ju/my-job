import createSuggestFromBidding from '@/apis/suggest/createSuggestFromBidding';
import { MobileContainer } from '@/components/atoms';
import { BiddingSuccess } from '@/components/templates';
import { useRouter } from 'next/router';
import { memo, useCallback, useEffect, useState } from 'react';

export default memo(() => {
  const router = useRouter();
  const canReceiveSuggest = router.query.canReceiveSuggest === 'true';
  const biddingID = Number(router.query.biddingID) ?? 0;

  const [isCreatingSuggest, setIsCreatingSuggest] = useState(false);

  const onClickNext = useCallback(
    async (receiveSuggest: boolean) => {
      if (receiveSuggest) {
        setIsCreatingSuggest(true);
        await createSuggestFromBidding(biddingID);
        setIsCreatingSuggest(false);
      }

      router.back();
    },
    [router, biddingID],
  );

  useEffect(() => {
    if (!router.query.canReceiveSuggest) router.back();
  }, [router.query.canReceiveSuggest, router]);

  return (
    <MobileContainer>
      <BiddingSuccess
        onClickNext={onClickNext}
        isCreatingSuggest={isCreatingSuggest}
        canReceiveSuggest={canReceiveSuggest}
      />
    </MobileContainer>
  );
});
