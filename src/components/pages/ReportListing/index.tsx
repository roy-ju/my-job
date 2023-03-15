import { ClosablePanel } from '@/components/molecules';
import { ReportListing } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import { memo, useCallback } from 'react';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ panelWidth, depth }: Props) => {
  const router = useRouter(depth);

  const handleClose = useCallback(() => {
    router.pop();
  }, [router]);

  return (
    <ClosablePanel width={panelWidth} closable={depth === 2} onClickClose={handleClose}>
      <ReportListing />
    </ClosablePanel>
  );
});
