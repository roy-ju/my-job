import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Panel } from '@/components/atoms';
import Reactivate from '.';

export default {
  title: 'templates/Reactivate',
  component: Reactivate,
} as ComponentMeta<typeof Reactivate>;

export const Default: ComponentStory<typeof Reactivate> = (args) => (
  <Panel>
    <Reactivate {...args} />
  </Panel>
);

Default.args = {};
