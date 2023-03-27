import type { ComponentMeta, ComponentStory } from '@storybook/react';
import NotificationSettingsForm from '.';

export default {
  title: 'organisms/NotificationSettingsForm',
  component: NotificationSettingsForm,
} as ComponentMeta<typeof NotificationSettingsForm>;

export const ServiceForm: ComponentStory<typeof NotificationSettingsForm.Service> = () => (
  <NotificationSettingsForm.Service />
);

export const ChatForm: ComponentStory<typeof NotificationSettingsForm.Chat> = () => <NotificationSettingsForm.Chat />;

export const MarketingForm: ComponentStory<typeof NotificationSettingsForm.Marketing> = () => (
  <NotificationSettingsForm.Marketing />
);
