import type { ComponentMeta, ComponentStory } from '@storybook/react';
import Panel from './index';

export default {
  title: 'atoms/Panel',
  component: Panel,
} as ComponentMeta<typeof Panel>;

export const Default: ComponentStory<typeof Panel> = (args) => (
  <Panel {...args} />
);

Default.args = {
  width: '375px',
};

Default.parameters = {
  controls: {
    exclude: ['width'],
  },
};
