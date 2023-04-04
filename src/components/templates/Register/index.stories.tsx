import { Panel } from '@/components/atoms';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import Register from '.';

export default {
  title: 'templates/Register',
  component: Register,
} as ComponentMeta<typeof Register>;

export const Default: ComponentStory<typeof Register> = () => (
  <Panel>
    <Register />
  </Panel>
);

Default.args = {};
