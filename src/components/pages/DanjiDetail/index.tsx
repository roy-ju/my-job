import { ClosablePanel } from '@/components/molecules';
import { DanjiDetail } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import { memo, useCallback } from 'react';

type Props = {
  depth: number;
};

export default memo(({ depth }: Props) => {
  const router = useRouter(depth);

  const handleClickClose = useCallback(() => {
    router.pop();
  }, [router]);

  const handleCLickListingDetail = useCallback(() => {
    router.push('listingDetail', {
      queryParams: {
        listingID: 1,
      },
    });
  }, [router]);

  return (
    <ClosablePanel closable={depth === 2} onClickClose={handleClickClose}>
      <DanjiDetail onClickListingDetail={handleCLickListingDetail} />
    </ClosablePanel>
  );
});
