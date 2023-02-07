import type { ComponentMeta, ComponentStory } from '@storybook/react';
import ClosablePanel from './index';

export default {
  title: 'atoms/ClosablePanel',
  component: ClosablePanel,
} as ComponentMeta<typeof ClosablePanel>;

export const Default: ComponentStory<typeof ClosablePanel> = (args) => (
  <ClosablePanel {...args} />
);

Default.args = {
  width: '375px',
  animationDuration: 0.3,
  closable: true,
};
