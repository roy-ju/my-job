import { Panel } from '@/components/atoms';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import NotificationList from '.';

export default {
  title: 'templates/NotificationList',
  component: NotificationList,
} as ComponentMeta<typeof NotificationList>;

export const Default: ComponentStory<typeof NotificationList> = () => (
  <Panel>
    <NotificationList />
  </Panel>
);
