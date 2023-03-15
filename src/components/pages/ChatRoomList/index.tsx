import { ClosablePanel } from '@/components/molecules';
import { ChatRoomList as ChatRoomListTemplate } from '@/components/templates';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default function ChatRoomList({ depth, panelWidth }: Props) {
  return (
    <ClosablePanel width={panelWidth} closable={depth === 2}>
      <ChatRoomListTemplate />
    </ClosablePanel>
  );
}
