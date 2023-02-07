import { ClosablePanel } from '@/components/molecules';
import { ChatRoom } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import { memo, useCallback } from 'react';

type Props = {
  depth: number;
  panelWidth?: string;
  panelAnimationDuration?: number;
};

export default memo(({ depth, panelWidth, panelAnimationDuration }: Props) => {
  const router = useRouter(depth);

  const handleClickClose = useCallback(() => {
    router.pop();
  }, [router]);

  return (
    <ClosablePanel
      width={panelWidth}
      animationDuration={panelAnimationDuration}
      closable={depth === 2}
      onClickClose={handleClickClose}
    >
      <ChatRoom />
    </ClosablePanel>
  );
});
