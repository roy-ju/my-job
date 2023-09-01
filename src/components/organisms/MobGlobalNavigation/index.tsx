import HomeIcon from '@/assets/icons/home.svg';
import HeartIcon from '@/assets/icons/heart.svg';
import MapIcon from '@/assets/icons/mob_map_pin.svg';
import ChatIcon from '@/assets/icons/mob_chat.svg';
import UserIcon from '@/assets/icons/user.svg';
import { Button, NewCount } from '@/components/atoms';
import { useRouter } from 'next/router';
import tw from 'twin.macro';
import Routes from '@/router/routes';

export default function MobGlobalNavigation({
  index,
  unreadChatCount = 0,
}: {
  index?: number;
  unreadChatCount?: number;
}) {
  const router = useRouter();

  const onClickButton = (path: string) => {
    router.replace(`/${Routes.EntryMobile}/${path}`);
  };

  const buttonStyles = {
    selected: tw`text-gray-1000`,
    default: tw`text-gray-700`,
  };

  return (
    <div
      tw="w-full max-w-mobile border-t border-t-gray-300 flex flex-col gap-5 pt-2.5 pb-7 px-[0.6025rem] bg-white [z-index: 300]"
      id="negocio-mob-global-navigation"
    >
      <div tw="flex items-center">
        <Button
          variant="ghost"
          tw="flex-col px-0 h-auto flex-1 gap-[5px]"
          onClick={() => router.replace(`/${Routes.EntryMobile}`)}
        >
          <HomeIcon css={index === 0 ? buttonStyles.selected : buttonStyles.default} />
          <span css={[tw`text-gray-700 text-mobCaption`, index === 0 ? buttonStyles.selected : buttonStyles.default]}>
            홈
          </span>
        </Button>
        <Button
          variant="ghost"
          tw="flex-col px-0 h-auto flex-1 gap-[5px]"
          onClick={() => onClickButton(Routes.MyFavoriteList)}
        >
          <HeartIcon css={index === 1 ? buttonStyles.selected : buttonStyles.default} />
          <span css={[tw`text-gray-700 text-mobCaption`, index === 1 ? buttonStyles.selected : buttonStyles.default]}>
            관심목록
          </span>
        </Button>
        <Button variant="ghost" tw="flex-col px-0 h-auto flex-1 gap-[5px]" onClick={() => onClickButton(Routes.Map)}>
          <MapIcon css={index === 2 ? buttonStyles.selected : buttonStyles.default} />
          <span css={[tw`text-gray-700 text-mobCaption`, index === 2 ? buttonStyles.selected : buttonStyles.default]}>
            지도
          </span>
        </Button>
        <Button
          variant="ghost"
          tw="flex-col px-0 h-auto flex-1 gap-[5px]"
          onClick={() => onClickButton(Routes.ChatRoomList)}
        >
          <div tw="relative">
            <ChatIcon css={index === 3 ? buttonStyles.selected : buttonStyles.default} />
            {unreadChatCount > 0 && (
              <NewCount value="N" tw="font-bold absolute top-0 right-0 translate-x-1/2 -translate-y-1/2" />
            )}
          </div>
          <span css={[tw`text-gray-700 text-mobCaption`, index === 3 ? buttonStyles.selected : buttonStyles.default]}>
            채팅
          </span>
        </Button>
        <Button variant="ghost" tw="flex-col px-0 h-auto flex-1 gap-[5px]" onClick={() => onClickButton(Routes.My)}>
          <UserIcon css={index === 4 ? buttonStyles.selected : buttonStyles.default} />
          <span css={[tw`text-gray-700 text-mobCaption`, index === 4 ? buttonStyles.selected : buttonStyles.default]}>
            마이페이지
          </span>
        </Button>
      </div>
    </div>
  );
}
