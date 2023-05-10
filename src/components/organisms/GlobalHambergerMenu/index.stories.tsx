import type { ComponentMeta, ComponentStory } from '@storybook/react';
import GlobalHambergerMenu from '.';

export default {
  title: 'organisms/GlobalHambergerMenu',
  component: GlobalHambergerMenu,
} as ComponentMeta<typeof GlobalHambergerMenu>;

export const Default: ComponentStory<typeof GlobalHambergerMenu> = () => (
  <div tw="w-32">
    <h1 tw="text-center">↓ Click!</h1>
    <GlobalHambergerMenu />
  </div>
);

Default.args = {};
