import useAPI_ChatRoomDetail from '@/apis/chat/getChatRoomDetail';
import { ClosablePanel } from '@/components/molecules';
import { ChatRoom } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import { memo, useCallback, useMemo } from 'react';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);
  const { data, isLoading } = useAPI_ChatRoomDetail(Number(router.query.chatRoomID));

  const chatMessages = useMemo(
    () =>
      data?.list?.map((chat) => ({
        id: chat.id,
        name: data?.agent_name,
        message: chat.message,
        chatUserType: chat.chat_user_type,
        sentTime: chat.created_time,
      })) ?? [],
    [data],
  );

  const handleClickClose = useCallback(() => {
    router.pop();
  }, [router]);

  return (
    <ClosablePanel width={panelWidth} closable={depth === 2} onClickClose={handleClickClose}>
      <ChatRoom
        title={data?.listing_title ?? ''}
        agentName={data?.agent_name ?? ''}
        officeName={data?.agent_office_name ?? ''}
        agentDescription={data?.agent_description ?? ''}
        isLoading={isLoading}
        chatMessages={chatMessages}
      />
    </ClosablePanel>
  );
});
