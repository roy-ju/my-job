import HomeIcon from '@/assets/icons/home.svg';
import HeartIcon from '@/assets/icons/heart.svg';
import MapIcon from '@/assets/icons/mob_map_pin.svg';
import ChatIcon from '@/assets/icons/mob_chat.svg';
import UserIcon from '@/assets/icons/user.svg';
import { Button } from '@/components/atoms';
import BottomBezel from '@/components/atoms/BottomBezel';

export default function MobGlobalNavigation() {
  return (
    <div tw="w-full max-w-mobile fixed bottom-0 left-auto right-auto flex flex-col gap-20 py-8 px-[0.6025rem]">
      <div tw="flex items-center">
        <Button variant="ghost" tw="flex-col px-0 h-auto flex-1 gap-[0.3125rem]">
          <HomeIcon />
          <span tw="text-mobCaption">홈</span>
        </Button>
        <Button variant="ghost" tw="flex-col px-0 h-auto flex-1 gap-[0.3125rem]">
          <HeartIcon />
          <span tw="text-mobCaption">관심목록</span>
        </Button>
        <Button variant="ghost" tw="flex-col px-0 h-auto flex-1 gap-[0.3125rem]">
          <MapIcon />
          <span tw="text-mobCaption">지도</span>
        </Button>
        <Button variant="ghost" tw="flex-col px-0 h-auto flex-1 gap-[0.3125rem]">
          <ChatIcon />
          <span tw="text-mobCaption">중개사 채팅</span>
        </Button>
        <Button variant="ghost" tw="flex-col px-0 h-auto flex-1 gap-[0.3125rem]">
          <UserIcon />
          <span tw="text-mobCaption">My 네고</span>
        </Button>
      </div>
      <BottomBezel />
    </div>
  );
}
