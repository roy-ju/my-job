import { ClosablePanel } from '@/components/molecules';
import { ReportListing } from '@/components/templates';
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

  return (
    <ClosablePanel
      width={panelWidth}
      animationDuration={panelAnimationDuration}
      closable={depth === 2}
      onClickClose={handleClose}
    >
      <ReportListing />
    </ClosablePanel>
  );
});
