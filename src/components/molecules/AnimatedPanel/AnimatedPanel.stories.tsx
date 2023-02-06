import type { ComponentMeta, ComponentStory } from '@storybook/react';
import AnimatedPanel from './index';

export default {
  title: 'molecules/AnimatedPanel',
  component: AnimatedPanel,
} as ComponentMeta<typeof AnimatedPanel>;

export const Default: ComponentStory<typeof AnimatedPanel> = (args) => (
  <AnimatedPanel {...args} />
);

Default.args = {
  width: '375px',
  animationDuration: 0.5,
};

Default.parameters = {
  controls: {
    exclude: ['width', 'onAnimationComplete'],
  },
};
