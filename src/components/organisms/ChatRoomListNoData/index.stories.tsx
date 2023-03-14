import type { ComponentMeta, ComponentStory } from '@storybook/react';
import ChatRoomListNoData from '.';

export default {
  title: 'molecules/ChatRoomListNoData',
  component: ChatRoomListNoData,
} as ComponentMeta<typeof ChatRoomListNoData>;

export const Default: ComponentStory<typeof ChatRoomListNoData> = () => <ChatRoomListNoData />;
