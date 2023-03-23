import { Panel } from '@/components/atoms';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import NotificationSettings from '.';

export default {
  title: 'templates/NotificationSettings',
  component: NotificationSettings,
} as ComponentMeta<typeof NotificationSettings>;

export const Default: ComponentStory<typeof NotificationSettings> = () => (
  <Panel>
    <NotificationSettings />
  </Panel>
);
