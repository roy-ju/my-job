import type { ComponentMeta, ComponentStory } from '@storybook/react';

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

export const Default: ComponentStory<typeof GlobalNavigation> = (args) => (
  <GlobalNavigation {...args}>
    <GlobalNavigation.TabButton text="홈" idx={0} icon={<Home />} />
    <GlobalNavigation.TabButton text="지도" idx={1} icon={<MapPin />} />
    <GlobalNavigation.TabButton text="나의거래" idx={2} icon={<Bidding />} />
    <GlobalNavigation.TabButton text="문의목록" idx={3} icon={<ChatBubble />} />
    <GlobalNavigation.TabButton text="My네고" idx={4} icon={<User />} />
  </GlobalNavigation>
);

Default.args = {
  defaultTabIndex: 0,
};
