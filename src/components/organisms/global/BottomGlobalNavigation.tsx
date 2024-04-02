import { MouseEvent } from 'react';

import { useRouter } from 'next/router';

import Image from 'next/image';

import tw, { styled } from 'twin.macro';

import { useReadLocalStorage } from 'usehooks-ts';

import Button from '@/components/atoms/Button';

import useMobileMap from '@/states/hooks/useMobileMap';

import HomeIcon from '@/assets/icons/home.svg';

import BookIcon from '@/assets/icons/icon_book_24.svg';

import MapIcon from '@/assets/icons/mob_map_pin.svg';

import ChatIcon from '@/assets/icons/mob_chat.svg';

import UserIcon from '@/assets/icons/user.svg';

import Routes from '@/router/routes';

import SpeeachBubble from '@/../public/static/images/speech_bubble.png';

import LocalStorageValue from '@/constants/localStorageValues';

import GOOGLE_TAG_BUTTON_ID from '@/constants/gtag_id';

const BottomGlobalNavigationContainer = styled.div`
  ${tw`relative w-full border-t border-t-gray-300 flex flex-col gap-5 px-[5px] bg-white [z-index: 300]`}
`;

const BottomGlobalNavigationFlex = styled.div`
  ${tw`flex items-center`}
`;

const NavigationButton = styled(Button)`
  ${tw`relative flex-col px-0 h-auto flex-1 gap-0.5 [padding-block: 5px]`}
`;

NavigationButton.defaultProps = { variant: 'ghost' };

export default function BottomGlobalNavigation({
  index,
  unreadChatCount = 0,
}: {
  index?: number;
  unreadChatCount?: number;
}) {
  const map = useMobileMap();

  const router = useRouter();

  const onClickButton = (path: string, e?: MouseEvent<HTMLButtonElement> | undefined) => {
    if (e?.currentTarget.value === index?.toString()) return;

    router.replace(`/${Routes.EntryMobile}/${path}`);
  };

  const buttonStyles = {
    selected: tw`text-nego-800`,
    default: tw`text-gray-800`,
    defaultIcon: tw`text-gray-500`,
  };

  const value = useReadLocalStorage(LocalStorageValue.firstVisitInSubHome);

  return (
    <BottomGlobalNavigationContainer id="negocio-mob-global-navigation">
      <BottomGlobalNavigationFlex>
        <NavigationButton
          value={0}
          onClick={(e) => {
            if (e?.currentTarget.value === index?.toString()) return;
            router.replace(`/${Routes.EntryMobile}`);
          }}
        >
          <HomeIcon css={index === 0 ? buttonStyles.selected : buttonStyles.defaultIcon} />
          <span css={[tw`text-body_01`, index === 0 ? buttonStyles.selected : buttonStyles.default]}>홈</span>
        </NavigationButton>

        <NavigationButton
          value={1}
          onClick={(e) => onClickButton(Routes.SubHome, e)}
          id={GOOGLE_TAG_BUTTON_ID.HOME_MOBILE_GLOBAL_NAVIGATION_SUBHOME}
        >
          {value !== '1' && (
            <Image
              src={SpeeachBubble.src}
              alt="speeach_bubble"
              width={61}
              height={33.6}
              tw="absolute [top: -29.3px] [z-index: 301]"
            />
          )}
          <BookIcon css={index === 1 ? buttonStyles.selected : buttonStyles.defaultIcon} />
          <span css={[tw`text-body_01`, index === 1 ? buttonStyles.selected : buttonStyles.default]}>거래도우미</span>
        </NavigationButton>

        <NavigationButton
          value={2}
          onClick={(e) => {
            onClickButton(Routes.Map, e);
            map?.setZoom(15, true);
          }}
        >
          <MapIcon css={index === 2 ? buttonStyles.selected : buttonStyles.defaultIcon} />
          <span css={[tw`text-body_01`, index === 2 ? buttonStyles.selected : buttonStyles.default]}>지도</span>
        </NavigationButton>

        <NavigationButton value={3} onClick={(e) => onClickButton(Routes.ChatRoomList, e)}>
          <div tw="relative">
            <ChatIcon css={index === 3 ? buttonStyles.selected : buttonStyles.defaultIcon} />
            {!!unreadChatCount && (
              <div tw="absolute w-1 h-1 bg-red-800 [border-radius: 50%] font-bold top-0 -right-[11px]" />
            )}
          </div>
          <span css={[tw`text-body_01`, index === 3 ? buttonStyles.selected : buttonStyles.default]}>채팅</span>
        </NavigationButton>

        <NavigationButton value={4} onClick={(e) => onClickButton(Routes.My, e)}>
          <UserIcon css={index === 4 ? buttonStyles.selected : buttonStyles.defaultIcon} />
          <span css={[tw`text-body_01`, index === 4 ? buttonStyles.selected : buttonStyles.default]}>마이페이지</span>
        </NavigationButton>
      </BottomGlobalNavigationFlex>
    </BottomGlobalNavigationContainer>
  );
}
