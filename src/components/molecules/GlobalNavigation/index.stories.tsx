import type { ComponentMeta, ComponentStory } from '@storybook/react';
import GlobalNavigation from './index';

export default {
  title: 'molecules/GlobalNavigation',
  component: GlobalNavigation,
} as ComponentMeta<typeof GlobalNavigation>;

export const Default: ComponentStory<typeof GlobalNavigation> = (args) => (
  <GlobalNavigation {...args}>
    <GlobalNavigation.TabButton text="홈" idx={0} />
    <GlobalNavigation.TabButton text="지도" idx={1} />
    <GlobalNavigation.TabButton text="나의거래" idx={2} />
    <GlobalNavigation.TabButton text="문의목록" idx={3} />
    <GlobalNavigation.TabButton text="My네고" idx={4} />
  </GlobalNavigation>
);

Default.args = {};
