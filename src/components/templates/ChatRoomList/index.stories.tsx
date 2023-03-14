import type { ComponentMeta, ComponentStory } from '@storybook/react';
import ChatRoomList from '.';

export default {
  title: 'templates/ChatRoomList',
  component: ChatRoomList,
} as ComponentMeta<typeof ChatRoomList>;

export const Default: ComponentStory<typeof ChatRoomList> = () => (
  <div tw="w-[380px]">
    <ChatRoomList />
  </div>
);
