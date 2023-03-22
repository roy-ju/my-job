import type { ComponentMeta, ComponentStory } from '@storybook/react';
import NotificationFilterTab from '.';

export default {
  title: 'organisms/NotificationFilterTab',
  component: NotificationFilterTab,
} as ComponentMeta<typeof NotificationFilterTab>;

export const Default: ComponentStory<typeof NotificationFilterTab> = () => <NotificationFilterTab />;
