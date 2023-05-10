import type { ComponentMeta, ComponentStory } from '@storybook/react';
import GlobalHambergerMenu from '.';

export default {
  title: 'organisms/GlobalHambergerMenu',
  component: GlobalHambergerMenu,
} as ComponentMeta<typeof GlobalHambergerMenu>;

export const Default: ComponentStory<typeof GlobalHambergerMenu> = () => <GlobalHambergerMenu />;

Default.args = {};
