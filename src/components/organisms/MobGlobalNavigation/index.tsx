import HomeIcon from '@/assets/icons/home.svg';
import HeartIcon from '@/assets/icons/heart.svg';
import MapIcon from '@/assets/icons/mob_map_pin.svg';
import ChatIcon from '@/assets/icons/mob_chat.svg';
import UserIcon from '@/assets/icons/user.svg';
import { Button } from '@/components/atoms';
import BottomBezel from '@/components/atoms/BottomBezel';
import { useRouter } from 'next/router';
import tw from 'twin.macro';

export default function MobGlobalNavigation() {
  const router = useRouter();

  const onClickButton = (path: string) => {
    router.push(path);
  };

  const isActiveColor = (path: string, activePath: string) => {
    if (path === activePath) {
      return { color: '#212529' };
    }
    return { color: '#9DA2AC' };
  };

  console.log(router.pathname);

  return (
    <div
      tw="w-full max-w-mobile flex flex-col gap-5 py-2 px-[0.6025rem] bg-white [z-index: 300]"
      id="negocio-mob-global-navigation"
    >
      <div tw="flex items-center">
        <Button variant="ghost" tw="flex-col px-0 h-auto flex-1 gap-[5px] ">
          <HomeIcon style={{ color: '#9DA2AC' }} />
          <span tw="text-mobCaption text-gray-1200">홈</span>
        </Button>
        <Button variant="ghost" tw="flex-col px-0 h-auto flex-1 gap-[5px]">
          <HeartIcon style={{ color: '#9DA2AC' }} />
          <span tw="text-mobCaption text-gray-1200">관심목록</span>
        </Button>
        <Button variant="ghost" tw="flex-col px-0 h-auto flex-1 gap-[5px]" onClick={() => onClickButton('map')}>
          <MapIcon style={isActiveColor(router.pathname, '/m/map')} />
          <span tw="text-mobCaption text-gray-1200" css={[router.pathname === '/m/map' && tw`text-gray-1000`]}>
            지도
          </span>
        </Button>
        <Button variant="ghost" tw="flex-col px-0 h-auto flex-1 gap-[5px]">
          <ChatIcon style={isActiveColor(router.pathname, '/m/chat')} />
          <span tw="text-mobCaption text-gray-1200" css={[router.pathname === '/m/chat' && tw`text-gray-1000`]}>
            중개사 채팅
          </span>
        </Button>
        <Button variant="ghost" tw="flex-col px-0 h-auto flex-1 gap-[5px]" onClick={() => onClickButton('my')}>
          <UserIcon style={isActiveColor(router.pathname, '/m/my')} />
          <span tw="text-mobCaption text-gray-1200" css={[router.pathname === '/m/my' && tw`text-gray-1000`]}>
            My 네고
          </span>
        </Button>
      </div>
      <BottomBezel />
    </div>
  );
}
