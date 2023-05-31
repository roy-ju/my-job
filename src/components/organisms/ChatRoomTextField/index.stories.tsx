import type { ComponentMeta, ComponentStory } from '@storybook/react';
import ChatRoomTextField from '.';

export default {
  title: 'organisms/ChatRoomTextField',
  component: ChatRoomTextField,
} as ComponentMeta<typeof ChatRoomTextField>;

export const Default: ComponentStory<typeof ChatRoomTextField> = () => (
  <div tw="w-[380px]">
    <ChatRoomTextField />
  </div>
);
