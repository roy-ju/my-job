import { ClosablePanel } from '@/components/molecules';
import { ChatRoomList as ChatRoomListTemplate } from '@/components/templates';

interface Props {
  depth: number;
  panelWidth?: string;
  panelAnimationDuration?: number;
}

export default function ChatRoomList({ depth, panelWidth, panelAnimationDuration }: Props) {
  return (
    <ClosablePanel width={panelWidth} animationDuration={panelAnimationDuration} closable={depth === 2}>
      <ChatRoomListTemplate />
    </ClosablePanel>
  );
}
