import { ReactNode } from 'react';

import GlobalNavigation from '@/components/organisms/global/GlobalNavigation';

import GOOGLE_TAG_BUTTON_ID from '@/constants/gtag_id';

import Home from '@/assets/icons/home.svg';

import MapPin from '@/assets/icons/map_pin.svg';

import ChatBubble from '@/assets/icons/chat_bubble.svg';

import User from '@/assets/icons/user.svg';

import BookIcon from '@/assets/icons/icon_book_24.svg';
import tw, { styled } from 'twin.macro';

interface LayoutMainProps {
  children?: ReactNode;
  tabIndex?: number;
  unreadChatCount?: number;
  onChangeTab?: (index: number) => void;
  onClickLogo?: () => void;
}

const LayoutMainContainer = styled.div`
  ${tw`flex flex-row w-full h-full overflow-hidden`}
`;

export default function LayoutMain({ tabIndex, onChangeTab, children, onClickLogo, unreadChatCount }: LayoutMainProps) {
  return (
    <LayoutMainContainer>
      <div tw="z-50">
        <GlobalNavigation tabIndex={tabIndex} onChangeTab={onChangeTab} onClickLogo={onClickLogo}>
          <GlobalNavigation.TabButton idx={0} text="홈" icon={<Home />} />
          <GlobalNavigation.TabButton
            id={GOOGLE_TAG_BUTTON_ID.HOME_PC_GLOBAL_NAVIGATION_SUBHOME}
            idx={1}
            text="거래도우미"
            icon={<BookIcon />}
          />
          <GlobalNavigation.TabButton idx={2} text="지도" icon={<MapPin />} />
          <GlobalNavigation.TabButton idx={3} text="채팅" icon={<ChatBubble />} unreadChatCount={unreadChatCount} />
          <GlobalNavigation.TabButton idx={4} text="마이페이지" icon={<User />} />
          {process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test' && (
            <GlobalNavigation.TabButton idx={5} text="개발자설정" icon={<User />} />
          )}
        </GlobalNavigation>
      </div>
      {children}
    </LayoutMainContainer>
  );
}
