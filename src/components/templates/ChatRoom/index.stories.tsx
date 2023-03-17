import type { ComponentMeta, ComponentStory } from '@storybook/react';
import ChatRoom from '.';

export default {
  title: 'templates/ChatRoom',
  component: ChatRoom,
} as ComponentMeta<typeof ChatRoom>;

export const Default: ComponentStory<typeof ChatRoom> = (args) => (
  <div tw="w-[380px] h-full bg-white">
    <ChatRoom {...args} />
  </div>
);

Default.args = {
  title: '공개용 주소 최대 22자 모두 노출 가능',
};
