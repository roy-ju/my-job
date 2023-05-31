import { Panel } from '@/components/atoms';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import Login from '.';

export default {
  title: 'templates/Login',
  component: Login,
} as ComponentMeta<typeof Login>;

export const Default: ComponentStory<typeof Login> = () => (
  <Panel>
    <Login />
  </Panel>
);

Default.args = {};
