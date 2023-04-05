import { Panel } from '@/components/atoms';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import RegisterSuccess from '.';

export default {
  title: 'templates/RegisterSuccess',
  component: RegisterSuccess,
} as ComponentMeta<typeof RegisterSuccess>;

export const Default: ComponentStory<typeof RegisterSuccess> = (args) => (
  <Panel>
    <RegisterSuccess {...args} />
  </Panel>
);

Default.args = {};
