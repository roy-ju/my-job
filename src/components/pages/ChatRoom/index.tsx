import useAPI_ChatRoomDetail from '@/apis/chat/getChatRoomDetail';
import { ClosablePanel } from '@/components/molecules';
import { ChatRoom } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import { memo, useCallback } from 'react';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);
  useAPI_ChatRoomDetail(Number(router.query.chatRoomID));

  const handleClickClose = useCallback(() => {
    router.pop();
  }, [router]);

  return (
    <ClosablePanel width={panelWidth} closable={depth === 2} onClickClose={handleClickClose}>
      <ChatRoom />
    </ClosablePanel>
  );
});
