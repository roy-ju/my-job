import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Panel } from '@/components/atoms';
import Home from '.';

export default {
  title: 'templates/Home',
  component: Home,
} as ComponentMeta<typeof Home>;

export const Default: ComponentStory<typeof Home> = () => (
  <Panel>
    <Home />
  </Panel>
);

Default.args = {};
