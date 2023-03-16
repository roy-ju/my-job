import { ClosablePanel } from '@/components/molecules';
import { ChatRoomList as ChatRoomListTemplate } from '@/components/templates';
import useChatRoomList from './useChatRoomList';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default function ChatRoomList({ depth, panelWidth }: Props) {
  const { chatRoomList, isLoading, handleClickListItem } = useChatRoomList(depth);

  return (
    <ClosablePanel width={panelWidth} closable={depth === 2}>
      <ChatRoomListTemplate list={chatRoomList} isLoading={isLoading} onClickListItem={handleClickListItem} />
    </ClosablePanel>
  );
}
