import { ClosablePanel } from '@/components/molecules';
import { DanjiDetail } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import { memo, useCallback } from 'react';

interface Props {
  depth: number;
  panelWidth?: string;
  panelAnimationDuration?: number;
}

export default memo(({ panelWidth, panelAnimationDuration, depth }: Props) => {
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
    <ClosablePanel
      width={panelWidth}
      animationDuration={panelAnimationDuration}
      closable={depth === 2}
      onClickClose={handleClickClose}
    >
      <DanjiDetail onClickListingDetail={handleCLickListingDetail} />
    </ClosablePanel>
  );
});
