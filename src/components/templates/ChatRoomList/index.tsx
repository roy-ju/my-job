import { Separator } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';
import { ChatRoomGuide, ChatRoomListNoData } from '@/components/organisms';

export default function ChatRoomList() {
  return (
    <div>
      <NavigationHeader>
        <NavigationHeader.Title>문의목록</NavigationHeader.Title>
      </NavigationHeader>
      <ChatRoomListNoData />
      <Separator />
      <ChatRoomGuide />
    </div>
  );
}
