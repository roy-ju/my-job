import type { ComponentMeta, ComponentStory } from '@storybook/react';
import TopLoadingBar from '.';

export default {
  title: 'atoms/TopLoadingBar',
  component: TopLoadingBar,
} as ComponentMeta<typeof TopLoadingBar>;

export const Default: ComponentStory<typeof TopLoadingBar> = (args) => <TopLoadingBar {...args} />;

Default.args = {
  progress: 10,
};
