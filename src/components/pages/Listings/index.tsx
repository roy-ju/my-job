import { ClosablePanel } from '@/components/molecules';
import { Listings } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import { memo, useCallback } from 'react';

type Props = {
  depth: number;
  panelWidth?: string;
  panelAnimationDuration?: number;
};

export default memo(({ panelAnimationDuration, panelWidth, depth }: Props) => {
  const router = useRouter(depth);

  const handleClose = useCallback(() => {
    router.pop();
  }, [router]);

  const handleClickListingDetail = useCallback(
    (id: number) => {
      router.push('listingDetail', {
        queryParams: {
          listingID: id,
        },
      });
    },
    [router],
  );

  return (
    <ClosablePanel
      width={panelWidth}
      animationDuration={panelAnimationDuration}
      closable={depth === 2}
      onClickClose={handleClose}
    >
      <Listings onClickListingDetail={handleClickListingDetail} />
    </ClosablePanel>
  );
});
