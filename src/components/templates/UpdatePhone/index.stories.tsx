import { Panel } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import UpdatePhone from '.';

export default {
  title: 'templates/UpdatePhone',
  component: UpdatePhone,
} as ComponentMeta<typeof UpdatePhone>;

export const Default: ComponentStory<typeof UpdatePhone> = (args) => (
  <Panel>
    <NavigationHeader />
    <UpdatePhone {...args} />
  </Panel>
);

Default.args = {};
