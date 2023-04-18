import createSuggestFromBidding from '@/apis/suggest/createSuggestFromBidding';
import { Panel } from '@/components/atoms';
import { BiddingSuccess } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import { memo, useCallback, useEffect, useState } from 'react';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);
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

      router.pop();
    },
    [router, biddingID],
  );

  useEffect(() => {
    if (!router.query.canReceiveSuggest) router.pop();
  }, [router.query.canReceiveSuggest, router]);

  return (
    <Panel width={panelWidth}>
      <BiddingSuccess
        onClickNext={onClickNext}
        isCreatingSuggest={isCreatingSuggest}
        canReceiveSuggest={canReceiveSuggest}
      />
    </Panel>
  );
});
