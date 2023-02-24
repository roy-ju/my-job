import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { useMemo } from 'react';

import Home from '@/assets/icons/home.svg';
import MapPin from '@/assets/icons/map_pin.svg';
import Bidding from '@/assets/icons/bidding.svg';
import ChatBubble from '@/assets/icons/chat_bubble.svg';
import User from '@/assets/icons/user.svg';
import GlobalNavigation from './index';

export default {
  title: 'molecules/GlobalNavigation',
  component: GlobalNavigation,
} as ComponentMeta<typeof GlobalNavigation>;

export const Default: ComponentStory<typeof GlobalNavigation> = (args) => {
  const arr = useMemo(
    () => ['홈', '지도', '나의거래', '문의목록', 'My네고'],
    [],
  );
  const iconArr = useMemo(
    // eslint-disable-next-line react/jsx-key
    () => [<Home />, <MapPin />, <Bidding />, <ChatBubble />, <User />],
    [],
  );
  return (
    <GlobalNavigation {...args}>
      {arr.map((v, i) => (
        <GlobalNavigation.TabButton
          key={v}
          text={v}
          idx={i}
          icon={iconArr[i]}
        />
      ))}
    </GlobalNavigation>
  );
};

Default.args = {};
