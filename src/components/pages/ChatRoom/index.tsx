import { ClosablePanel } from '@/components/molecules';
import { ChatRoom } from '@/components/templates';
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

  return (
    <ClosablePanel closable={depth === 2} onClickClose={handleClickClose}>
      <ChatRoom />
    </ClosablePanel>
  );
});
