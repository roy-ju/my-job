import HomeIcon from '@/assets/icons/home.svg';
import HeartIcon from '@/assets/icons/heart.svg';
import MapIcon from '@/assets/icons/mob_map_pin.svg';
import ChatIcon from '@/assets/icons/mob_chat.svg';
import UserIcon from '@/assets/icons/user.svg';
import { Button } from '@/components/atoms';
import BottomBezel from '@/components/atoms/BottomBezel';

export default function MobGlobalNavigation() {
  return (
    <div
      tw="w-full max-w-mobile fixed bottom-0 left-auto right-auto flex flex-col gap-5 py-2 px-[0.6025rem] bg-white"
      id="negocio-mob-global-navigation"
    >
      <div tw="flex items-center">
        <Button variant="ghost" tw="flex-col px-0 h-auto flex-1 gap-[5px]">
          <HomeIcon />
          <span tw="text-mobCaption">홈</span>
        </Button>
        <Button variant="ghost" tw="flex-col px-0 h-auto flex-1 gap-[5px]">
          <HeartIcon />
          <span tw="text-mobCaption">관심목록</span>
        </Button>
        <Button variant="ghost" tw="flex-col px-0 h-auto flex-1 gap-[5px]">
          <MapIcon />
          <span tw="text-mobCaption">지도</span>
        </Button>
        <Button variant="ghost" tw="flex-col px-0 h-auto flex-1 gap-[5px]">
          <ChatIcon />
          <span tw="text-mobCaption">중개사 채팅</span>
        </Button>
        <Button variant="ghost" tw="flex-col px-0 h-auto flex-1 gap-[5px]">
          <UserIcon />
          <span tw="text-mobCaption">My 네고</span>
        </Button>
      </div>
      <BottomBezel />
    </div>
  );
}
