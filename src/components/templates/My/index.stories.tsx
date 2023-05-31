import { Panel } from '@/components/atoms';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import My from '.';

export default {
  title: 'templates/My',
  component: My,
} as ComponentMeta<typeof My>;

export const Default: ComponentStory<typeof My> = (args) => (
  <Panel>
    <My {...args} />
  </Panel>
);

Default.args = {
  isLoading: false,
  loggedIn: false,
  unreadNotificationCount: 1,
};
