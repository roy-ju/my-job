import { useRouter } from 'next/router';

import tw from 'twin.macro';

import { Button } from '@/components/atoms';

import useMobileMap from '@/states/hooks/useMobileMap';

import HomeIcon from '@/assets/icons/home.svg';

import HeartIcon from '@/assets/icons/heart.svg';

import MapIcon from '@/assets/icons/mob_map_pin.svg';

import ChatIcon from '@/assets/icons/mob_chat.svg';

import UserIcon from '@/assets/icons/user.svg';

import Routes from '@/router/routes';

export default function MobGlobalNavigation({
  index,
  unreadChatCount = 0,
}: {
  index?: number;
  unreadChatCount?: number;
}) {
  const map = useMobileMap();
  const router = useRouter();

  const onClickButton = (path: string) => {
    router.replace(`/${Routes.EntryMobile}/${path}`);
  };

  const buttonStyles = {
    selected: tw`text-nego-800`,
    default: tw`text-gray-800`,
    defaultIcon: tw`text-gray-500`,
  };

  return (
    <div
      tw="w-full border-t border-t-gray-300 flex flex-col gap-5 py-[5px] px-[5px] bg-white [z-index: 300]"
      id="negocio-mob-global-navigation"
    >
      <div tw="flex items-center">
        <Button
          variant="ghost"
          tw="flex-col px-0 h-auto flex-1 gap-0.5"
          onClick={() => router.replace(`/${Routes.EntryMobile}`)}
        >
          <HomeIcon css={index === 0 ? buttonStyles.selected : buttonStyles.defaultIcon} />
          <span css={[tw`text-body_01`, index === 0 ? buttonStyles.selected : buttonStyles.default]}>홈</span>
        </Button>
        <Button
          variant="ghost"
          tw="flex-col px-0 h-auto flex-1 gap-0.5"
          onClick={() => onClickButton(Routes.MyFavoriteList)}
        >
          <HeartIcon css={index === 1 ? buttonStyles.selected : buttonStyles.defaultIcon} />
          <span css={[tw`text-body_01`, index === 1 ? buttonStyles.selected : buttonStyles.default]}>관심목록</span>
        </Button>
        <Button
          variant="ghost"
          tw="flex-col px-0 h-auto flex-1 gap-0.5"
          onClick={() => {
            onClickButton(Routes.Map);
            map?.setZoom(15, true);
          }}
        >
          <MapIcon css={index === 2 ? buttonStyles.selected : buttonStyles.defaultIcon} />
          <span css={[tw`text-body_01`, index === 2 ? buttonStyles.selected : buttonStyles.default]}>지도</span>
        </Button>
        <Button
          variant="ghost"
          tw="flex-col px-0 h-auto flex-1 gap-0.5"
          onClick={() => onClickButton(Routes.ChatRoomList)}
        >
          <div tw="relative">
            <ChatIcon css={index === 3 ? buttonStyles.selected : buttonStyles.defaultIcon} />
            {!!unreadChatCount && (
              <div tw="absolute w-1 h-1 bg-red-800 [border-radius: 50%] font-bold top-0 -right-[11px]" />
            )}
          </div>
          <span css={[tw`text-body_01`, index === 3 ? buttonStyles.selected : buttonStyles.default]}>채팅</span>
        </Button>
        <Button variant="ghost" tw="flex-col px-0 h-auto flex-1 gap-0.5" onClick={() => onClickButton(Routes.My)}>
          <UserIcon css={index === 4 ? buttonStyles.selected : buttonStyles.defaultIcon} />
          <span css={[tw`text-body_01`, index === 4 ? buttonStyles.selected : buttonStyles.default]}>마이페이지</span>
        </Button>
      </div>
    </div>
  );
}
