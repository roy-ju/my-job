import type { ComponentMeta, ComponentStory } from '@storybook/react';

import NotifcitaionIcon from '@/assets/icons/icons_24_notification.svg';

import NavigationHeader from './index';

export default {
  title: 'molecules/NavigationHeader',
  component: NavigationHeader,
} as ComponentMeta<typeof NavigationHeader>;

export const Default: ComponentStory<typeof NavigationHeader> = () => (
  <NavigationHeader>
    <NavigationHeader.BackButton />
    <NavigationHeader.Title>서울특별시 강남구 역삼동</NavigationHeader.Title>
  </NavigationHeader>
);

export const WithButton: ComponentStory<typeof NavigationHeader> = () => (
  <NavigationHeader>
    <NavigationHeader.Title>마이페이지</NavigationHeader.Title>
    <NavigationHeader.Button tw="ml-auto">
      <NotifcitaionIcon />
    </NavigationHeader.Button>
  </NavigationHeader>
);

const items = ['삭제하기', '알림설정'];

export const WithMoreButton: ComponentStory<typeof NavigationHeader> = () => (
  <NavigationHeader>
    <NavigationHeader.Title>마이페이지</NavigationHeader.Title>
    <NavigationHeader.MoreButton items={items} />
  </NavigationHeader>
);
