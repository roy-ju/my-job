import useAPI_ChatRoomList from '@/apis/chat/getChatRoomList';
import { ClosablePanel } from '@/components/molecules';
import { ChatRoomList as ChatRoomListTemplate } from '@/components/templates';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default function ChatRoomList({ depth, panelWidth }: Props) {
  useAPI_ChatRoomList();

  return (
    <ClosablePanel width={panelWidth} closable={depth === 2}>
      <ChatRoomListTemplate list={[]} />
    </ClosablePanel>
  );
}
