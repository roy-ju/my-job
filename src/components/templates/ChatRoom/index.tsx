import { NavigationHeader } from '@/components/molecules';
import { ChatRoomDetailsAccordion } from '@/components/organisms';

interface ChatRoomProps {
  title: string;
}

export default function ChatRoom({ title }: ChatRoomProps) {
  return (
    <div tw="flex flex-col h-full">
      <NavigationHeader>
        <NavigationHeader.Title tw="text-b1">{title}</NavigationHeader.Title>
      </NavigationHeader>
      <ChatRoomDetailsAccordion />
    </div>
  );
}
