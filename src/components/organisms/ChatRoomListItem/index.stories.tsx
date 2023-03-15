import type { ComponentMeta, ComponentStory } from '@storybook/react';
import defaultAvatar from '@/../public/static/images/default_avatar.png';
import ChatRoomListItem from '.';

export default {
  title: 'organisms/ChatRoomListItem',
  component: ChatRoomListItem,
} as ComponentMeta<typeof ChatRoomListItem>;

export const Default: ComponentStory<typeof ChatRoomListItem> = (args) => (
  <div tw="w-[380px] px-5 bg-white">
    <ChatRoomListItem {...args} />
  </div>
);

Default.args = {
  title: 'title',
  chatRoomType: 'chatRoomType',
  agentDescription: 'agentDescription',
  lastMessage: 'lastMessage',
  listingStatus: 'listingStatus',
  lastMessageTime: '2023-01-01',
  unreadMessageCount: 0,
  profileImagePath: defaultAvatar,
  active: false,
};
