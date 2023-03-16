import { NavigationHeader } from '@/components/molecules';

export default function ChatRoom() {
  return (
    <div tw="flex flex-col h-full">
      <NavigationHeader>
        <NavigationHeader.Title tw="text-b1">공개용 주소 최대 22자 모두 노출 가능</NavigationHeader.Title>
      </NavigationHeader>
    </div>
  );
}
