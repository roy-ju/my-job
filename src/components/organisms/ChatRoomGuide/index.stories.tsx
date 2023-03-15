import type { ComponentMeta, ComponentStory } from '@storybook/react';
import ChatRoomGuide from '.';

export default {
  title: 'organisms/ChatRoomGuide',
  component: ChatRoomGuide,
} as ComponentMeta<typeof ChatRoomGuide>;

export const Default: ComponentStory<typeof ChatRoomGuide> = () => <ChatRoomGuide />;
